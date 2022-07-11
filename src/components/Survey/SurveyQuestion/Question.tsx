import { FC } from "react";

export interface QuestionProps {
  children: string;
}

export const Question: FC<QuestionProps> = ({ children }) => (
  <h1 className="text-4xl font-extrabold dark:text-slate-200">{children}</h1>
);
