import { FC } from "react";
import { EventCard } from "../EventCard";
import { Speaker } from "../SpeakerInfo";

export interface Event {
  title: string;
  href: string;
  description: string;
  date: Date;
  venue: string;
  imageUrl: string;
  speaker: Speaker;
}

export interface UpcomingEventsProps {
  events: Event[];
}

export const UpcomingEvents: FC<UpcomingEventsProps> = ({ events }) => {
  return (
    <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white dark:bg-black dark:bg-opacity-10 h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-slate-200 sm:text-4xl">
            I prossimi eventi
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-slate-400 sm:mt-4">
            Siamo continuamente alla ricerca di speaker e nuove idee. Contattaci
            e proponi un talk!
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          <div
          // filler for when we have less than 2 events
          />
          {events.map((event) => (
            <EventCard key={event.href} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};
