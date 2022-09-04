import { Alert } from "@/components/Alert/Alert";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { trpc } from "@/utils/trpc";
import { Tab } from "@headlessui/react";
import Head from "next/head";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

type FormValues = {
  title: string;
  description: string;
  salaryRange: string;
  remote: "no" | "partial" | "full";
  companyName: string;
  offerURL: string;
};

const JobOffersNewPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();
  const mutation = trpc.useMutation(["jobs.insert"]);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await mutation.mutateAsync({ data });
  };

  const values = watch();
  const disabled = mutation.isLoading || mutation.isSuccess;

  return (
    <>
      <Head>
        <title>Nuova offerta di lavoro - pisa.dev</title>
      </Head>

      <Header />

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h1 className="pt-10 pb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-slate-200">
          Pubblica un{"'"}offerta di lavoro
        </h1>
        <p className="max-w-2xl text-sm text-gray-500 dark:text-slate-400">
          Le informazioni inserite verranno salvate e inoltrate al nostro{" "}
          <Link target="_blank" href="https://t.me/pisajobs">
            <a className="underline">canale Telegram dedicato</a>
          </Link>
          .
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 divide-y divide-gray-200 dark:divide-slate-800"
        >
          <div className="space-y-8 divide-y divide-gray-200 dark:divide-slate-700 sm:space-y-5">
            <div>
              <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 dark:sm:border-slate-700">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-slate-300 sm:mt-px sm:pt-2"
                  >
                    Titolo
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="flex max-w-lg flex-col gap-4 rounded-md shadow-sm">
                      <input
                        type="text"
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm"
                        disabled={disabled}
                        placeholder="Backend software engineer"
                        {...register("title", { required: true })}
                      />

                      {errors.title?.type === "required" && (
                        <span className="text-sm text-red-700">
                          Questo campo è obbligatorio.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 dark:sm:border-slate-700">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700 dark:text-slate-300 sm:mt-px sm:pt-2"
                  >
                    Nome azienda
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="flex max-w-lg flex-col gap-4 rounded-md shadow-sm">
                      <input
                        type="text"
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm"
                        disabled={disabled}
                        placeholder="ACME inc."
                        {...register("companyName", { required: true })}
                      />
                    </div>

                    {errors.companyName?.type === "required" && (
                      <span className="text-sm text-red-700">
                        Questo campo è obbligatorio.
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 dark:sm:border-slate-700">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-slate-300 sm:mt-px sm:pt-2"
                  >
                    Range RAL (non sono accettati annunci che non definiscono
                    chiaramente la retribuzione)
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="flex max-w-lg flex-col gap-4 rounded-md shadow-sm">
                      <input
                        type="text"
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm"
                        disabled={disabled}
                        placeholder="40-60K euro"
                        {...register("salaryRange", { required: true })}
                      />

                      {errors.salaryRange?.type === "required" && (
                        <span className="text-sm text-red-700">
                          Questo campo è obbligatorio.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 dark:sm:border-slate-700">
                  <label
                    htmlFor="offerURL"
                    className="block text-sm font-medium text-gray-700 dark:text-slate-300 sm:mt-px sm:pt-2"
                  >
                    Link per candidarsi (o in alternativa indirizzo email)
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="flex max-w-lg flex-col gap-4 rounded-md shadow-sm">
                      <input
                        type="text"
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm"
                        disabled={disabled}
                        placeholder="https://lever.co/acme/1234abc"
                        {...register("offerURL", { required: true })}
                      />

                      {errors.offerURL?.type === "required" && (
                        <span className="text-sm text-red-700">
                          Questo campo è obbligatorio.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 dark:sm:border-slate-700">
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 dark:text-slate-300 sm:mt-px sm:pt-2"
                  >
                    Lavoro da remoto
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="flex max-w-lg flex-col gap-4 rounded-md shadow-sm">
                      <select
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm"
                        disabled={disabled}
                        {...register("remote", { required: true })}
                      >
                        <option value="no">No</option>
                        <option value="partial">Parziale/ibrido</option>
                        <option value="full">Sì, full time</option>
                      </select>

                      {errors.remote?.type === "required" && (
                        <span className="text-sm text-red-700">
                          Questo campo è obbligatorio.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 dark:sm:border-slate-700">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-slate-300 sm:mt-px sm:pt-2"
                  >
                    Descrizione (markdown abilitato)
                  </label>
                  <div className="mt-1 flex flex-col gap-4 sm:col-span-2 sm:mt-0">
                    <div>
                      <Tab.Group>
                        {({ selectedIndex }) => (
                          <>
                            <Tab.List className="flex items-center">
                              <Tab
                                className={({ selected }) =>
                                  classNames(
                                    selected
                                      ? "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:border-indigo-500 dark:bg-slate-600 dark:text-gray-200 dark:ring-indigo-500 dark:hover:bg-slate-500"
                                      : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-gray-300",
                                    "rounded-md border border-transparent px-3 py-1.5 text-sm font-medium"
                                  )
                                }
                              >
                                Editor
                              </Tab>
                              <Tab
                                className={({ selected }) =>
                                  classNames(
                                    selected
                                      ? "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:border-indigo-500 dark:bg-slate-600 dark:text-gray-200 dark:ring-indigo-500 dark:hover:bg-slate-500"
                                      : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-gray-300",
                                    "ml-2 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium"
                                  )
                                }
                              >
                                Anteprima
                              </Tab>
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                              <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                                <label
                                  htmlFor="description"
                                  className="sr-only"
                                >
                                  Descrizione
                                </label>
                                <div>
                                  <textarea
                                    rows={6}
                                    className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm"
                                    disabled={disabled}
                                    placeholder="Requisiti, informazioni sull'azienda, etc."
                                    {...register("description", {
                                      required: true,
                                    })}
                                  />
                                </div>
                              </Tab.Panel>
                              <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                                <div className="border-b dark:border-slate-700">
                                  <div className="prose prose-sm prose-slate mx-px mt-px px-3 pt-2 pb-12 text-sm leading-5 dark:prose-invert">
                                    {values.description ? (
                                      <ReactMarkdown>
                                        {values.description}
                                      </ReactMarkdown>
                                    ) : (
                                      <p>L{"'"}anteprima comparirà qui.</p>
                                    )}
                                  </div>
                                </div>
                              </Tab.Panel>
                            </Tab.Panels>
                          </>
                        )}
                      </Tab.Group>
                    </div>

                    {errors.description?.type === "required" && (
                      <span className="text-sm text-red-700">
                        Questo campo è obbligatorio.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-30 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                disabled={disabled}
              >
                Salva
              </button>
            </div>
          </div>

          {mutation.isSuccess && mutation.data ? (
            <Alert
              title="Offerta inserita con successo!"
              description="È stato pubblicato un post su Telegram con i dati che hai inserito. In bocca al lupo nella tua ricerca!"
              actions={[
                {
                  title: "Apri Telegram",
                  url: `https://t.me/${mutation.data.telegramMessageChatID}/${mutation.data.telegramMessageID}`,
                },
              ]}
            />
          ) : null}
        </form>
      </div>

      <Footer />
    </>
  );
};

export default JobOffersNewPage;
