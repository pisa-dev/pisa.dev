import { notFound } from "next/navigation";
import { Metadata } from "next";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { AdminOnly } from "@/components/AdminOnly";
import { EventAdminInfo } from "@/components/EventAdminInfo";
import { EventbriteCheckout } from "@/components/EventbriteCheckout";
import { EventContent } from "@/components/EventContent";
import { EventLocationInfo } from "@/components/EventLocationInfo";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SpeakerInfo } from "@/components/SpeakerInfo";

type EventPageProps = {
  params: {
    slug: string;
  };
};

async function getEvent(slug: string) {
  const caller = appRouter.createCaller(
    createInnerTRPCContext({ session: null }),
  );
  try {
    const event = await caller.events.getBySlug({ slug });
    return event;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const event = await getEvent(params.slug);

  if (!event) {
    return {};
  }

  return {
    title: `${event.title} - pisa.dev`,
    openGraph: {
      images: [`/api/img/events/${params.slug}`],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEvent(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-prose text-lg">
            <div className="mt-8 w-full items-center justify-between">
              <div className="col-span-2 flex flex-col gap-6">
                {event.eventbriteId && (
                  <AdminOnly>
                    <EventAdminInfo eventId={event.eventbriteId} />
                  </AdminOnly>
                )}
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
                  {event.eventbriteId && (
                    <EventbriteCheckout eventId={event.eventbriteId} />
                  )}
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
}
