import React from "react";

export const JobOfferSkeleton: React.FC = () => ((
  <div role="status" className="w-full animate-pulse space-y-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="h-[95px] py-4 px-4 rounded-xl animate-pulse border border-gray-200 dark:divide-gray-700 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-3.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-36 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="flex gap-1">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-8"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-8"></div>
            </div>
          </div>
          <div className="hidden lg:flex gap-3">
            <div className="h-5 w-12 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="h-5 w-12 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="h-5 w-12 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-3 w-6 mr-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
    ))}
    <span className="sr-only">Loading...</span>
  </div>
))
