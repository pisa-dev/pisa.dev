import Link from "next/link";
import { FC } from "react";
import { AiFillCheckCircle } from "react-icons/ai";

export interface AlertProps {
  title: string;
  description: string;
  actions: Action[];
}

export type Action = { title: string } & { url: string };

export const Alert: FC<AlertProps> = ({ title, description, actions }) => {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AiFillCheckCircle
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">{title}</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>{description}</p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              {actions.map((a) => actionElement(a))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const actionElement = (action: Action) => {
  if (action.url) {
    return (
      <Link
        target="_blank"
        href={action.url}
        className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
      >
        {action.title}
      </Link>
    );
  }

  return null;
};
