import { FC } from "react";

export interface QuestionProps {
  children: string;
  details?: string | null;
}

export const Question: FC<QuestionProps> = ({ children, details }) => (
  <div className="flex flex-col gap-3">
    <h1 className="text-4xl font-extrabold dark:text-slate-200">{children}</h1>
    <span className="text-2xl text-gray-700 dark:text-slate-400">
      {details && <p>{details}</p>}
    </span>
  </div>
);
