import { FC } from "react";
import { Text } from "../Text";

interface TaglineProps {
  children: string;
}

export const Tagline: FC<TaglineProps> = ({ children }) => {
  return (
    <Text
      accent
      uppercase
      size="medium"
      className="tracking-wide"
      weight="medium"
    >
      {children}
    </Text>
  );
};

export default Tagline;
