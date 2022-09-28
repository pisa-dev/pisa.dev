import { Event } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

export interface AnnouncementProps {
  event: Event;
}

export const Announcement: FC<AnnouncementProps> = ({ event }) => {
  return (
    <div className="relative bg-indigo-600 dark:bg-indigo-800">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="text-sm sm:px-16 sm:text-center sm:text-base">
          <p className="font-medium text-white">
            <span>
              🎉🔥 “{event.title}”,&nbsp;
              {event.date.toLocaleDateString(new Intl.Locale("it"), {
                day: "numeric",
                month: "long",
              })}
              &nbsp;
            </span>
            <span className="ml-2 block sm:inline-block">
              <Link href={`/event/${event.slug}`}>
                <a className="font-bold text-white underline">
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
