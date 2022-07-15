import { FC, PropsWithChildren } from "react";

export interface CentralContentProps {
  title: string;
  className?: string;
}

export const CentralContent: FC<CentralContentProps & PropsWithChildren> = ({
  title,
  className,
  children,
}) => {
  return (
    <div
      className={`prose prose-lg prose-indigo mx-auto flex max-w-prose flex-col items-center px-4 dark:prose-invert ${className}`}
    >
      <h1>{title}</h1>
      <div className="mx-auto text-justify leading-relaxed ">{children}</div>
    </div>
  );
};
