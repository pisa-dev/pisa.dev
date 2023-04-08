import { Layout } from "@/components/Me/Layout";
import { NextPage } from "next";
import { api } from "~/utils/api";
import Link from "next/link";
import { FiFolderPlus } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
import { FC } from "react";

export const ProposalsTableEmpty: FC = () => {
  return (
    <div className="text-center">
      <FiFolderPlus className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-300" />
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-slate-200">
        Nessuna proposta (ancora!)
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
        Vuoi fare un talk? Niente paura, siamo qui per aiutarti.
      </p>
      <div className="mt-6">
        <Link
          href="/me/proposals/new"
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <BsPlusLg className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
          Nuova proposta
        </Link>
      </div>
    </div>
  );
};
export const ProposalsPage: NextPage = () => {
  const q = api.proposals.listMine.useQuery();

  if (!q.data) {
    return <p>Loading...</p>;
  }

  const content = !q.data.length
    ? <ProposalsTableEmpty />
    : (
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 py-8 sm:px-0">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold">Le tue proposte</h1>
                <p className="mt-2 text-sm text-gray-700 dark:text-slate-400">
                  La lista delle proposte che hai già inviato.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link href="/me/proposals/new">
                  <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                    Nuova proposta
                  </button>
                </Link>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300 dark:divide-slate-900">
                      <thead className="bg-gray-50 dark:bg-slate-900 dark:text-slate-400">
                        <tr>
                          <th
                            scope="col"
                            className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide sm:pl-6"
                          >
                            Titolo
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide"
                          >
                            Durata
                          </th>
                          <th
                            scope="col"
                            className="relative py-3 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Modifica</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white text-gray-500 dark:divide-slate-900 dark:bg-slate-800 dark:text-slate-300">
                        {q.data.map((proposal) => (
                          <tr key={proposal.id}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              {proposal.title}
                            </td>
                            <td className="text-ellipsis whitespace-nowrap px-3 py-4 text-sm">
                              {proposal.duration}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <Link
                                href={`/me/proposals/${proposal.id}`}
                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                              >
                                Modifica
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <Layout title="Lista proposte" name="Proposte">
      {content}
    </Layout>
  );
};

export default ProposalsPage;
