import Image from "next/image";

const sponsors = [
  {
    href: "https://pointerpodcast.it",
    src: "/pointerpodcast.png",
    alt: "Pointer Podcast",
  },
  {
    href: "https://www.superheroesvalley.fun/",
    src: "/superheroesvalley.png",
    alt: "Superheroes Valley",
  },
  {
    href: "https://geckosoft.it",
    src: "/geckosoft.png",
    alt: "Geckosoft",
  },
];

const Sponsors = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
          In collaborazione con
        </p>
        <div className="mt-6 grid grid-cols-3 gap-8 md:grid-cols-6 lg:grid-cols-3">
          {sponsors.map(({ href, src, alt }) => (
            <div
              key={href}
              className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
            >
              <a href={href} key={src}>
                <Image
                  className="saturate-0 opacity-80 hover:opacity-100 hover:saturate-100"
                  width="64px"
                  height="64px"
                  src={src}
                  alt={alt}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;