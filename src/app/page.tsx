import HomePageClient from "./page-client";
import { getAllEvents } from "@/lib/events";

type HomePageProps = {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const showEmailVerifiedBanner =
    typeof resolvedSearchParams?.email_verified !== "undefined";

  const events = await getAllEvents();

  return (
    <HomePageClient
      showEmailVerifiedBanner={showEmailVerifiedBanner}
      events={events}
    />
  );
}
