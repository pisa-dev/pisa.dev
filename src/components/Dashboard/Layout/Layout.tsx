import { FC, Fragment, MouseEvent } from "react";
import Image from "next/future/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon, MenuIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";

const navigation = [{ name: "Dashboard", href: "/dashboard", current: true }];
const userNavigation = [
  { name: "Your Profile", href: "/dashboard/profile" },
  { name: "Sign out", href: "#", onClick: () => signOut() },
];

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export const Layout: FC<LayoutProps> = ({ children, title }) => {
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
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-white dark:bg-slate-900 shadow-sm">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <div className="block lg:hidden h-8 w-auto">
                      <Image
                        width="50px"
                        height="50px"
                        src="/logo2.svg"
                        alt="pisa.dev"
                      />
                    </div>
                    <div className="hidden lg:block h-8 w-auto">
                      <Image
                        width="200px"
                        height="50px"
                        src="/logo.svg"
                        alt="pisa.dev"
                      />
                    </div>
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "border-indigo-500 text-gray-900 dark:text-slate-200"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-300",
                          "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="rounded-full"
                          width="32px"
                          height="32px"
                          src={
                            session.user.image ||
                            `https://ui-avatars.com/api/?name=${
                              session.user.name || session.user.email
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:bg-slate-300 dark:text-slate-400 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100"
                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300",
                      "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Image
                      className="rounded-full"
                      width="40px"
                      height="40px"
                      src={
                        session.user.image ||
                        `https://ui-avatars.com/api/?name=${
                          session.user.name || session.user.email
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
                      className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-300"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header>
          <h1 className="py-10  text-3xl font-bold leading-tight text-gray-900 dark:text-slate-200">
            {title || "Dashboard"}
          </h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};
