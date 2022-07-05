import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef } from "react";
import Announcement from "../components/announcement";
import Footer from "../components/footer";
import Header from "../components/header";
import HeaderBanner from "../components/headerbanner";
import Hero from "../components/hero";
import NewsletterBanner from "../components/newsletter";
import Sponsors from "../components/sponsors";
import Team from "../components/team";
import UpcomingEvents from "../components/upcomingEvents";

const Home: NextPage = () => {
  const router = useRouter();
  const newsletterRef = useRef<HTMLDivElement>(null);

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
      
      <Header />
      <main>
         <div className="text-center space-y-4">
                    <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
                        Codice di condotta
                      
                    </h1>
                    <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed">
                      
                    </p>
                </div>
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
