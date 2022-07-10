import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef } from "react";
import { usePlausible } from "next-plausible";
import { Announcement } from "@/components/Announcement";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeaderBanner } from "@/components/Headerbanner";
import { Hero } from "@/components/Hero";
import { NewsletterBanner } from "@/components/Newsletter";
import { Speaker } from "@/components/SpeakerInfo";
import { Sponsors } from "@/components/Sponsors";
import { Team } from "@/components/Team";
import { UpcomingEvents, Event } from "@/components/UpcomingEvents";

const speaker: Speaker = {
  name: "Alessandro Berti",
  title: "PhD Student in Quantum Computing @ UniPi",
  imageUrl: "/alessandro.webp",
};

const events: Event[] = [
  {
    title: "Quantum Computing: Lov Grover",
    href: "/event/quantum-computing-lov-grover",
    description: `
      Quanto costa cercare classicamente un elemento in un array non ordinato? Nel peggiore dei casi, dovrai guardare tutti gli elementi del tuo array, uno ad uno.
      Questo però non è vero con la computazione quantistica!
    `,
    date: new Date(2022, 6, 15, 18, 30),
    venue: "Borgo Stretto 3, Pisa",
    imageUrl: "/quantum.jpeg",
    speaker,
  },
];

const Home: NextPage = () => {
  const router = useRouter();
  const newsletterRef = useRef<HTMLDivElement>(null);
  const plausible = usePlausible();

  const showEmailVerifiedBanner = !!router.query.email_verified;

  return (
    <>
      <Head>
        <title>pisa.dev - la community degli sviluppatori pisani</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showEmailVerifiedBanner && (
        <HeaderBanner
          className="bg-lime-600"
          text="Il tuo indirizzo email è stato verificato con successo!"
        />
      )}
      {events.length && events[0] && <Announcement event={events[0]} />}
      <Header />
      <main>
        <Hero
          cta={() => {
            plausible("newsletter-cta");
            newsletterRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
        />
        <UpcomingEvents events={events} />
        <Team />
        <div ref={newsletterRef}>
          <NewsletterBanner />
        </div>
        <Sponsors />
      </main>
      <Footer />
    </>
  );
};

export default Home;
