import Image from "next/image";
import {
  BsLinkedin,
  BsGithub,
  BsTwitter,
  BsFillHouseDoorFill,
} from "react-icons/bs";

const people = [
  {
    name: "Antonio Pitasi",
    imageUrl: "/antonio.jpg",
    // website: "https://www.pisa.dev",
    twitterUrl: "https://twitter.com/pitasiantonio",
    linkedinUrl: "https://linkedin.com/in/pitasi",
    githubUrl: "https://github.com/pitasi",
  },
  {
    name: "Federico Gerardi",
    imageUrl: "/federico.jpg",
    website: "https://azraelsec.it",
    twitterUrl: "https://twitter.com/azraelsec",
    linkedinUrl: "https://linkedin.com/in/azraelsec",
    githubUrl: "https://github.com/azraelsec",
  },
  {
    name: "Alessandro Berti",
    imageUrl: "/alessandro.webp",
    // website: "https://www.pisa.dev",
    twitterUrl: "https://twitter.com/Brotherhood94",
    linkedinUrl: "https://www.linkedin.com/in/aleberti",
    githubUrl: "https://github.com/Brotherhood94",
  },
  {
    name: "Luca Corbucci",
    imageUrl: "/luca.webp",
    website: "https://lucacorbucci.me",
    twitterUrl: "https://twitter.com/lucacorbucci",
    linkedinUrl: "https://www.linkedin.com/in/lucacorbucci/",
    githubUrl: "https://github.com/lucacorbucci",
  },
  {
    name: "Davide Anzalone",
    imageUrl: "/davide.jpeg",
    // website: "https://www.pisa.dev",
    // twitterUrl: "https://twitter.com/pitasiantonio",
    // linkedinUrl: "https://linkedin.com/in/pitasi",
    // githubUrl: "https://github.com/pitasi",
  },
  {
    name: "Andrea Canciani",
    imageUrl: "/andrea.jpeg",
    // website: "https://www.pisa.dev",
    // twitterUrl: "https://twitter.com/pitasiantonio",
    // linkedinUrl: "https://linkedin.com/in/pitasi",
    // githubUrl: "https://github.com/pitasi",
  },
  {
    name: "Marco Zeo",
    imageUrl: "/marco.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/marcozeo/",
  },
  {
    name: "Daniele Greco",
    imageUrl: "/daniele.jpeg",
    // website: "https://www.pisa.dev",
    // twitterUrl: "https://twitter.com/pitasiantonio",
    // linkedinUrl: "https://linkedin.com/in/pitasi",
    // githubUrl: "https://github.com/pitasi",
  },
  {
    name: "Davide Rossi",
    imageUrl: "/davide_rossi.jpg",
    // website: "https://www.pisa.dev",
    // twitterUrl: "https://twitter.com/pitasiantonio",
    linkedinUrl: "https://www.linkedin.com/in/davide-rossi-030a73212",
    githubUrl: "https://github.com/daviderossi11",
  }
];

export const Team = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-pink-600 dark:from-indigo-900 dark:to-pink-900">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Il team di pisa.dev
            </h2>
            <p className="text-xl text-gray-300">
              Siamo i volontari, sviluppatori, creatori e collaboratori di
              questa community.
            </p>
          </div>
          <ul
            role="list"
            className="grid grid-cols-2 gap-2 space-y-0 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-8"
          >
            {people.map((person) => (
              <li
                key={person.name}
                className="rounded-lg bg-white bg-opacity-10 py-6 px-2 text-center"
              >
                <div className="space-y-6">
                  <Image
                    objectFit="cover"
                    height="100px"
                    width="100px"
                    className="mx-auto rounded-full"
                    src={person.imageUrl}
                    alt=""
                  />
                  <div className="space-y-2">
                    <div className="space-y-1 text-lg font-medium leading-6">
                      <h3 className="text-white">{person.name}</h3>
                    </div>

                    <ul role="list" className="flex justify-center space-x-5">
                      {person.website && (
                        <li>
                          <a
                            href={person.website}
                            className="text-gray-100 hover:text-white"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="sr-only">Website</span>
                            <BsFillHouseDoorFill />
                          </a>
                        </li>
                      )}
                      {person.githubUrl && (
                        <li>
                          <a
                            href={person.githubUrl}
                            className="text-gray-100 hover:text-white"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="sr-only">GitHub</span>
                            <BsGithub />
                          </a>
                        </li>
                      )}
                      {person.twitterUrl && (
                        <li>
                          <a
                            href={person.twitterUrl}
                            className="text-gray-100 hover:text-white"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="sr-only">Twitter</span>
                            <BsTwitter />
                          </a>
                        </li>
                      )}
                      {person.linkedinUrl && (
                        <li>
                          <a
                            href={person.linkedinUrl}
                            className="text-gray-100 hover:text-white"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="sr-only">LinkedIn</span>
                            <BsLinkedin />
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
