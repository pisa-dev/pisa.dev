import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>pisa.dev - la community degli sviluppatori pisani</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-1/2 min-h-screen mx-auto gap-4">
        <img className="w-full max-w-md" alt="pisa.dev logo" src="/logo.svg" />
        <img
          className="w-full max-w-sm"
          alt="la community degli sviluppatori pisani"
          src="/sublogo.svg"
        />
      </main>
    </>
  );
};

export default Home;
