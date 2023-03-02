import { FC } from "react";
import { Description } from "../Description";
import { Section } from "../Section";
import { Title } from "../Title";
import EmailForm from "./EmailForm";

interface NewsletterSectionProps {}

export const NewsletterSection: FC<NewsletterSectionProps> = ({}) => {
  return (
    <Section>
      <Title>Ready for the action?</Title>
      <Description>
        Subscribe to our newsletter. We only send important emails such as new
        events, we will never send spam.
      </Description>
      <EmailForm />
    </Section>
  );
};
