import { FC, useCallback, useState } from "react";
import { api } from "@/utils/api";
import { Button } from "../Form/Button";
import { CgEventbrite } from "react-icons/cg";
import { RiEditFill } from "react-icons/ri"
import Link from "next/link";
import { MdUnfoldMore } from "react-icons/md";
import { useLocalStorage } from "~/hooks/useLocalStorage";

export interface EventAdminInfoProps {
  eventId: string;
  slug: string;
}

const showAdminBannerLSKey = 'SHOW_ADMIN_BANNER_ON_EVENTS';

export const EventAdminInfo: FC<EventAdminInfoProps> = ({ eventId, slug }) => {
  const q = api.admin.eventbrite.info.useQuery({
    id: eventId,
  });

  const [show, setShow] = useLocalStorage(showAdminBannerLSKey, true);

  return (
    <div className="rounded-lg px-4 py-6 shadow-md dark:shadow-none dark:bg-slate-700 dark:text-slate-300">

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-300">
          Admin panel
        </h3>
        <Button type="button"onClick={() => setShow(!show)}>
          <MdUnfoldMore />
        </Button>
      </div>

      {show && <>
        <div className="flex gap-2 mt-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.eventbrite.it/myevent?eid=${eventId}`}
          >
            <Button type="button" title="Eventbrite">
              <CgEventbrite />
            </Button>
          </a>

          <Link href={`/me/events/${slug}/edit`}>
            <Button type="button" title="Modifica">
              <RiEditFill />
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-8">
          <dl className="mt-5 grid grid-cols-1 gap-5">
            {q.data ? (
              <div className="sm:flex sm:flex-wrap">
                {q.data.ticketClasses.ticket_classes.map((item) => (
                  <div key={item.display_name} className="px-2 py-3 sm:p-4 sm:border-l-2 sm:border-indigo-600 first:border-l-0">
                    <dt className="text-base font-bold">
                      🎟️&nbsp;&nbsp;{item.display_name}
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                      <div className="flex items-baseline text-2xl font-semibold dark:text-white sm:mr-8">
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
        </div>
      </>
      }
    </div>
  );
};
