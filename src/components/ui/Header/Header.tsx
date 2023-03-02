import { FC } from "react";
import { IconMenu } from "../IconMenu";

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="mb-6 flex items-center justify-between py-10">
      <div className="h-12 w-64">
        <img src="https://pisa.dev/logo.svg" className="object-contain" />
      </div>
      <IconMenu />
    </header>
  );
};
