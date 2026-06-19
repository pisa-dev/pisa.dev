import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const EVENTS_DIR = path.join(process.cwd(), "content", "events");

export interface Speaker {
  name: string;
  title?: string;
  imageUrl?: string;
}

export interface MdxEvent {
  slug: string;
  title: string;
  date: Date;
  location: string;
  imageUrl?: string;
  abstract?: string;
  unlisted: boolean;
  speakers: Speaker[];
  content: string;
}

export async function getAllEvents(): Promise<MdxEvent[]> {
  const files = await fs.readdir(EVENTS_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const events = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      return getEventBySlug(slug);
    }),
  );

  return events
    .filter((e): e is MdxEvent => e !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getEventBySlug(slug: string): Promise<MdxEvent | null> {
  try {
    const filePath = path.join(EVENTS_DIR, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug: data.slug ?? slug,
      title: data.title,
      date: new Date(data.date),
      location: data.location,
      imageUrl: data.imageUrl,
      abstract: data.abstract,
      unlisted: data.unlisted ?? false,
      speakers: data.speakers ?? [],
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const files = await fs.readdir(EVENTS_DIR);
  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}
