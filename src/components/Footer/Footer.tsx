import { BsGithub, BsLinkedin, BsTelegram } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { PrivacyPolicyLink } from "@/components/PrivacyPolicyLink";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/pisa-dev",
    icon: BsGithub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/pisa-dev",
    icon: BsLinkedin,
  },
  {
    name: "Telegram",
    href: "https://t.me/pisadev",
    icon: BsTelegram,
  },
];

export const Footer = () => {
  return (
    <footer
      className="bg-gray-50 dark:bg-black dark:bg-opacity-25"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl space-y-4 px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24">
        <div className="mt-12 border-t border-gray-200 pt-8 text-gray-400 dark:text-gray-300 md:flex md:items-center md:justify-between lg:mt-16">
          <div className="flex space-x-6 md:order-2">
            {socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-gray-500 dark:hover:text-gray-100"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base md:order-1 md:mt-0">
            &copy; 2022 pisa.dev - Tutti i diritti riservati.
            <span className="mx-2">|</span>
            <Link href="/code-of-conduct">Codice di condotta</Link>
            <span className="mx-2">|</span>
            <PrivacyPolicyLink />
          </p>
        </div>
        <div>
          <Link href="https://vercel.com/?utm_source=pisa-dev&utm_campaign=oss">
            <a>
              <Image
                width="212px"
                height="44px"
                src="/powered-by-vercel.svg"
                alt="powered by Vercel"
              />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};
