import Link from "next/link";
import { FC, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { StepsProgress } from "@/components/StepsProgress";
import { api } from "@/utils/api";
import { questionElementByKind } from "../SurveyQuestion";
import { Survey as SurveyT, SurveyQuestion } from "@prisma/client";
import Confetti from "react-confetti";
import { useSurveyCorrelationId } from "@/hooks/useSurveyCorrelationId";

export interface SurveyProps {
  survey: SurveyT & { questions: SurveyQuestion[] };
}

export const Survey: FC<SurveyProps> = ({ survey }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const addAnswerMut = api.survey.addAnswer.useMutation();
  const correlationId = useSurveyCorrelationId();
  const [answerStore, setAnswersStore] = useLocalStorage<{
    [key: string]: string;
  }>(`survey-${survey.id}`, {});

  const onSubmit = async (value: string) => {
    const question = survey.questions[currentStepIdx];
    if (!question) {
      return;
    }
    const res = await addAnswerMut.mutateAsync({
      id: answerStore[question.id],
      data: {
        questionId: question.id,
        answer: value,
        correlationId,
      },
    });
    setAnswersStore({ ...answerStore, [question.id]: res.id });
    setCurrentStepIdx(currentStepIdx + 1);
  };

  const steps = survey.questions.map((q) => ({
    element: questionElementByKind(q.kind),
    ...q,
  }));

  const goBack = () => setCurrentStepIdx(currentStepIdx - 1);

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:items-stretch">
        <span className="font-semibold tracking-tighter text-slate-600">
          {survey.title}
        </span>
        {currentStepIdx < steps.length && (
          <StepsProgress current={currentStepIdx} total={steps.length} />
        )}
      </div>

      <div className="flex max-w-prose flex-col text-center">
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
                loading={addAnswerMut.isLoading}
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
            <Confetti />

            <h1 className="text-3xl">
              Risposte registrate, grazie per aver partecipato!
            </h1>
            <Link href="/" className="underline">
              Torna alla homepage{" "}
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
