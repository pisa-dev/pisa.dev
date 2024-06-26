import { FC } from "react";
import { BsFillCalendarFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";

export interface EventLocationInfoProps {
  date: Date;
  location: string;
}

export const EventLocationInfo: FC<EventLocationInfoProps> = ({
  date,
  location,
}) => (
  <div className="flex flex-col gap-4 text-gray-500 dark:text-gray-300">
    <div className="flex items-center gap-4">
      <BsFillCalendarFill className="" />
      <span>
        {date.toLocaleString(new Intl.Locale("it"), {
          dateStyle: "full",
          timeStyle: "short",
        })}
      </span>
    </div>

    <div className="flex items-center gap-4">
      <FaMapMarkerAlt className="row-span-2 self-center justify-self-center" />
      <a
        rel="noreferrer"
        target="_blank"
        href={`https://www.google.com/maps/search/?api=1&query=${location}`}
      >
        <span>{location}</span>
      </a>
    </div>
  </div>
);
