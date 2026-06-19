import HomePageClient from "./page-client";
import { getAllEvents } from "@/lib/events";

export default async function HomePage() {
  const events = await getAllEvents();

  return <HomePageClient events={events} />;
}
