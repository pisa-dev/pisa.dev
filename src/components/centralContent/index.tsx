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
    <div className={`flex flex-col items-center ${className}`}>
      <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">{title}</h1>
      <div className="text-gray-500 max-w-3xl mx-auto text-justify leading-relaxed mt-6 space-y-2">
        {children}
      </div>
    </div>
  );
};

export default CentralContent;
