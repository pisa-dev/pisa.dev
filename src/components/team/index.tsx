import Image from "next/image";
import { BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";

const people = [
  {
    name: "Antonio Pitasi",
    imageUrl: "/antonio.jpg",
    twitterUrl: "https://twitter.com/pitasiantonio",
    linkedinUrl: "https://linkedin.com/in/pitasi",
    githubUrl: "https://github.com/pitasi",
  },
  {
    name: "Federico Gerardi",
    imageUrl: "/federico.jpg",
    twitterUrl: "https://twitter.com/azraelsec",
    linkedinUrl: "https://linkedin.com/in/azraelsec",
    githubUrl: "https://github.com/azraelsec",
  },
  {
    name: "Alessandro Berti",
    imageUrl: "/alessandro.webp",
    // twitterUrl: "https://twitter.com/pitasiantonio",
    // linkedinUrl: "https://linkedin.com/in/pitasi",
    // githubUrl: "https://github.com/pitasi",
  },
  {
    name: "Luca Corbucci",
    imageUrl: "/luca.webp",
    twitterUrl: "https://twitter.com/lucacorbucci",
    linkedinUrl: "https://www.linkedin.com/in/lucacorbucci/",
    githubUrl: "https://github.com/lucacorbucci",
  },
  {
    name: "Davide Anzalone",
    imageUrl: "/davide.jpeg",
    // twitterUrl: "https://twitter.com/pitasiantonio",
    // linkedinUrl: "https://linkedin.com/in/pitasi",
    // githubUrl: "https://github.com/pitasi",
  },
  {
    name: "Andrea Canciani",
    imageUrl: "/andrea.jpeg",
    // twitterUrl: "https://twitter.com/pitasiantonio",
    // linkedinUrl: "https://linkedin.com/in/pitasi",
    // githubUrl: "https://github.com/pitasi",
  },
];

const Team = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-pink-600">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              Il team di pisa.dev
            </h2>
            <p className="text-xl text-gray-300">
              Siamo i volontari, sviluppatori, creatori e collaboratori di
              questa community.
            </p>
          </div>
          <ul
            role="list"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 space-y-0 lg:gap-8"
          >
            {people.map((person) => (
              <li
                key={person.name}
                className="py-6 px-2 bg-opacity-10 bg-white text-center rounded-lg"
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
                    <div className="font-medium text-lg leading-6 space-y-1">
                      <h3 className="text-white">{person.name}</h3>
                    </div>

                    <ul role="list" className="flex justify-center space-x-5">
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

export default Team;
