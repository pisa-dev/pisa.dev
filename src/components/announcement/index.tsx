import { FC } from "react";

export interface AnnouncementProps {
  title: string;
  href: string;
  date: Date;
}

const Announcement: FC<AnnouncementProps> = ({ title, date, href }) => {
  return (
    <div className="relative bg-indigo-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-white">
            <span>🎉🔥 “{title}”</span>
            <span>, </span>
            <span>
              {date.toLocaleDateString(new Intl.Locale("it"), {
                day: "numeric",
                month: "long",
              })}
            </span>
            <span className="inline-block ml-2">
              <a href={href} className="text-white font-bold underline">
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
