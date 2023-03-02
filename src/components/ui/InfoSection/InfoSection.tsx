import { FC } from "react";
import { Button } from "../Button";
import { Description } from "../Description";
import { InfoImage } from "../InfoImage";
import { Section } from "../Section";
import { Statistics } from "../Statistics";
import { Tagline } from "../Tagline";
import { Title } from "../Title";

interface InfoSectionProps {}

export const InfoSection: FC<InfoSectionProps> = ({}) => {
  return (
    <Section>
      <Tagline>Upcoming events in 2023</Tagline>
      <Title>World biggest conference for digital technologies</Title>
      <Description>
        The 2022 edition of the conference will be held in the city of New York,
        USA. The conference will be held in the city of New York, USA. The
        conference will be held in.
      </Description>
      <div className="mb-12 flex flex-col gap-4">
        <Button primary outline>
          Learn More
        </Button>
      </div>

      <InfoImage />

      <Statistics />
    </Section>
  );
};
