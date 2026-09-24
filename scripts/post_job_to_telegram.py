#!/usr/bin/env python3
import json
import os
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

LIMIT = 4096


def chunks(text):
    result, current = [], ""
    for paragraph in text.split("\n\n"):
        while len(paragraph) > LIMIT:
            if current:
                result.append(current)
                current = ""
            result.append(paragraph[:LIMIT])
            paragraph = paragraph[LIMIT:]
        candidate = f"{current}\n\n{paragraph}" if current else paragraph
        if len(candidate) > LIMIT:
            result.append(current)
            current = paragraph
        else:
            current = candidate
    if current:
        result.append(current)
    return result


def frontmatter_value(frontmatter, key):
    match = re.search(rf"^{re.escape(key)}:\s*(.+)$", frontmatter, re.MULTILINE)
    if not match:
        return ""
    value = match.group(1)
    try:
        return json.loads(value)
    except json.JSONDecodeError:
        return value.strip('"\'')


def post(token, text):
    data = json.dumps({"chat_id": "@pisajobs", "text": text}).encode()
    request = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=data,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request) as response:
        result = json.load(response)
    if not result.get("ok"):
        raise RuntimeError(f"Telegram API error: {result}")


def main():
    base, head = sys.argv[1:3]
    manual_file = os.environ.get("JOB_FILE", "")
    if manual_file:
        path = Path(manual_file)
        if path.parent != Path("content/jobs") or path.suffix != ".md" or not path.is_file():
            raise ValueError("JOB_FILE must be an existing Markdown file in content/jobs")
        files = [manual_file]
    else:
        files = subprocess.check_output(
            ["git", "diff", "--diff-filter=A", "--name-only", base, head, "--", "content/jobs/*.md"],
            text=True,
        ).splitlines()
    if not files:
        return
    token = os.environ["TELEGRAM_BOT_TOKEN"]
    for filename in files:
        content = Path(filename).read_text()
        _, frontmatter, body = content.split("---", 2)
        title = frontmatter_value(frontmatter, "title")
        company = frontmatter_value(frontmatter, "company")
        salary = frontmatter_value(frontmatter, "salary")
        remote = {"partial": "Parziale / ibrido", "full": "Sì", "no": "No"}.get(
            frontmatter_value(frontmatter, "remote"), frontmatter_value(frontmatter, "remote")
        )
        location = frontmatter_value(frontmatter, "location")
        tags = frontmatter_value(frontmatter, "tags") or []
        tags = " ".join(tag if tag.startswith("#") else f"#{tag}" for tag in tags)
        message = (
            f"📣 {title} - {company}\n"
            f"💰 RAL: {salary}\n"
            f"🌎 Remoto: {remote}\n"
            f"📍 Location: {location}\n"
            f"{tags}\n\n{body.strip()}"
        )
        for part in chunks(message):
            post(token, part)


if __name__ == "__main__":
    main()
