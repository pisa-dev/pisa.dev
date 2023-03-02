import { FC } from "react";

interface LogoGridProps {
  children: React.ReactNode;
}

export const LogoGrid: FC<LogoGridProps> = ({ children }) => {
  return <div className="mt-18 grid w-full grid-cols-2 gap-24">{children}</div>;
};
