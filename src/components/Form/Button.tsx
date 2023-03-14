import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

export const defaultButtonClasses = "inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-30 dark:bg-indigo-700 dark:hover:bg-indigo-600";

export const Button = ({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={classNames(defaultButtonClasses, className)}
  >
    {children}
  </button>
);
