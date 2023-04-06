import Link from "next/link";
import { FC } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FiFolderPlus } from "react-icons/fi";

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
