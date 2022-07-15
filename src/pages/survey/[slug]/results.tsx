import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import { useRouter } from "next/router";

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
    <div className="prose prose-slate mx-auto max-w-prose p-4 dark:prose-invert">
      <h1>
        Risultati di {'"'}
        {q.data.title}
        {'"'}
      </h1>

      <h3>Risposte</h3>
      <div className="space-y-6">
        {q.data.questions.map((question) => (
          <div key={question.id}>
            <details>
              <summary>
                <strong>{question.question}</strong> ({question.answers.length}{" "}
                risposte)
              </summary>
              <ol>
                {question.answers.map((answer) => (
                  <li key={answer.id}>{answer.answer}</li>
                ))}
              </ol>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyResultsPage;
