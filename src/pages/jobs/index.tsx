import React, { useMemo } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JobOfferCard } from "@/components/Jobs/JobOfferCard/JobOfferCard";
import { AnchorButton } from "@/components/Form/AnchorButton";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { JobOfferSkeleton } from "@/components/Jobs/JobOfferSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

const JobsPage: NextPage = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } =
    api.jobs.getPage.useInfiniteQuery(
      { limit: 20 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const dataLength = useMemo(() => {
    return data
      ? data.pages.reduce((tot, page) => tot + page.items.length, 0)
      : 0;
  }, [data]);

  return (
    <div className="flex min-h-screen w-screen flex-col">
      <Head>
        <title>Offerte di lavoro - pisa.dev</title>
      </Head>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex justify-between pt-10">
          <h1 className="pb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-slate-200">
            Offerte di lavoro
          </h1>
          <Link passHref legacyBehavior href="/jobs/new">
            <AnchorButton className="flex h-fit items-center">
              Pubblica offerta
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </AnchorButton>
          </Link>
        </div>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Puoi anche consultare le nuove offerte tramite il nostro{" "}
          <Link
            target="_blank"
            href="https://t.me/pisajobs"
            className="underline"
          >
            canale Telegram dedicato
          </Link>
          .
        </p>

        <div className="mt-10">
          <InfiniteScroll
            className="space-y-4"
            dataLength={dataLength}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<JobOfferSkeleton />}
          >
            {data &&
              data.pages.map((page, i) => (
                <React.Fragment key={i}>
                  {page.items.map((jobOffer) => (
                    <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} />
                  ))}
                </React.Fragment>
              ))}
          </InfiniteScroll>

          {isLoading && <JobOfferSkeleton />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobsPage;
