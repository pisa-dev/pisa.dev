import { FC } from "react";
import { Text } from "../Text";

interface DescriptionProps {
  children: React.ReactNode;
}

export const Description: FC<DescriptionProps> = ({ children }) => {
  return (
    <Text size="larger" className="mb-8 leading-relaxed">
      {children}
    </Text>
  );
};
