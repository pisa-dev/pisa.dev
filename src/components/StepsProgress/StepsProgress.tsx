import { FC } from "react";
import { CheckIcon } from "@heroicons/react/solid";

export interface StepsProgressProps {
  current: number;
  total: number;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export const StepsProgress: FC<StepsProgressProps> = ({ current, total }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {Array<number>(total)
          .fill(0)
          .map((_, i) => (
            <li
              key={i}
              className={classNames(
                i !== total - 1 ? "pr-8 md:pr-20" : "",
                "relative"
              )}
            >
              {i < current ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-indigo-600" />
                  </div>
                  <span className="relative w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full hover:bg-indigo-900">
                    <CheckIcon
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Domanda {i}</span>
                  </span>
                </>
              ) : i === current ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200 dark:bg-slate-600" />
                  </div>
                  <span
                    className="relative w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-900 border-2 border-indigo-600 rounded-full"
                    aria-current="step"
                  >
                    <span
                      className="h-2.5 w-2.5 bg-indigo-600 rounded-full"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Domanda {i}</span>
                  </span>
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200 dark:bg-slate-600" />
                  </div>
                  <span className="group relative w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-600 rounded-full hover:border-gray-400">
                    <span
                      className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300 dark:group-hover:bg-slate-500"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Domanda {i}</span>
                  </span>
                </>
              )}
            </li>
          ))}
      </ol>
    </nav>
  );
};
