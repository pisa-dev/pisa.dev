import { FC } from "react";

interface TextProps {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  accent?: boolean;
  uppercase?: boolean;
  bright?: boolean;
  size?: TextSize;
  weight?: FontWeight;
  className?: string;
}

const sizes = {
  "extra-small": "text-xs",
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
  larger: "text-xl",
  "extra-large": "text-4xl",
};

type TextSize = keyof typeof sizes;

const getTextSize = (size: TextSize | undefined): string => {
  return sizes[size || "medium"];
};

const weights = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

type FontWeight = keyof typeof weights;

const getFontWeight = (weight: FontWeight | undefined): string => {
  return weights[weight || "normal"];
};

const getTextColor = (bright: boolean, accent: boolean): string => {
  if (accent) {
    return "text-pink-500";
  }
  if (bright) {
    return "text-white";
  }
  return "text-gray-300";
};

export const Text: FC<TextProps> = ({
  as = "span",
  accent = false,
  uppercase = false,
  bright = false,
  size = undefined,
  weight = undefined,
  className = "",
  children,
}) => {
  const As = as;
  return (
    <As
      className={`${getTextColor(bright, accent)} ${
        uppercase ? "uppercase" : ""
      } ${getTextSize(size)} ${getFontWeight(
        weight
      )} ${className} align-middle`}
    >
      {children}
    </As>
  );
};
