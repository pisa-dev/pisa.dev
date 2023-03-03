import { FC } from "react";

interface AvatarGridProps {
  children: React.ReactNode;
}

export const AvatarGrid: FC<AvatarGridProps> = ({ children }) => {
  return <div className="mt-18 grid w-full grid-cols-2 gap-14">{children}</div>;
};
