import { FC } from "react";
import { Section } from "../Section";
import { Tagline } from "../Tagline";
import { Title } from "../Title";
import { Text } from "../Text";
import { Logo } from "./Logo";
import { LogoGrid } from "./LogoGrid";
import Link from "next/link";
import { Description } from "../Description";

interface SponsorSectionProps {}

export const SponsorSection: FC<SponsorSectionProps> = ({}) => {
  return (
    <>
      <Section center background="dimmed">
        <Tagline>Our Sponsors</Tagline>
        <Title>Companies that keeps us alive</Title>
        <Description>
          Want to join the list?{" "}
          <Link href="mailto:hi@pisa.dev">Contact us!</Link>
        </Description>
        <LogoGrid>
          <Logo src="https://pisa.dev/pointerpodcast.png" />
        </LogoGrid>
      </Section>

      <Section center background="dimmed">
        <Title>Media partners</Title>
        <LogoGrid>
          <Logo src="https://pisa.dev/pointerpodcast.png" />
          <Logo src="https://pisa.dev/superherovalley.png" />
          <Logo src="https://pisa.dev/schroedinger-hat.png" />
        </LogoGrid>
      </Section>
    </>
  );
};
