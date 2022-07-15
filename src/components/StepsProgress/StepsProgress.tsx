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
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
                    <CheckIcon
                      className="h-5 w-5 text-white"
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
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white dark:bg-slate-900"
                    aria-current="step"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-indigo-600"
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
                  <span className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400 dark:border-slate-600 dark:bg-slate-900">
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300 dark:group-hover:bg-slate-500"
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
