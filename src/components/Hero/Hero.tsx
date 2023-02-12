import Image from "next/image";
import { FC } from "react";

export interface HeroProps {
  cta: () => void;
}

export const Hero: FC<HeroProps> = ({ cta }) => {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 bottom-0 h-1/2 dark:bg-black dark:bg-opacity-10" />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
          <div className="absolute inset-0">
            <Image
              priority
              fill
              src="/hero.jpeg"
              className="object-cover"
              alt="Conference crowd"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-800 mix-blend-multiply" />
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-white">la community degli</span>
              <span className="block bg-gradient-to-r from-pink-300 to-purple-200 bg-clip-text text-transparent">
                sviluppatori pisani
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-center text-xl text-purple-100 sm:max-w-3xl">
              Eventi gratuiti e informali per favorire lo scambio di conoscenza
              e la crescita professionale.
            </p>
            <div className="mx-auto mt-10 flex justify-center">
              <button
                onClick={cta}
                className="flex items-center justify-center rounded-md border border-transparent bg-purple-600 bg-opacity-80 px-4 py-3 text-base font-medium text-white shadow-sm backdrop-blur-sm hover:bg-opacity-70 sm:px-8"
              >
                Registrati alla newsletter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
