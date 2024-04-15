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

export const LinkButton = ({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={classNames("text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300", className)}
  >
    {children}
  </button>
)
