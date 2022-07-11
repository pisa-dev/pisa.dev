import { FC, FormEvent, useState } from "react";
import { SurveyQuestionProps } from ".";
import { Question } from "./Question";
import { Submit } from "./Submit";

export const SurveyQuestionTextbox: FC<SurveyQuestionProps> = ({
  q,
  details,
  required,
  onSubmit,
  onBack,
}) => {
  const [value, setValue] = useState("");

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-col flex-grow justify-center items-center gap-10"
    >
      <Question details={details} required={required}>
        {q}
      </Question>
      <div className="text-2xl space-y-8 w-full">
        <textarea
          name="answer"
          rows={6}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300 dark:bg-slate-800 dark:border-slate-600"
          placeholder="Scrivi qui..."
        />
      </div>
      <Submit onBack={onBack} required={required} filled={!!value} />
    </form>
  );
};
