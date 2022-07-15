import { ChangeEventHandler, FC, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlusLg } from "react-icons/bs";
import { SurveyQuestionProps } from ".";
import { Question } from "./Question";
import { Submit } from "./Submit";

export const SurveyQuestionMultipleChoices: FC<SurveyQuestionProps> = ({
  q,
  details,
  required,
  loading,
  onSubmit,
  onBack,
  data,
}) => {
  const { register, watch, setValue } = useForm();
  const [newOption, setNewOption] = useState("");
  const [addedOptions, setAddedOptions] = useState<string[]>([]);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedOpts = Object.entries(values)
      .filter(([, v]) => v)
      .map(([k]) => k);
    onSubmit(selectedOpts.join(","));
  };

  const onAddNewOptions = () => {
    if (!newOption) {
      return;
    }
    setNewOption("");
    setAddedOptions([...addedOptions, newOption]);
    setValue(newOption, true);
  };

  if (!data.options || !Array.isArray(data.options)) {
    return <div>No options configured for this question</div>;
  }

  const options = data.options as string[];

  const isExtensible = data.extend === true;

  const values = watch();

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex flex-grow flex-col items-center justify-center gap-10"
    >
      <Question details={details} required={required}>
        {q}
      </Question>
      <div className="space-y-8 text-lg md:text-xl lg:text-2xl">
        {options.concat(addedOptions).map((opt, i) => (
          <div key={`${opt}-${i}`} className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded-sm border-gray-300 text-indigo-600 focus:ring-indigo-500"
              {...register(opt)}
            />
            <label
              htmlFor={opt}
              className="ml-3 block font-medium text-gray-700 dark:text-slate-300"
            >
              {opt}
            </label>
          </div>
        ))}
        {isExtensible && (
          <div className="mt-1 flex rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm"
                placeholder="Nuova opzione"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onAddNewOptions();
                  }
                }}
              />
            </div>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-500"
              onClick={onAddNewOptions}
            >
              <BsPlusLg
                className="h-4 w-4 text-gray-400 dark:text-slate-400"
                aria-hidden="true"
              />
              <span>Aggiungi</span>
            </button>
          </div>
        )}
      </div>
      <Submit
        onBack={onBack}
        required={required}
        filled={Object.values(values).some((v) => v)}
        loading={loading}
      />
    </form>
  );
};
