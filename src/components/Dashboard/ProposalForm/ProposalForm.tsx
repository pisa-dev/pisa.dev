import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import ReactMarkdown from "react-markdown";

type FormValues = {
  title: string;
  description: string;
  duration: string;
};

export interface ProposalFormProps {
  eventId?: string;
  defaultValues?: FormValues;
}

export const ProposalForm: FC<ProposalFormProps> = ({
  eventId,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });
  const router = useRouter();

  const mutation = trpc.useMutation(["proposals.upsert"]);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!eventId) {
      // create new event
      const e = await mutation.mutateAsync({ data });
      router.push(`/dashboard/proposals/${e.id}`);
    } else {
      // update existing event
      await mutation.mutateAsync({ id: eventId, data });
    }
  };

  const values = watch();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 divide-y divide-gray-200 dark:divide-slate-800"
    >
      <div className="space-y-8 divide-y divide-gray-200 dark:divide-slate-700 sm:space-y-5">
        <div>
          <div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-slate-400">
              Le informazioni inserite saranno visibilmente solamente a te e
              agli organizzatori della community.
            </p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-slate-700 sm:pt-5">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-slate-300 sm:mt-px sm:pt-2"
              >
                Titolo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300 dark:bg-slate-800 dark:border-slate-600"
                    disabled={mutation.isLoading}
                    {...register("title", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-slate-700 sm:pt-5">
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 dark:text-slate-300 sm:mt-px sm:pt-2"
              >
                Durata dell{"'"}evento
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <select
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300 dark:bg-slate-800 dark:border-slate-600"
                    disabled={mutation.isLoading}
                    {...register("duration", { required: true })}
                  >
                    <option value="Lightning">Lightning (10 minuti)</option>
                    <option value="Corto">Corto (15-25 minuti)</option>
                    <option value="Medio">Medio (30-45 minuti)</option>
                    <option value="Lungo">Lungo (60+ minuti)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-slate-700 sm:pt-5">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-slate-300 sm:mt-px sm:pt-2"
              >
                Descrizione (markdown abilitato)
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  rows={6}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-600"
                  disabled={mutation.isLoading}
                  {...register("description", { required: true })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-30"
            disabled={mutation.isLoading}
          >
            Salva
          </button>
        </div>
      </div>

      <p>Preview</p>
      <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg divide-y divide-gray-200 dark:divide-slate-700">
        <div className="px-4 py-5 sm:px-6 flex gap-4 items-center">
          <h1 className="text-2xl">{values.title}</h1>
          <span className="text-base font-normal">({values.duration})</span>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <ReactMarkdown>{values.description}</ReactMarkdown>
        </div>
      </div>
    </form>
  );
};
