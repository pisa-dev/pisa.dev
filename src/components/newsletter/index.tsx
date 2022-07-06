import { FC, FormEvent, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { usePlausible } from "next-plausible";
import { trpc } from "../../utils/trpc";

const NewsletterBanner: FC = () => {
  const [email, setEmail] = useState("");
  const newsletterMutation = trpc.useMutation("newsletter.subscribe");
  const plausible = usePlausible();

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    newsletterMutation.mutate({ email });
  };

  const disabled =
    newsletterMutation.isLoading ||
    newsletterMutation.isError ||
    newsletterMutation.isSuccess;
  const success = newsletterMutation.isSuccess;
  const errored = newsletterMutation.isError;

  return (
    <section className="sm:my-20">
      <h2 className="sr-only">Newsletter</h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mx-4 overflow-hidden bg-pink-50 py-20 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:rounded-3xl md:px-16 xl:px-24 xl:py-36">
          <div className="absolute top-0 left-8 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

          <div className="relative mx-auto grid max-w-2xl grid-cols-1 gap-x-32 gap-y-14 xl:max-w-none xl:grid-cols-2">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Sei pronto a partecipare?</span>
                <span className="block bg-gradient-to-br from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Rimaniamo in contatto.
                </span>
              </h2>
              <p className="mt-2 text-lg">
                I nostri eventi sono gratuiti ma i posti sono limitati.
                Iscrivendoti non rischierai di arrivare tardi!
              </p>
            </div>
            <form onSubmit={onFormSubmit}>
              <h3 className="text-lg font-semibold tracking-tight text-indigo-800">
                Iscriviti alla nostra newsletter{" "}
                <span aria-hidden="true">↓</span>
              </h3>
              <div className="mt-5 flex rounded-3xl bg-white py-2.5 pr-2.5 shadow-xl shadow-blue-900/5 focus-within:ring-2 focus-within:ring-indigo-800">
                <label htmlFor="email" className="sr-only">
                  Indirizzo email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Indirizzo email"
                  className="-my-2.5 border-none flex-auto bg-transparent pl-6 pr-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:ring-0"
                  onFocus={() => plausible("newsletter-input-focus")}
                />
                <button
                  className="inline-flex justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-2 sm:p-4 text-base font-semibold text-white hover:bg-blue-500 active:text-white/70 focus:outline-none focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-blue-500 disabled:opacity-40"
                  type="submit"
                  disabled={disabled}
                >
                  <span className="sr-only sm:not-sr-only">
                    Iscriviti subito
                  </span>
                  <span className="sm:hidden">
                    <IoMdSend />
                  </span>
                </button>
              </div>
              {success && (
                <p className="text-lg font-semibold text-black mt-4">
                  Fatto! Controlla la tua casella per verificare il tuo
                  indirizzo e iniziare a ricevere le nostre email.
                </p>
              )}
              {errored && (
                <p className="text-lg font-semibold text-red-700 mt-4">
                  Oops! Si è verificato un errore nel gestire la richiesta,
                  riprova più tardi.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterBanner;
