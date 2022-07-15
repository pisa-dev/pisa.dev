import { Header } from "@/components/Header";
import { trpc } from "@/utils/trpc";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { Survey } from "./Survey";
import { SurveyPageLoading } from "./SurveyPageLoading";

export interface SurveyPageContentProps {
  id: string;
}

export const SurveyPageContent: FC<SurveyPageContentProps> = ({ id }) => {
  const router = useRouter();
  const q = trpc.useQuery(["survey.get-survey", { id }]);

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
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col items-center justify-between gap-8 py-8 px-4">
          {q.data ? (
            <Survey survey={q.data} />
          ) : q.isLoading ? (
            <SurveyPageLoading />
          ) : null}

          <div className="prose prose-sm prose-slate max-w-prose text-center dark:prose-invert">
            <span className="block dark:text-slate-600">
              <span className="font-black text-red-500">*</span> = campo
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
