import { FAQSection } from "../FAQSection";
import { Hero } from "../Hero";
import { InfoSection } from "../InfoSection";
import { NewsletterSection } from "../NewsletterSection";
import { OrganizerSection } from "../OrganizerSection";
import { SponsorSection } from "../SponsorSection";

export const LandingPage = () => {
  return (
    <>
      <Hero />
      <InfoSection />
      <SponsorSection />
      <OrganizerSection />
      <NewsletterSection />
      <FAQSection />
    </>
  );
};
