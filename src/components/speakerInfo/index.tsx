import { FC } from "react";
import Image from "next/image";

export interface Speaker {
  name: string;
  title?: string;
  imageUrl: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface SpeakerInfoProps {
  speaker: Speaker;
}

const SpeakerInfo: FC<SpeakerInfoProps> = ({ speaker }) => (
  <div className="flex items-center">
    <Image
      height="36px"
      width="36px"
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

export default SpeakerInfo;
