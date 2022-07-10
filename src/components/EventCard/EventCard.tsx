import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsFillCalendarFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Event } from "@/components/UpcomingEvents";
import { SpeakerInfo } from "@/components/SpeakerInfo";

export interface EventCardProps {
  event: Event;
}

export const EventCard: FC<EventCardProps> = ({ event }) => (
  <div
    key={event.title}
    className={`flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-slate-800 ${
      new Date() > event.date ? "grayscale opacity-80" : ""
    }`}
  >
    <div className="flex-shrink-0">
      <Image
        width="1000px"
        height="500px"
        objectFit="cover"
        className="w-full"
        src={event.imageUrl}
        alt=""
      />
    </div>
    <div className="flex-1 p-6 flex flex-col justify-between">
      <div className="flex-1 text-sm font-medium gap-4 text-gray-500 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <BsFillCalendarFill />
          <p>
            {event.date.toLocaleString(new Intl.Locale("it"), {
              dateStyle: "full",
              timeStyle: "short",
            })}{" "}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <FaMapMarkerAlt />
          <p>{event.venue}</p>
        </div>
        <Link href={event.href}>
          <a className="block mt-4">
            <p className="text-xl font-semibold text-gray-900 dark:text-slate-300">
              {event.title}
            </p>
            <p className="mt-3 text-base text-gray-500 dark:text-slate-400">
              {event.description}
            </p>
          </a>
        </Link>
      </div>
      <div className="mt-6 flex items-center">
        <SpeakerInfo speaker={event.speaker} />
      </div>
    </div>
  </div>
);
