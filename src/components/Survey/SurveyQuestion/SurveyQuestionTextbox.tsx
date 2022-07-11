import { FC, FormEvent, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { SurveyQuestionProps } from ".";
import { Question } from "./Question";

export const SurveyQuestionTextbox: FC<SurveyQuestionProps> = ({
  q,
  onSubmit,
  onBack,
  data,
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
      <Question>{q}</Question>
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

      <div>
        {onBack && (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onBack}
          >
            Indietro
          </button>
        )}
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-30"
        >
          <IoMdSend className="mr-2" />
          Invia
        </button>
      </div>
    </form>
  );
};
