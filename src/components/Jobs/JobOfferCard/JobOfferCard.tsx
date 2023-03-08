import { FC } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { RemoteKind } from "@prisma/client";
import { JobOfferWithTags } from "@/server/router/jobs";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { JobOfferTagList } from "../JobOfferTagList";

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.locale("en");
dayjs.updateLocale("en", {
  relativeTime: {
    s: "New",
    m: "New",
    mm: "New",
    h: "New",
    hh: "New",
    d: "New",
    dd: "%dg",
    M: "1m",
    MM: "%dm",
    y: "1a",
    yy: "%da"
  }
})

export const JobOfferCard: FC<{ jobOffer: JobOfferWithTags }> = ({ jobOffer }) => {
  return (
    <div
      key={jobOffer.id}
      className={classNames(
        "w-full rounded-xl shadow-md overflow-hidden border border-gray-200 bg-white dark:bg-slate-800 dark:border-slate-600",
        "hover:shadow-slate-300 dark:hover:shadow-purple-900"
      )}
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full rounded-xl py-2 px-4 flex items-center justify-between gap-x-4">
              <div className="text-left flex-[4_0_0%] h-full min-w-0">
                <h2 className="text-md sm:text-lg font-medium truncate">
                  {jobOffer.title}
                </h2>
                <div className="text-sm lg:text-md mb-2 truncate">
                  {jobOffer.companyName}
                </div>
                <div className="flex flex-wrap text-[10px] sm:text-xs gap-2 mb-1">
                  {jobOffer.location && <div className="py-[2px] px-1 truncate rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700">
                    📍 {jobOffer.location}
                  </div>}
                  <div className="py-[2px] px-1 truncate rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 whitespace-pre">
                    {jobOffer.remote === RemoteKind.full && `🌎 Remoto`}
                    {jobOffer.remote === RemoteKind.no && `🖥️  In sede`}
                    {jobOffer.remote === RemoteKind.partial && `💻  Ibrido`}
                  </div>
                  <div className="py-[2px] px-1 truncate border rounded-lg border-gray-300 dark:border-slate-600 dark:bg-slate-700">
                    💰 {jobOffer.salaryRange}
                  </div>
                </div>
              </div>
              <div className={classNames("flex-[3_0_0%] hidden", { "lg:block": !open })}>
                <JobOfferTagList tags={jobOffer.tags} limit={open ? undefined : 3} />
              </div>
              <div className={classNames(
                "justify-self-end text-sm font-medium sm:text-md lg:mr-16",
                { "font-bold uppercase bg-gradient-brand bg-clip-text text-transparent": dayjs(jobOffer.createdAt).fromNow(true) === "New" }
              )}>
                {dayjs(jobOffer.createdAt).fromNow(true)}
              </div>
              <ChevronDownIcon className={classNames("w-5 flex-shrink-0 transition-transform", { "rotate-180": open })} />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 py-2">
              {!!jobOffer.tags.length && (
                <div className="mt-1 mb-5 flex justify-between">
                  <JobOfferTagList tags={jobOffer.tags} />
                </div>
              )}
              <p className="whitespace-pre-line text-sm sm:text-base">
                {jobOffer.description}
              </p>
              {jobOffer.offerURL && (
                <div className="mt-10 mb-4 text-sm sm:text-base mx-auto text-center prose prose-indigo dark:prose-invert">
                  Interessato?{" "}
                  <a
                    href={jobOffer.offerURL.includes("@")
                      ? `mailto:${jobOffer.offerURL}`
                      : jobOffer.offerURL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Clicca qui
                  </a> per candidarti.
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div >
  );
};
