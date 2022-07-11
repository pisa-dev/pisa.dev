import { Header } from "@/components/Header";
import { StepsProgress } from "@/components/StepsProgress";
import { trpc } from "@/utils/trpc";
import Head from "next/head";
import Link from "next/link";
import { FC, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { questionElementByKind } from "../SurveyQuestion";

const event = {
  title: "Quantum Computing: Lov Grover",
  date: new Date(2022, 6, 15, 18, 30),
};

export interface SurveyPageContentProps {
  slug: string;
}

export const SurveyPageContent: FC<SurveyPageContentProps> = ({ slug }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const q = trpc.useQuery([
    "survey.get-survey",
    {
      eventId: slug,
    },
  ]);
  const addAnswerMut = trpc.useMutation("survey.add-answer");
  const [answerStore, setAnswersStore] = useLocalStorage<{
    [key: string]: string;
  }>(`survey-${slug}`, {});

  if (q.isLoading || !q.data) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (value: string) => {
    if (!q.data) {
      return;
    }
    const question = q.data.EventSurveyQuestion[currentStepIdx];
    if (!question) {
      return;
    }
    const res = await addAnswerMut.mutateAsync({
      id: answerStore[question.id],
      data: {
        questionId: question.id,
        answer: value,
      },
    });
    setAnswersStore({ ...answerStore, [question.id]: res.id });
    setCurrentStepIdx(currentStepIdx + 1);
  };

  const steps = q.data.EventSurveyQuestion.map((q) => ({
    element: questionElementByKind(q.kind),
    ...q,
  }));

  const goBack = () => setCurrentStepIdx(currentStepIdx - 1);

  return (
    <>
      <Head>
        <title>{event.title} - pisa.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-grow flex-col w-full max-w-7xl mx-auto py-8 px-4 justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row gap-4 w-full items-center md:items-stretch justify-between">
            <span className="font-semibold text-slate-600 tracking-tighter">
              {event.title}
            </span>
            {currentStepIdx < steps.length && (
              <StepsProgress current={currentStepIdx} total={steps.length} />
            )}
          </div>

          <div className="flex flex-col max-w-prose text-center">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={currentStepIdx === i ? "block" : "hidden"}
              >
                {step.element ? (
                  <step.element
                    q={step.question}
                    details={step.details}
                    required={step.required}
                    onSubmit={onSubmit}
                    onBack={currentStepIdx > 0 ? goBack : undefined}
                    data={step.data}
                  />
                ) : (
                  <p>Qualcosa è andato storto :(</p>
                )}
              </div>
            ))}

            {currentStepIdx >= steps.length && (
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl">
                  Risposte registrate, grazie per aver partecipato!
                </h1>
                <Link href="/">
                  <a className="underline">Torna alla homepage</a>
                </Link>
              </div>
            )}
          </div>

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
