import { FC } from "react";
import Image from "next/image";
import { Speaker } from "@prisma/client";

export interface SpeakerInfoProps {
  speaker: Speaker;
}

export const SpeakerInfo: FC<SpeakerInfoProps> = ({ speaker }) => (
  <div className="flex items-center">
    <Image
      height="36"
      width="36"
      objectFit="cover"
      className="inline-block rounded-full"
      src={speaker.imageUrl}
      alt=""
    />
    <div className="ml-3">
      <p className="text-sm font-medium text-gray-700  dark:text-gray-200">
        {speaker.name}
      </p>
      <p className="text-xs font-medium text-gray-500  dark:text-gray-400">
        {speaker.title}
      </p>
    </div>
  </div>
);
