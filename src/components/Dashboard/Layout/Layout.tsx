import { FC, Fragment, MouseEvent } from "react";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon, MenuIcon } from "@heroicons/react/outline";
import { signIn, useSession } from "next-auth/react";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import classNames from "classnames";
import { navigation, userNavigation } from "./routes";

type NavigationDestName = keyof typeof navigation;

export interface LayoutProps {
  children: React.ReactNode;
  name?: NavigationDestName;
  title?: string;
}

export const Layout: FC<LayoutProps> = ({ children, title, name = 'Dashboard' }) => {
  const { data: session, status } = useSession();

  if (status == "unauthenticated") {
    // redirect to login page
    signIn();
    return <p>Not logged in, redirecting...</p>;
  }

  if (status == "loading" || !session) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="mb-8 min-h-full">
        <Disclosure as="nav" className="bg-white shadow-sm dark:bg-slate-900">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <Link href="/" className="flex">
                      <div className="flex flex-shrink-0 items-center">
                        <div className="block h-8 w-auto lg:hidden">
                          <Image
                            width="50"
                            height="50"
                            src="/logo2.svg"
                            alt="pisa.dev"
                          />
                        </div>
                        <div className="hidden h-auto w-auto lg:block">
                          <Image
                            width="200"
                            height="50"
                            src="/logo.svg"
                            alt="pisa.dev"
                          />
                        </div>
                      </div>
                    </Link>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {Object.entries(navigation).map(
                        ([itemName, item]) =>
                          (!item.adminOnly || session.user.admin === true) && (
                            <a
                              key={itemName}
                              href={item.href}
                              className={classNames(
                                itemName === name
                                  ? "border-indigo-500 text-gray-900 dark:text-slate-200"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-slate-400 dark:hover:border-slate-300 dark:hover:text-slate-200",
                                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                              )}
                              aria-current={
                                name === itemName ? "page" : undefined
                              }
                            >
                              {itemName}
                            </a>
                          )
                      )}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            className="rounded-full"
                            width="32"
                            height="32"
                            src={
                              session.user.image ||
                              `https://ui-avatars.com/api/?name=${session.user.name || session.user.email
                              }`
                            }
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  onClick={(e) => {
                                    if (item.onClick) {
                                      e.preventDefault();
                                      item.onClick();
                                    }
                                  }}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-slate-400 dark:hover:bg-slate-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pt-2 pb-3">
                  {Object.entries(navigation).map(
                    ([itemName, item]) =>
                      (!item.adminOnly || session.user.admin === true) && (
                        <Disclosure.Button
                          key={itemName}
                          as="a"
                          href={item.href}
                          className={classNames(
                            itemName === name
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100"
                              : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300",
                            "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                          )}
                          aria-current={itemName === name ? "page" : undefined}
                        >
                          {itemName}
                        </Disclosure.Button>
                      )
                  )}
                </div>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="rounded-full"
                        width="40"
                        height="40"
                        src={
                          session.user.image ||
                          `https://ui-avatars.com/api/?name=${session.user.name || session.user.email
                          }`
                        }
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800 dark:text-slate-200">
                        {session?.user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500 dark:text-slate-400">
                        {session?.user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                          if (item.onClick) {
                            e.preventDefault();
                            item.onClick();
                          }
                        }}
                        className="block px-4 py-2 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header>
            <h1 className="py-10  text-3xl font-bold leading-tight text-gray-900 dark:text-slate-200">
              {title || "Dashboard"}
            </h1>
          </header>
          <main>{children}</main>
        </div>
      </div>

      <Footer />
    </>
  );
};
