import Head from "next/head";
import { AdminOnly } from "@/components/AdminOnly";
import { EventAdminInfo } from "@/components/EventAdminInfo";
import { EventbriteCheckout } from "@/components/EventbriteCheckout";
import { EventContent } from "@/components/EventContent";
import { EventLocationInfo } from "@/components/EventLocationInfo";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SpeakerInfo } from "@/components/SpeakerInfo";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { createSSGHelpers } from "@trpc/react/ssg";
import { trpc } from "@/utils/trpc";
import { appRouter } from "@/server/router";
import { createContextInner } from "@/server/router/context";
import superjson from "superjson";

const EventPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  slug,
}) => {
  const q = trpc.useQuery(["events.get-by-slug", { slug: slug }], {
    staleTime: Infinity,
  });
  if (!q.data) {
    return <div>loading</div>;
  }

  const event = q.data;

  return (
    <>
      <Head>
        <title>{event.title} - pisa.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-prose text-lg">
            <div className="mt-8 w-full items-center justify-between">
              <div className="col-span-2 flex flex-col gap-6">
                <AdminOnly>
                  <EventAdminInfo eventId={event.eventbriteId} />
                </AdminOnly>
                {event.speakers.map((speaker) => (
                  <SpeakerInfo key={speaker.id} speaker={speaker} />
                ))}
                <h1 className="my-3 block text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
                  {event.title}
                </h1>

                <EventLocationInfo
                  location={event.location}
                  date={event.date}
                />
              </div>
            </div>

            <div className="sticky top-0 left-0 mt-4 flex w-full flex-col items-center gap-2 border-y border-slate-200 bg-white bg-opacity-90 py-4 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900 dark:bg-opacity-60 dark:text-gray-300">
              {event.date > new Date() ? (
                <>
                  <EventbriteCheckout eventId={event.eventbriteId} />
                  <span className="text-xs">
                    Evento gratuito previa registrazione
                  </span>
                </>
              ) : (
                <span className="text-xs">Iscrizioni terminate!</span>
              )}
            </div>

            <EventContent
              abstract={event.abstract}
              description={event.description}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContextInner({}),
    transformer: superjson,
  });
  const slug = context.params?.slug as string;
  if (!slug) {
    return {
      notFound: true,
    };
  }

  const event = await ssg.fetchQuery("events.get-by-slug", {
    slug,
  });
  if (!event) {
    return {
      notFound: true,
    };
  }

  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  };
};

export default EventPage;
