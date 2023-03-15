import type { GetStaticProps, NextPage } from "next";
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
import { Sponsors } from "@/components/Sponsors";
import { Team } from "@/components/Team";
import { EventsList } from "@/components/EventsList";
import superjson from "superjson";
import { api } from "@/utils/api";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { appRouter } from "~/server/api/root";

const Home: NextPage = () => {
  const router = useRouter();
  const newsletterRef = useRef<HTMLDivElement>(null);
  const plausible = usePlausible();
  const q = api.events.getAll.useQuery(
    {
      unlisted: false,
    },
    {
      staleTime: Infinity,
    }
  );

  if (!q.data) {
    return <div>loading</div>;
  }

  const { past, upcoming } = q.data;
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
      {upcoming.length > 0 && upcoming[0] && (
        <Announcement event={upcoming[0]} />
      )}
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
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });

  await ssg.events.getAll.prefetch({ unlisted: false });

  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default Home;
