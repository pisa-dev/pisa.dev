import { FC } from "react";
import { Event } from "../upcomingEvents";

export interface AnnouncementProps {
  event: Event;
}

const Announcement: FC<AnnouncementProps> = ({ event }) => {
  return (
    <div className="relative bg-indigo-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-white">
            <span>🎉🔥 “{event.title}”</span>
            <span>, </span>
            <span>
              {event.date.toLocaleDateString(new Intl.Locale("it"), {
                day: "numeric",
                month: "long",
              })}
            </span>
            <span className="inline-block ml-2">
              <a href={event.href} className="text-white font-bold underline">
                {" "}
                Info e registrazione<span aria-hidden="true">&rarr;</span>
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
