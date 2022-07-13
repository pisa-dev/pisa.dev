import { Header } from "@/components/Header";
import { trpc } from "@/utils/trpc";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { Survey } from "./Survey";
import { SurveyPageLoading } from "./SurveyPageLoading";

const event = {
  title: "Quantum Computing: Lov Grover",
  date: new Date(2022, 6, 15, 18, 30),
};

export interface SurveyPageContentProps {
  slug: string;
}

export const SurveyPageContent: FC<SurveyPageContentProps> = ({ slug }) => {
  const router = useRouter();
  const q = trpc.useQuery([
    "survey.get-survey",
    {
      eventId: slug,
    },
  ]);

  useEffect(() => {
    if (!q.data && !q.isLoading && !q.isError) {
      router.push("/404");
    }
  }, [router, q.data, q.isLoading, q.isError]);

  return (
    <>
      <Head>
        <title>{q.data?.title || "Survey"} - pisa.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-grow flex-col w-full max-w-7xl mx-auto py-8 px-4 justify-between items-center gap-8">
          {q.data ? (
            <Survey survey={q.data} />
          ) : q.isLoading ? (
            <SurveyPageLoading />
          ) : null}

          <div className="prose prose-slate dark:prose-invert prose-sm max-w-prose text-center">
            <span className="block dark:text-slate-600">
              <span className="text-red-500 font-black">*</span> = campo
              obbligatorio
            </span>
            <span className="dark:text-slate-600">
              Le risposte a questo questionario sono salvate in modo anonimo.
              Rispondendo, ci aiuti a migliorare continuamente i nostri eventi!
            </span>
          </div>
        </main>
      </div>
    </>
  );
};
