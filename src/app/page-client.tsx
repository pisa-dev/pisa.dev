"use client";

import { useRef } from "react";

import { Announcement } from "@/components/Announcement";
import { EventsList } from "@/components/EventsList";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Sponsors } from "@/components/Sponsors";
import { Team } from "@/components/Team";
import { usePlausible } from "next-plausible";
import { MdxEvent } from "@/lib/events";

type HomePageClientProps = {
  events: MdxEvent[];
};

export default function HomePageClient({ events }: HomePageClientProps) {
  const teamRef = useRef<HTMLDivElement>(null);
  const plausible = usePlausible();

  const now = new Date();
  const upcoming = events.filter((e) => e.date > now);
  const past = events.filter((e) => e.date <= now);

  return (
    <>
      {upcoming.length > 0 && upcoming[0] && <Announcement event={upcoming[0]} />}
      <Header />
      <main>
        <Hero
          cta={() => {
            plausible("newsletter-cta");
            teamRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
        />

        {upcoming.length > 0 && (
          <EventsList
            title="I prossimi eventi"
            description="Siamo continuamente alla ricerca di speaker e nuove idee. Contattaci e proponi un talk!"
            events={upcoming}
          />
        )}
        {past.length > 0 && (
          <EventsList
            title="Eventi passati"
            description="Troppo tardi! Questi sono gli eventi che abbiamo già avuto, iscriviti alla newsletter per non perderne altri!"
            events={past}
          />
        )}

        <Team />
        <div ref={teamRef}>
          <Sponsors />
        </div>
      </main>
      <Footer />
    </>
  );
}
