import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";

const JOBS_FILE = path.join(process.cwd(), "content", "jobs.yaml");

export interface JobOffer {
  id: string;
  title: string;
  companyName: string;
  description: string;
  location?: string;
  salaryRange: string;
  offerURL?: string;
  remote: "full" | "partial" | "no";
  tags: string[];
  createdAt: string;
}

export async function getAllJobs(): Promise<JobOffer[]> {
  const raw = await fs.readFile(JOBS_FILE, "utf-8");
  const jobs = yaml.load(raw) as JobOffer[];
  return jobs ?? [];
}
