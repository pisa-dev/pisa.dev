import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const JOBS_DIR = path.join(process.cwd(), "content", "jobs");

export interface JobOffer {
  slug: string;
  title: string;
  companyName: string;
  location?: string;
  salaryRange: string;
  offerURL?: string;
  remote: "full" | "partial" | "no";
  tags: string[];
  createdAt: Date;
  content: string;
}

export async function getAllJobs(): Promise<JobOffer[]> {
  const files = await fs.readdir(JOBS_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const jobs = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      return getJobBySlug(slug);
    }),
  );

  return jobs
    .filter((j): j is JobOffer => j !== null)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getJobBySlug(slug: string): Promise<JobOffer | null> {
  try {
    const filePath = path.join(JOBS_DIR, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title,
      companyName: data.companyName,
      location: data.location,
      salaryRange: data.salaryRange,
      offerURL: data.offerURL,
      remote: data.remote ?? "no",
      tags: data.tags ?? [],
      createdAt: new Date(data.createdAt),
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const files = await fs.readdir(JOBS_DIR);
  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}
