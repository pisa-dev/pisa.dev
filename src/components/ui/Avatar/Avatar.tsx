import Link from "next/link";
import { FC } from "react";
import {
  AiFillHome,
  AiFillTwitterCircle,
  AiFillGithub,
  AiFillLinkedin,
} from "react-icons/ai";
import { Text } from "../Text";

interface AvatarProps {
  src: string;
  name: string;
  title: string;

  website?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export const Avatar: FC<AvatarProps> = ({
  src,
  name,
  title,
  website,
  linkedin,
  twitter,
  github,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-full">
          <img className="object-cover" src={src} />
        </div>
        <div className="absolute bottom-0 flex w-full justify-evenly rounded-2xl bg-white py-1 px-3">
          <SocialLink href={website}>
            <AiFillHome />
          </SocialLink>
          <SocialLink href={linkedin}>
            <AiFillLinkedin />
          </SocialLink>
          <SocialLink href={twitter}>
            <AiFillTwitterCircle />
          </SocialLink>
          <SocialLink href={github}>
            <AiFillGithub />
          </SocialLink>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Text bright size="large" weight="semibold">
          {name}
        </Text>
        <Text size="medium">{title}</Text>
      </div>
    </div>
  );
};

interface SocialLinkProps {
  href?: string;
  children: React.ReactNode;
}

const SocialLink: FC<SocialLinkProps> = ({ href, children }) => {
  if (!href) return null;
  return (
    <span className="">
      <Link href={href} legacyBehavior>
        <a className="text-lg text-gray-600 hover:text-pink-500">{children}</a>
      </Link>
    </span>
  );
};
