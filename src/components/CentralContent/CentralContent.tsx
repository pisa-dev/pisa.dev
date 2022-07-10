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
      className={`flex flex-col items-center prose prose-indigo dark:prose-invert prose-lg mx-auto max-w-prose px-4 ${className}`}
    >
      <h1>{title}</h1>
      <div className="mx-auto text-justify leading-relaxed ">{children}</div>
    </div>
  );
};
