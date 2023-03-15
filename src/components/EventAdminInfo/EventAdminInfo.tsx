import { FC } from "react";
import { api } from "@/utils/api";

export interface EventAdminInfoProps {
  eventId: string;
}

export const EventAdminInfo: FC<EventAdminInfoProps> = ({ eventId }) => {
  const q = api.admin.eventbrite.info.useQuery({
    id: eventId,
  });

  return (
    <div className="rounded-lg px-4 py-6 dark:bg-slate-700 dark:text-slate-300">
      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-300">
        Admin panel
      </h3>
      <div className="flex flex-col gap-8">
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {q.data ? (
            <div>
              {q.data.ticketClasses.ticket_classes.map((item) => (
                <div key={item.display_name} className="px-2 py-3 sm:p-4">
                  <dt className="text-base font-bold">
                    🎟️&nbsp;&nbsp;{item.display_name}
                  </dt>
                  <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                    <div className="flex items-baseline text-2xl font-semibold dark:text-white">
                      {item.quantity_sold}
                      <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                        su {item.quantity_total}
                      </span>
                    </div>

                    <div className="inline-flex items-baseline rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 md:mt-2 lg:mt-0">
                      {Math.floor(
                        (item.quantity_sold / item.quantity_total) * 100
                      )}
                      %
                    </div>
                  </dd>
                </div>
              ))}
            </div>
          ) : (
            <div>Loading Eventbrite data...</div>
          )}
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
