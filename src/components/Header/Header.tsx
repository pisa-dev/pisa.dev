import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { BsTelegram, BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

const navigation = [
  // { name: "Contatti", href: "#", current: false },
  {
    name: "Gruppo Telegram",
    href: "https://t.me/pisadev",
    external: true,
    current: false,
    icon: BsTelegram,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/pisa_dev",
    external: true,
    current: false,
    icon: BsTwitter,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/pisa-dev",
    external: true,
    icon: BsLinkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/pisa-dev",
    external: true,
    current: false,
    icon: BsGithub,
  },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export const Header = () => {
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 py-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-800 dark:focus:ring-slate-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex w-full flex-1 items-center justify-center lg:items-stretch lg:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Image
                      height="60"
                      width="200"
                      src="/logo.svg"
                      alt="pisa.dev"
                      title="Home"
                      className="dark:drop-shadow-xl"
                    />
                  </Link>
                </div>
                <div className="hidden items-center sm:ml-6 lg:flex">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className={classNames(
                          item.current
                            ? "bg-slate-700 text-white dark:bg-black dark:bg-opacity-40 dark:text-slate-300"
                            : "text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-black dark:hover:bg-opacity-20",
                          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.icon && <item.icon />}
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  as={Link}
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                >
                  <span
                    className={classNames(
                      item.current
                        ? "bg-slate-700 text-white dark:bg-black dark:bg-opacity-40 dark:text-slate-300"
                        : "text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-black dark:hover:bg-opacity-20",
                      "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.icon && <item.icon />}
                    {item.name}
                  </span>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
