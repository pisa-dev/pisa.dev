import { FC, FormEvent, useState } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { SurveyQuestionProps } from ".";
import { Question } from "./Question";

export const SurveyQuestionStars: FC<SurveyQuestionProps> = ({
  q,
  onSubmit,
  onBack,
}) => {
  const [focused, setFocused] = useState(0);
  const [selected, setSelected] = useState(0);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(selected.toString());
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-col flex-grow justify-center items-center gap-10"
    >
      <Question>{q}</Question>
      <div className="flex gap-4 text-3xl" onMouseLeave={() => setFocused(0)}>
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelected(i)}
            onMouseOver={() => setFocused(i)}
          >
            {(selected || focused) >= i ? <BsStarFill /> : <BsStar />}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
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
          disabled={!selected}
        >
          <IoMdSend className="mr-2" />
          Invia
        </button>
      </div>
    </form>
  );
};
