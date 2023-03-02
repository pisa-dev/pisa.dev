import { FC } from "react";

interface InsetImageProps {
  src: string;
}

export const InsetImage: FC<InsetImageProps> = ({ src }) => {
  return (
    <>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img src={src} className="h-full w-full object-cover blur-md" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-900 to-pink-900 mix-blend-multiply" />
    </>
  );
};
