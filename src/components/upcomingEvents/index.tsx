import Image from "next/image";
import { BsFillCalendar2EventFill } from "react-icons/bs";
import { FaMapPin } from "react-icons/fa";

const posts = [
  {
    title: "Quantum computing: hands on",
    href: "#",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
    date: new Date(2022, 6, 15, 18, 30),
    venue: "Borgo Stretto 3, Pisa",
    imageUrl: "/quantum.jpeg",
    author: {
      name: "Alessandro Berti",
      href: "#",
      imageUrl: "/alessandro.webp",
    },
  },
];

const UpcomingEvents = () => {
  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            I prossimi eventi
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Siamo continuamente alla ricerca di speaker e nuove idee. Contattaci
            e proponi un talk!
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          <div
          // filler for when we have less than 2 events
          />
          {posts.map((post) => (
            <div
              key={post.title}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex-shrink-0">
                <Image
                  width="1000px"
                  height="500px"
                  objectFit="cover"
                  className="w-full"
                  src={post.imageUrl}
                  alt=""
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1 text-sm font-medium text-purple-600 gap-4">
                  <div className="flex items-center gap-1">
                    <BsFillCalendar2EventFill />
                    <p>
                      {post.date.toLocaleString(new Intl.Locale("it"), {
                        dateStyle: "full",
                        timeStyle: "short",
                      })}{" "}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaMapPin />
                    <p>{post.venue}</p>
                  </div>
                  <a href={post.href} className="block mt-4">
                    <p className="text-xl font-semibold text-gray-900">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {post.description}
                    </p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href={post.author.href}>
                      <span className="sr-only">{post.author.name}</span>
                      <Image
                        height="40px"
                        width="40px"
                        className="rounded-full"
                        src={post.author.imageUrl}
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href={post.author.href} className="hover:underline">
                        {post.author.name}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
