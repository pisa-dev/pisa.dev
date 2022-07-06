import EventCard from "../eventCard";

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
    past: false,
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
          {posts.map((post, i) => (
            <EventCard key={i} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
