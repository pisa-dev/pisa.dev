"use client";

import { useRef } from "react";

import { Announcement } from "@/components/Announcement";
import { EventsList } from "@/components/EventsList";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeaderBanner } from "@/components/Headerbanner";
import { Hero } from "@/components/Hero";
import { NewsletterBanner } from "@/components/Newsletter";
import { Sponsors } from "@/components/Sponsors";
import { Team } from "@/components/Team";
import { api } from "@/utils/api";
import { usePlausible } from "next-plausible";

type HomePageClientProps = {
  showEmailVerifiedBanner: boolean;
};

export default function HomePageClient({
  showEmailVerifiedBanner,
}: HomePageClientProps) {
  const newsletterRef = useRef<HTMLDivElement>(null);
  const plausible = usePlausible();
  const q = api.events.getAll.useQuery(
    {
      unlisted: false,
    },
    {
      staleTime: Infinity,
    },
  );

  if (!q.data) {
    return <div>loading</div>;
  }

  const { past, upcoming } = q.data;

  return (
    <>
      {showEmailVerifiedBanner && (
        <HeaderBanner
          className="bg-lime-600"
          text="Il tuo indirizzo email è stato verificato con successo!"
        />
      )}
      {upcoming.length > 0 && upcoming[0] && <Announcement event={upcoming[0]} />}
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
        <div ref={newsletterRef}>
          <NewsletterBanner />
        </div>
        <Sponsors />
      </main>
      <Footer />
    </>
  );
}
