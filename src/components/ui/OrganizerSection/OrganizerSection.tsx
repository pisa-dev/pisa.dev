import { FC } from "react";
import { Avatar, AvatarGrid } from "../Avatar";
import { Description } from "../Description";
import { Section } from "../Section";
import { Tagline } from "../Tagline";
import { Title } from "../Title";

interface OrganizerSectionProps {}

export const OrganizerSection: FC<OrganizerSectionProps> = ({}) => {
  return (
    <Section center>
      <Tagline>Manpower behind the community</Tagline>
      <Title>The Flamekeepers</Title>
      <Description>
        Maintaining a community is not a joke, but it can be meaningful and
        satisfying. Want to become a flamekeeper? Learn more!
      </Description>

      <AvatarGrid>
        <Avatar
          src="https://pisa.dev/antonio.jpg"
          name="Antonio Pitasi"
          title="Blockchain engineer at Qredo"
          website="https://anto.pt"
          github="https://github.com/pitasi"
          twitter="https://twitter.com/pitasiantonio"
          linkedin="https://linkedin.com/in/pitasi"
        />
        <Avatar
          src="https://pisa.dev/federico.jpg"
          name="Federico Gerardi"
          title="Software engineer at Resource Guru"
          website="https://azraelsec.it/"
          github="https://github.com/azraelsec"
          twitter="https://twitter.com/azraelsec"
          linkedin="https://linkedin.com/in/azraelsec"
        />
        <Avatar
          src="https://pisa.dev/luca.webp"
          name="Luca Corbucci"
          title="PhD Student at University of Pisa"
          website="https://lucacorbucci.me/"
          github="https://github.com/lucacorbucci"
          twitter="https://twitter.com/lucacorbucci"
          linkedin="https://www.linkedin.com/in/lucacorbucci/"
        />
        <Avatar
          src="https://pisa.dev/davide_rossi.jpg"
          name="Davide Rossi"
          title="Student at University of Pisa"
          github="https://github.com/daviderossi11"
          linkedin="https://www.linkedin.com/in/davide-rossi-030a73212"
        />
      </AvatarGrid>
    </Section>
  );
};
