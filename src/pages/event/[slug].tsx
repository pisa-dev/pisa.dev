import Head from "next/head";
import EventbriteCheckout from "../../components/eventbriteCheckout";
import EventContent from "../../components/eventContent";
import EventLocationInfo from "../../components/eventLocationInfo";
import Footer from "../../components/footer";
import Header from "../../components/header";
import SpeakerInfo, { Speaker } from "../../components/speakerInfo";

const speaker: Speaker = {
  name: "Alessandro Berti",
  title: "PhD Student in Quantum Computing @ UniPi",
  imageUrl: "/alessandro.webp",
};

const eventbriteID = "380159706917";

const EventPage = () => {
  return (
    <>
      <Head>
        <title>pisa.dev - la community degli sviluppatori pisani</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto mb-16">
            <div className="mt-8 w-full items-center justify-between">
              <div className="flex flex-col col-span-2 gap-6">
                <SpeakerInfo speaker={speaker} />
                <h1 className="my-3 block text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
                  Quantum Computing: Lov Grover
                </h1>

                <EventLocationInfo
                  location="Borgo Stretto 3, Pisa"
                  date={new Date(2022, 6, 15, 18, 30)}
                />
              </div>
            </div>

            <div className="sticky flex flex-col gap-2 py-4 mt-4 items-center w-full bg-white dark:bg-slate-900 dark:text-gray-300 border-slate-200 dark:border-slate-700 dark:bg-opacity-60 bg-opacity-90 backdrop-blur-sm top-0 left-0 border-y">
              <EventbriteCheckout eventId={eventbriteID} />
              <span className="text-xs">
                Evento gratuito previa registrazione
              </span>
            </div>

            <EventContent />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EventPage;
