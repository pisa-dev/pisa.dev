import { FC, FormEvent, useState } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import { SurveyQuestionProps } from ".";
import { Question } from "./Question";
import { Submit } from "./Submit";

export const SurveyQuestionStars: FC<SurveyQuestionProps> = ({
  q,
  details,
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
      <Question details={details}>{q}</Question>
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
      <Submit onBack={onBack} disabled={!selected} />
    </form>
  );
};
