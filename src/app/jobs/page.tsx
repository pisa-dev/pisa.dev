import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JobOfferCard } from "@/components/Jobs/JobOfferCard/JobOfferCard";
import { getAllJobs } from "@/lib/jobs";
import Link from "next/link";

export default async function JobsPage() {
  const jobs = await getAllJobs();

  return (
    <div className="flex min-h-screen w-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex justify-between pt-10">
          <h1 className="pb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-slate-200">
            Offerte di lavoro
          </h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Puoi anche consultare le nuove offerte tramite il nostro{" "}
          <Link
            target="_blank"
            href="https://t.me/pisajobs"
            className="underline"
          >
            canale Telegram dedicato
          </Link>
          .
        </p>

        <div className="mt-10 space-y-4">
          {jobs.map((jobOffer) => (
            <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
