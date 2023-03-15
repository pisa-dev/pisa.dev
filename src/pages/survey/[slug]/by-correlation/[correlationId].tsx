import { Footer } from "@/components/Footer";
import { api } from "@/utils/api";
import { SurveyQuestionKind, SurveyAnswer } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";

const SurveyQuestionResultsPage: NextPage = () => {
  const router = useRouter();
  const correlationId = router.query.correlationId as string;
  const surveySlug = router.query.slug as string;
  const q = api.survey.getAnswersByCorrelationId.useQuery({
    correlationId,
    surveyId: surveySlug,
  });

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
          Risposte dell{"'"}utente {'"'}
          {correlationId}
          {'"'}
        </h1>
        <Link href={`/survey/${surveySlug}/results`}>
          Torna ai risultati del sondaggio
        </Link>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-slate-800">
                  <thead className="bg-gray-50 text-gray-700 dark:bg-slate-700 dark:text-slate-200">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                      >
                        Domanda
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold"
                      >
                        Risposta
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">
                          Altre risposte a questa domanda
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-slate-700 dark:bg-slate-800">
                    {q.data.map((answer) => (
                      <tr key={answer.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                          {answer.question.question}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {answer.answer}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href={`/survey/${surveySlug}/by-question/${answer.questionId}`}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-500"
                          >
                            Altre risposte
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const chart = (kind: SurveyQuestionKind, answers: SurveyAnswer[]) => {
  if (!answers || !answers.length) {
    return null;
  }

  switch (kind) {
    case "stars":
      const counts = Array(5).fill(0);
      answers.forEach((a) => counts[parseInt(a.answer, 10) - 1]++);
      const data = counts.map((count, i) => ({ x: i + 1, y: count }));
      return (
        <VictoryChart domainPadding={20}>
          <VictoryAxis
            style={{
              axis: { stroke: "#64748b" },
              tickLabels: { fill: "#64748b" },
            }}
            tickValues={[1, 2, 3, 4, 5]}
            tickFormat={(t) => `${t} ★`}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "#64748b" },
              tickLabels: { fill: "#64748b" },
            }}
          />
          <VictoryBar data={data} style={{ data: { fill: "#4f46e5" } }} />
        </VictoryChart>
      );
  }
};

export default SurveyQuestionResultsPage;
