import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>pisa.dev - la community degli sviluppatori pisani</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-28">
        <section>
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
            <div className="flex flex-wrap items-center mx-auto max-w-7xl">
              <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
                <div className="flex flex-col items-center align-middle">
                  <div className="relative w-full max-w-lg p-4">
                    <div className="absolute top-0 rounded-full bg-amber-100 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute rounded-full bg-fuchsia-100 -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                    <div className="relative">
                      <Image
                        objectFit="fill"
                        height="400px"
                        width="620px"
                        className="mx-auto drop-shadow-[0_0_6px_white]"
                        alt="hero"
                        src="/logo2.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
                <span className="mb-8 text-xs font-bold tracking-widest text-orange-600 uppercase">
                  made with {`<`}3 in pisa
                </span>
                <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl">
                  la community degli sviluppatori pisani
                </h1>
                <p className="mb-8 text-base leading-relaxed text-left text-gray-500">
                  Il punto di riferimento per chiunque sviluppi software: eventi
                  gratuiti, scambio di idee e crescita personale nel cuore della
                  città dalla torre pendente.
                </p>

                <p className="mb-8 text-base leading-relaxed text-left text-gray-500">
                  <strong>Iscriviti alla newsletter</strong> per ricevere gli
                  aggiornamenti della community e non perderti i prossimi
                  eventi!
                </p>
                <div className="flex-col mt-0 lg:mt-6 max-w-7xl sm:flex">
                  <form
                    action=""
                    method="post"
                    id="revue-form"
                    name="revue-form"
                    target="_blank"
                    className="p-2 mt-8 transition duration-500 ease-in-out transform border2 bg-gray-50 rounded-xl sm:max-w-lg sm:flex"
                  >
                    <div className="flex-1 min-w-0 revue-form-group">
                      <label htmlFor="member_email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="cta-email"
                        type="email"
                        className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform bg-transparent border border-transparent rounded-md text-neutral-600 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        placeholder="Inserisci la tua email"
                      />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-3 revue-form-actions">
                      <button
                        type="submit"
                        value="Subscribe"
                        name="member[subscribe]"
                        id="member_submit"
                        className="block w-full px-5 py-3 text-base font-medium text-white bg-orange-600 border border-transparent rounded-lg shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 sm:px-10"
                      >
                        Iscrivimi
                      </button>
                    </div>
                  </form>
                  <div className="sm:max-w-lg sm:flex">
                    <p className="mt-3 text-xs text-gray-500">
                      Iscrivendoti stai accendo i nostri{" "}
                      <a
                        target="_blank"
                        href="https://www.getrevue.co/terms"
                        rel="noreferrer"
                      >
                        Termini di Servizio
                      </a>{" "}
                      e{" "}
                      <a
                        target="_blank"
                        href="https://www.getrevue.co/privacy"
                        rel="noreferrer"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto text-center">
          <p className="mb-8 text-base leading-relaxed text-gray-500">
            Partners
          </p>
          <div className="grid grid-cols-3 gap-12 mx-auto lg:grid-cols-3">
            {[
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
            ].map(({ href, src, alt }) => (
              <a href={href} key={src}>
                <Image
                  className="saturate-0 opacity-80 hover:opacity-100 hover:saturate-100"
                  width="112px"
                  height="112px"
                  src={src}
                  alt={alt}
                />
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
