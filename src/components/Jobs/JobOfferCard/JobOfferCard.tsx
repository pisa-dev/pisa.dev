import { FC } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { RemoteKind } from "@prisma/client";
import { JobOfferWithTags } from "~/server/api/routers/jobs";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { JobOfferTagList } from "../JobOfferTagList";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
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
    yy: "%da",
  },
});

export const JobOfferCard: FC<{ jobOffer: JobOfferWithTags }> = ({
  jobOffer,
}) => {
  return (
    <div
      key={jobOffer.id}
      className={classNames(
        "w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md dark:border-slate-600 dark:bg-slate-800",
        "hover:shadow-slate-300 dark:hover:shadow-purple-900"
      )}
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-center justify-between gap-x-4 rounded-xl py-2 px-4">
              <div className="h-full min-w-0 flex-[4_0_0%] text-left">
                <h2 className="text-md truncate font-medium sm:text-lg">
                  {jobOffer.title}
                </h2>
                <div className="lg:text-md mb-2 truncate text-sm">
                  {jobOffer.companyName}
                </div>
                <div className="mb-1 flex flex-wrap gap-2 text-[10px] sm:text-xs">
                  {jobOffer.location && (
                    <div className="truncate rounded-lg border border-gray-300 py-[2px] px-1 dark:border-slate-600 dark:bg-slate-700">
                      📍 {jobOffer.location}
                    </div>
                  )}
                  <div className="truncate whitespace-pre rounded-lg border border-gray-300 py-[2px] px-1 dark:border-slate-600 dark:bg-slate-700">
                    {jobOffer.remote === RemoteKind.full && `🌎 Remoto`}
                    {jobOffer.remote === RemoteKind.no && `🖥️  In sede`}
                    {jobOffer.remote === RemoteKind.partial && `💻  Ibrido`}
                  </div>
                  <div className="truncate rounded-lg border border-gray-300 py-[2px] px-1 dark:border-slate-600 dark:bg-slate-700">
                    💰 {jobOffer.salaryRange}
                  </div>
                </div>
              </div>
              <div
                className={classNames("hidden flex-[3_0_0%]", {
                  "lg:block": !open,
                })}
              >
                <JobOfferTagList
                  tags={jobOffer.tags}
                  limit={open ? undefined : 3}
                />
              </div>
              <div
                className={classNames(
                  "sm:text-md justify-self-end text-sm font-medium lg:mr-16",
                  {
                    "bg-gradient-brand bg-clip-text font-bold uppercase text-transparent":
                      dayjs(jobOffer.createdAt).fromNow(true) === "New",
                  }
                )}
              >
                {dayjs(jobOffer.createdAt).fromNow(true)}
              </div>
              <ChevronDownIcon
                className={classNames(
                  "w-5 flex-shrink-0 transition-transform",
                  { "rotate-180": open }
                )}
              />
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
                <div className="prose prose-indigo mx-auto mt-10 mb-4 text-center text-sm dark:prose-invert sm:text-base">
                  Interessato?{" "}
                  <a
                    href={
                      jobOffer.offerURL.includes("@")
                        ? `mailto:${jobOffer.offerURL}`
                        : jobOffer.offerURL
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    Clicca qui
                  </a>{" "}
                  per candidarti.
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
