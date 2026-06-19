import { notFound } from "next/navigation";
import { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getEventBySlug, getAllSlugs } from "@/lib/events";
import { EventLocationInfo } from "@/components/EventLocationInfo";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SpeakerInfo } from "@/components/SpeakerInfo";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {};
  }

  return {
    title: `${event.title} - pisa.dev`,
    openGraph: {
      images: [`/api/img/events/${slug}`],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const mdx = await compileMDX({
    source: event.content,
  });

  return (
    <>
      <Header />
      <main>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-prose text-lg">
            <div className="mt-8 w-full items-center justify-between">
              <div className="col-span-2 flex flex-col gap-6">
                {event.speakers.map((speaker, i) => (
                  <SpeakerInfo key={i} speaker={speaker} />
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
                <span className="text-xs">
                  Evento gratuito previa registrazione
                </span>
              ) : (
                <span className="text-xs">Iscrizioni terminate!</span>
              )}
            </div>

            <div className="prose prose-lg prose-indigo mx-auto mt-6 dark:prose-invert">
              {mdx.content}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
