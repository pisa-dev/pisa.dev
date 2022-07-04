import type { NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";
import Announcement from "../components/announcement";
import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/hero";
import NewsletterBanner from "../components/newsletter";
import Sponsors from "../components/sponsors";
import Team from "../components/team";
import UpcomingEvents from "../components/upcomingEvents";

const Home: NextPage = () => {
  const newsletterRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Head>
        <title>pisa.dev - la community degli sviluppatori pisani</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Announcement
        title="Quantum computing: hands on"
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        date={new Date(2022, 6, 15)}
      />
      <Header />
      <main>
        <Hero
          cta={() => {
            console.log(newsletterRef.current);
            newsletterRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
        />
        <UpcomingEvents />
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
