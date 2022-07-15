import { FC, FormEvent, useState } from "react";
import { SurveyQuestionProps } from ".";
import { Question } from "./Question";
import { Submit } from "./Submit";

export const SurveyQuestionTextbox: FC<SurveyQuestionProps> = ({
  q,
  details,
  required,
  loading,
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
      className="flex flex-grow flex-col items-center justify-center gap-10"
    >
      <Question details={details} required={required}>
        {q}
      </Question>
      <div className="w-full space-y-8 text-2xl">
        <textarea
          name="answer"
          rows={6}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full min-w-0 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm"
          placeholder="Scrivi qui..."
        />
      </div>
      <Submit
        onBack={onBack}
        required={required}
        filled={!!value}
        loading={loading}
      />
    </form>
  );
};
