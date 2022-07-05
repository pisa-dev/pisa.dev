import { FC, PropsWithChildren } from "react";

export interface CentralContentProps {
  title: string;
  paragraphs: string[];
  className?: string;
}

export const CentralContent: FC<CentralContentProps> = ({
  title,
  paragraphs,
  className,
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">{title}</h1>
      <div className="text-gray-500 max-w-3xl mx-auto text-justify leading-relaxed mt-6">
        {paragraphs.map((p, i) => (
          <p key={i} className="py-2">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CentralContent;
