import { FC } from "react";
import { Button } from "../Button";
import { Description } from "../Description";
import { Section } from "../Section";
import { Tagline } from "../Tagline";
import { Title } from "../Title";
import { IconPlay } from "../IconPlay";
import { Header } from "../Header";
import { FeaturedImage } from "../FeaturedImage";

interface HeroProps {}

export const Hero: FC<HeroProps> = ({}) => {
  return (
    <div className="relative pb-20">
      <Section background="https://pisa.dev/hero.jpeg">
        <Header />
        <Tagline>Upcoming events in 2023</Tagline>
        <Title>World biggest conference for digital technologies</Title>
        <Description>
          The 2022 edition of the conference will be held in the city of New
          York, USA. The conference will be held in the city of New York, USA.
          The conference will be held in.
        </Description>
        <div className="mb-12 flex flex-col gap-4">
          <Button size="large" primary>
            Get ticket
          </Button>
          <Button size="large" outline>
            <IconPlay />
            Watch the teaser
          </Button>
        </div>

        <FeaturedImage />
      </Section>
    </div>
  );
};
