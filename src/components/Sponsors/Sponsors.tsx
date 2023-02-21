import Image from "next/image";
import Link from "next/link";

const sponsors = [
  {
    href: "https://pointerpodcast.it",
    src: "/pointerpodcast.png",
    alt: "Pointer Podcast",
  },
  {
    href: "https://superherovalley.fun/",
    src: "/superherovalley.png",
    alt: "Superhero Valley",
  },
  {
    href: "https://www.schrodinger-hat.it/",
    src: "/schroedinger-hat.png",
    alt: "Schroedinger Hat",
  },
  // {
  //   href: "https://geckosoft.it",
  //   src: "/geckosoft.png",
  //   alt: "Geckosoft",
  // },
];

export const Sponsors = () => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-500">
          In collaborazione con
        </p>
        <div className="mt-6 grid grid-cols-3 gap-8 md:grid-cols-6 lg:grid-cols-3">
          {sponsors.map(({ href, src, alt }) => (
            <div
              key={href}
              className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
            >
              <Link target="_blank" rel="noreferrer" href={href} key={src}>
                <Image
                  className="opacity-80 saturate-0 hover:opacity-100 hover:saturate-100 dark:opacity-90"
                  width="64"
                  height="64"
                  src={src}
                  alt={alt}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
