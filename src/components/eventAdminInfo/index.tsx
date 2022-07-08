import { FC } from "react";
import { trpc } from "../../utils/trpc";

export interface EventAdminInfoProps {
  eventId: string;
}

const EventAdminInfo: FC<EventAdminInfoProps> = ({ eventId }) => {
  const q = trpc.useQuery([
    "admin.eventbrite.info",
    {
      id: eventId,
    },
  ]);

  const stats = [
    {
      name: "Biglietti venduti",
      stat: q.data?.capacity.sold,
    },
    {
      name: "Biglietti in attesa",
      stat: q.data?.capacity.pending,
    },
    {
      name: "Capacità totale",
      stat: q.data?.capacity.total,
    },
  ];

  return (
    <div className="dark:text-slate-300 dark:bg-slate-700 px-4 py-6 rounded-lg">
      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-slate-300">
        Admin panel
      </h3>
      <div className="flex flex-col gap-8">
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="px-4 py-5 bg-white dark:bg-slate-800 shadow rounded-lg overflow-hidden sm:p-6"
            >
              <dt className="text-sm font-medium text-gray-500 dark:text-slate-400 truncate">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-slate-300">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm"
          href={`https://www.eventbrite.it/myevent?eid=${eventId}`}
        >
          Modifica questo evento su Eventbrite
        </a>
      </div>
    </div>
  );
};

export default EventAdminInfo;
