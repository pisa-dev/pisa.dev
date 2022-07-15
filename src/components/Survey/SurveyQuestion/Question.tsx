import { FC } from "react";

export interface QuestionProps {
  children: string;
  details?: string | null;
  required?: boolean;
}

export const Question: FC<QuestionProps> = ({
  children,
  details,
  required,
}) => (
  <div className="flex flex-col gap-3">
    <h1 className="text-2xl font-extrabold dark:text-slate-200 md:text-4xl">
      {children}
      {required && <span className="text-red-600">*</span>}
    </h1>
    <span className="text-2xl text-gray-700 dark:text-slate-400">
      {details && <p>{details}</p>}
    </span>
  </div>
);
