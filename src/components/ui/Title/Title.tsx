import { FC } from "react";
import { Text } from "../Text";

interface TitleProps {
  children: string;
}

export const Title: FC<TitleProps> = ({ children }) => {
  return (
    <Text
      as="h1"
      weight="bold"
      bright
      uppercase
      size="extra-large"
      className="mt-4 mb-6 leading-normal"
    >
      {children}
    </Text>
  );
};
