import { FC } from "react";
import { Icon } from "../Icon";
import { Text } from "../Text";

interface AnnouncementProps {}

export const Announcement: FC<AnnouncementProps> = ({}) => {
  return (
    <div className="absolute right-0 bottom-0 flex flex-col rounded-tl-xl bg-gray-700 bg-opacity-50 p-6 backdrop-blur-lg">
      <div className="flex flex-col gap-2">
        <Text size="extra-small">Last event for 2022</Text>
        <Text weight="bold" bright>
          Web Security
        </Text>
      </div>

      <div className="my-4 h-px w-full bg-white opacity-20" />

      <div className="flex flex-col gap-2">
        <Text size="extra-small" bright>
          <Icon /> Borgo Stretto 3, Pisa
        </Text>
        <Text size="extra-small" bright>
          <Icon /> 16/12/2023, 18:30
        </Text>
      </div>
    </div>
  );
};
