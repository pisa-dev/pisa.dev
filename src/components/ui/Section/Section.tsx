import { FC, ReactNode } from "react";
import { InsetImage } from "./InsetImage";

type Color = "default" | "dimmed" | "negative";

type ImageURL = string;

interface SectionProps {
  children: ReactNode;
  center?: boolean;
  background?: Color | ImageURL;
}

const isBackgroundImage = (
  background: Color | ImageURL
): background is ImageURL => background.startsWith("http");

const getBackground = (background: Color | ImageURL): string => {
  if (isBackgroundImage(background)) {
    return "";
  }
  switch (background) {
    case "dimmed":
      return "bg-gray-300 dark:bg-black";
    case "negative":
      return "bg-gray-900";
  }
  return "";
};

export const Section: FC<SectionProps> = ({
  children,
  center = false,
  background = "default",
}) => {
  return (
    <section
      className={`mx-auto flex max-w-md flex-col px-6 py-12 ${
        center ? "text-center" : ""
      } ${getBackground(background)}`}
    >
      {isBackgroundImage(background) && <InsetImage src={background} />}
      {children}
    </section>
  );
};
