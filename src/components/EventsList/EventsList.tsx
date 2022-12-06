import { FC } from "react";
import { EventCard } from "@/components/EventCard";
import { EventWithSpeaker } from "@/server/router/events";

export interface UpcomingEventsProps {
  title: string;
  description: string;
  events: EventWithSpeaker[];
}

export const EventsList: FC<UpcomingEventsProps> = ({
  title,
  description,
  events,
}) => {
  return (
    <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white dark:bg-black dark:bg-opacity-10 sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200 sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 dark:text-slate-400 sm:mt-4">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {events.length < 2 && <div />}
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};
