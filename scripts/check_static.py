#!/usr/bin/env python3
"""Check generated Hugo output for route parity and accidental JavaScript."""

from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.parse import unquote, urlsplit


class OutputCheck(HTMLParser):
    def __init__(self):
        super().__init__()
        self.inline_scripts = 0
        self.event_handlers = 0
        self.job_cards = 0
        self.local_urls = []
        self.ids = set()
        self.icon_refs = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "use" and attrs.get("href", "").startswith("#"):
            self.icon_refs.append(attrs["href"][1:])
        self.inline_scripts += tag == "script" and not attrs.get("src")
        self.event_handlers += any(name.lower().startswith("on") for name in attrs)
        self.event_handlers += any((value or "").strip().lower().startswith("javascript:") for value in attrs.values())
        self.job_cards += tag == "details" and "job-card" in attrs.get("class", "").split()
        self.local_urls.extend(attrs.get(name, "") for name in ("href", "src") if attrs.get(name, "").startswith("/") and not attrs.get(name, "").startswith("//"))


def main(output: Path) -> None:
    html_files = list(output.rglob("*.html"))
    check = OutputCheck()
    for file in html_files:
        check.feed(file.read_text())

    events = len(list(Path("content/events").glob("*.md")))
    generated_events = len(list(output.glob("event/*/index.html")))
    offers = sum(1 for file in Path("content/jobs").glob("*.md") if file.name != "_index.md")
    if check.inline_scripts or check.event_handlers:
        raise SystemExit("Generated site contains inline JavaScript")
    if generated_events != events:
        raise SystemExit(f"Expected {events} event pages, found {generated_events}")
    if check.job_cards != offers:
        raise SystemExit(f"Expected {offers} archived offers, found {check.job_cards}")
    if not (output / "jobs/index.html").is_file():
        raise SystemExit("Missing /jobs/ archive")
    if not (output / "code-of-conduct/index.html").is_file():
        raise SystemExit("Missing /code-of-conduct/ page")
    missing_icons = set(check.icon_refs) - check.ids
    if missing_icons:
        raise SystemExit(f"Missing SVG symbols: {', '.join(sorted(missing_icons))}")
    for url in check.local_urls:
        path = unquote(urlsplit(url).path).lstrip("/")
        target = output / path
        if not target.is_file():
            target = target / "index.html"
        if not target.is_file():
            raise SystemExit(f"Broken local link or asset: {url}")
    print(f"OK: {generated_events} events, {check.job_cards} job offers, {len(html_files)} HTML pages, no inline JavaScript, local links valid")


if __name__ == "__main__":
    main(Path(sys.argv[1] if len(sys.argv) > 1 else "public"))
