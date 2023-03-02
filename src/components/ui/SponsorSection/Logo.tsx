import { FC } from "react";

interface LogoProps {
  src: string;
}

export const Logo: FC<LogoProps> = ({ src }) => {
  return <img src={src} className="grayscale" />;
};
