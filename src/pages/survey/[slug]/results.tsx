import { Footer } from "@/components/Footer";
import { trpc } from "@/utils/trpc";
import { SurveyAnswer, SurveyQuestionKind } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsStarFill } from "react-icons/bs";

const SurveyResultsPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  if (!slug || typeof slug !== "string") {
    return <div>No survey slug</div>;
  }

  const q = trpc.useQuery(["survey.get-survey-results", { id: slug }]);
  if (q.isLoading) {
    return <div>Loading...</div>;
  }

  if (q.isError) {
    return <div>Error: {q.error.message}</div>;
  }

  if (!q.data) {
    router.push("/404");
    return <div>Not found</div>;
  }

  return (
    <>
      <main className="prose prose-slate mx-auto max-w-prose p-4 dark:prose-invert">
        <h1>
          Risultati di {'"'}
          {q.data.title}
          {'"'}
        </h1>

        <h3>Panoramica</h3>
        <div className="space-y-6">
          <dl className="mt-5 flex flex-col divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow dark:divide-slate-700 dark:bg-slate-800">
            {q.data.questions.map((question) => (
              <Link
                key={question.id}
                href={`/survey/${q.data?.id}/by-question/${question.id}`}
              >
                <div className="cursor-pointer px-4 py-5 sm:p-6">
                  <dt className="text-base font-normal dark:text-slate-100">
                    {question.question}
                    {question.required && (
                      <span className="font-bold text-red-500">*</span>
                    )}
                  </dt>
                  <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                      {viz(question.kind, question.answers)}
                      <span className="ml-2 text-sm font-medium text-gray-500 dark:text-slate-300">
                        {question.answers.length} risposte
                      </span>
                    </div>
                  </dd>
                </div>
              </Link>
            ))}
          </dl>
        </div>
      </main>
      <Footer />
    </>
  );
};

const viz = (kind: SurveyQuestionKind, answers: SurveyAnswer[]) => {
  switch (kind) {
    case "stars":
      return (
        <span className="flex flex-row items-center gap-1">
          {average(answers)} <BsStarFill className="h-4 w-4" />
        </span>
      );
    case "singlechoice":
      const m = topAnswer(answers);
      return (
        <span>
          {m?.answer} ({m?.percentage}%)
        </span>
      );
    default:
      return "Apri dettaglio";
  }
};

const average = (answers: SurveyAnswer[]): string =>
  (
    answers.map((a) => parseInt(a.answer, 10)).reduce((a, b) => a + b, 0) /
    answers.length
  ).toFixed(2);

const topAnswer = (
  answers: SurveyAnswer[]
): { answer: string; percentage: string } | null => {
  if (!answers || !answers.length || !answers[0]) {
    return null;
  }

  const counts = new Map<string, number>();
  answers.forEach((a) => counts.set(a.answer, (counts.get(a.answer) || 0) + 1));
  const max = { answer: answers[0].answer, count: 0 };

  for (const [k, v] of counts.entries()) {
    if (v > max.count) {
      max.answer = k;
      max.count = v;
    }
  }

  return {
    answer: max.answer,
    percentage: ((max.count / answers.length) * 100).toFixed(0),
  };
};

export default SurveyResultsPage;
