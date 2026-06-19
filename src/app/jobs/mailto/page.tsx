"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IoMdSend } from "react-icons/io";

export default function JobsMailtoPage() {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAddress(params.get("address") || "");
  }, []);

  return (
    <>
      <Header />

      <main>
        <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-slate-200 sm:text-2xl">
            <span className="block">
              Contatta l{"'"}indirizzo email per chiedere informazioni e
              candidarsi
            </span>
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="ml-3 inline-flex">
              <a
                href={`mailto:${address}`}
                className="align-center inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-2 text-base font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70 disabled:opacity-40 sm:p-4"
              >
                <span>{address || "caricamento..."}</span>
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
}
