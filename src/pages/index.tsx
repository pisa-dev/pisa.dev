import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef } from "react";
import { usePlausible } from "next-plausible";
import Announcement from "../components/announcement";
import Footer from "../components/footer";
import Header from "../components/header";
import HeaderBanner from "../components/headerbanner";
import Hero from "../components/hero";
import NewsletterBanner from "../components/newsletter";
import { Speaker } from "../components/speakerInfo";
import Sponsors from "../components/sponsors";
import Team from "../components/team";
import UpcomingEvents from "../components/upcomingEvents";
import { Event } from "../components/upcomingEvents";

const speaker: Speaker = {
  name: "Alessandro Berti",
  title: "PhD Quantum Computing @ UniPi",
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
