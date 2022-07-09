import { FC } from "react";
import ReactMarkdown from "react-markdown";

export interface EventContentProps {
  abstract?: string;
  description?: string;
}

const EventContent: FC<EventContentProps> = ({ abstract, description }) => {
  return (
    <>
      {abstract && (
        <div className="flex flex-col col-span-2 gap-6">
          <p className="mt-8 text-xl prose dark:prose-invert leading-8">
            {abstract}
          </p>
        </div>
      )}
      <div className="mt-6 dark:prose-invert prose prose-indigo prose-lg  mx-auto">
        {description && <ReactMarkdown>{description}</ReactMarkdown>}
      </div>
    </>
  );
};

export default EventContent;
