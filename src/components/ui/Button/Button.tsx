import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  primary?: boolean;
  outline?: boolean;
  size?: ButtonSize;
}

const classes = (primary: boolean, outline: boolean) => {
  if (primary && outline) {
    return "border border-pink-500 text-pink-500";
  }
  if (primary && !outline) {
    return "bg-pink-500 text-white";
  }
  if (!primary && outline) {
    return "border border-white text-white";
  }
  return "bg-white text-gray-800";
};

const sizes = {
  medium: "h-16",
  large: "h-20",
};

type ButtonSize = keyof typeof sizes;

const getButtonSize = (size: ButtonSize | undefined): string => {
  return sizes[size || "medium"];
};

export const Button: FC<ButtonProps> = ({
  children,
  primary = false,
  outline = false,
  size = undefined,
}) => {
  return (
    <button
      className={`${getButtonSize(size)} rounded-full p-4 ${classes(
        primary,
        outline
      )} flex flex-row items-center justify-center gap-2 text-xl font-medium`}
    >
      {children}
    </button>
  );
};
