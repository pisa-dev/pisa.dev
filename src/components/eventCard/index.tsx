import { FC } from "react";
import Image from "next/image";
import { BsFillCalendar2EventFill } from "react-icons/bs";
import { FaMapPin } from "react-icons/fa";
import styles from "./eventCard.module.css";

export interface EventCardProps {
  title: string;
  href: string;
  description: string;
  date: Date;
  venue: string;
  imageUrl: string;
  author: {
    name: string;
    href: string;
    imageUrl: string;
  };
  past: boolean;
}

const EventCard: FC<EventCardProps> = (props) => (
  <>
    <div
      key={props.title}
      className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${
        props.past && styles.past
      }`}
    >
      <div className="flex-shrink-0 relative">
        <Image
          width="1000px"
          height="500px"
          objectFit="cover"
          className="w-full"
          src={props.imageUrl}
          alt=""
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1 text-sm font-medium text-purple-600 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <BsFillCalendar2EventFill />
              <p>
                {props.date.toLocaleString(new Intl.Locale("it"), {
                  dateStyle: "full",
                  timeStyle: "short",
                })}{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <FaMapPin />
            <p>{props.venue}</p>
          </div>
          <a href={props.href} className="block mt-4">
            <p className="text-xl font-semibold text-gray-900">{props.title}</p>
            <p className="mt-3 text-base text-gray-500">{props.description}</p>
          </a>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href={props.author.href}>
              <span className="sr-only">{props.author.name}</span>
              <Image
                height="40px"
                width="40px"
                className="rounded-full"
                src={props.author.imageUrl}
                alt=""
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <a href={props.author.href} className="hover:underline">
                {props.author.name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default EventCard;
