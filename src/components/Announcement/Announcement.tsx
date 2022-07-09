import Link from "next/link";
import { FC } from "react";
import { Event } from "../UpcomingEvents";

export interface AnnouncementProps {
  event: Event;
}

export const Announcement: FC<AnnouncementProps> = ({ event }) => {
  return (
    <div className="relative bg-indigo-600 dark:bg-indigo-800">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="text-sm sm:text-base sm:text-center sm:px-16">
          <p className="font-medium text-white">
            <span>
              🎉🔥 “{event.title}”,&nbsp;
              {event.date.toLocaleDateString(new Intl.Locale("it"), {
                day: "numeric",
                month: "long",
              })}
              &nbsp;
            </span>
            <span className="block sm:inline-block ml-2">
              <Link href={event.href}>
                <a className="text-white font-bold underline">
                  Info e registrazione<span aria-hidden="true">&rarr;</span>
                </a>
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
