import { ChangeEventHandler, FC, FormEvent, useState } from "react";
import { SurveyQuestionProps } from ".";
import { Question } from "./Question";
import { Submit } from "./Submit";

export const SurveyQuestionSingleChoice: FC<SurveyQuestionProps> = ({
  q,
  details,
  required,
  onSubmit,
  onBack,
  data,
}) => {
  const [selected, setSelected] = useState("");

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(selected);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelected(e.target.id);
  };

  if (!data.options || !Array.isArray(data.options)) {
    return <div>No options configured for this question</div>;
  }

  const options = data.options as string[];

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-col flex-grow justify-center items-center gap-10"
    >
      <Question details={details} required={required}>
        {q}
      </Question>
      <div className="text-2xl space-y-8">
        {options.map((opt) => (
          <div key={opt} className="flex items-center">
            <input
              id={opt}
              name="answer"
              type="radio"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              checked={selected === opt}
              onChange={onChange}
            />
            <label
              htmlFor={opt}
              className="ml-3 block font-medium text-gray-700 dark:text-slate-300"
            >
              {opt}
            </label>
          </div>
        ))}
      </div>
      <Submit onBack={onBack} required={required} filled={!!selected} />
    </form>
  );
};
