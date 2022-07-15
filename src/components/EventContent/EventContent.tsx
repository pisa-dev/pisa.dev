import { FC } from "react";
import ReactMarkdown from "react-markdown";

export interface EventContentProps {
  abstract?: string;
  description?: string;
}

export const EventContent: FC<EventContentProps> = ({
  abstract,
  description,
}) => {
  return (
    <>
      {abstract && (
        <div className="col-span-2 flex flex-col gap-6">
          <p className="prose mt-8 text-xl leading-8 dark:prose-invert">
            {abstract}
          </p>
        </div>
      )}
      <div className="prose prose-lg prose-indigo mx-auto mt-6  dark:prose-invert">
        {description && <ReactMarkdown>{description}</ReactMarkdown>}
      </div>
    </>
  );
};
