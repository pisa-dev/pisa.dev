import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { IoMdSend } from "react-icons/io";

const JobsMailtoPage = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <>
      <Head>
        <title>pisa.dev - la community degli sviluppatori pisani</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-slate-200 sm:text-2xl">
            <span className="block">
              Contatta l{"'"}indizzo email per chiedere informazioni e
              candidarsi
            </span>
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="ml-3 inline-flex">
              <a
                href={`mailto://${address}`}
                className="align-center inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-2 text-base font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70 disabled:opacity-40 sm:p-4"
                type="submit"
              >
                <span>{address}</span>
                <span>
                  <IoMdSend />
                </span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default JobsMailtoPage;
