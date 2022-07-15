import { FC, useState } from "react";
import { BsX } from "react-icons/bs";

export interface HeaderBannerProps {
  className: string;
  text: string;
}

export const HeaderBanner: FC<HeaderBannerProps> = ({ className, text }) => {
  const [closed, setClosed] = useState(false);
  const onClose = () => setClosed(true);

  if (closed) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:px-16 sm:text-center">
          <p className="font-medium text-white">
            <span>{text}</span>
          </p>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-start sm:pt-1 sm:pr-2">
          <button
            type="button"
            onClick={onClose}
            className="flex rounded-md p-2 hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">Dismiss</span>
            <BsX className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
