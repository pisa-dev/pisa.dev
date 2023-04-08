import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "@/utils/api";
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

  const mutation = api.proposals.upsert.useMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!eventId) {
      // create new event
      const e = await mutation.mutateAsync({ data });
      router.push(`/me/proposals/${e.id}`);
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

          <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 dark:sm:border-slate-700">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-slate-300 sm:mt-px sm:pt-2"
              >
                Titolo
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="flex max-w-lg rounded-md shadow-sm">
                  <input
                    type="text"
                    className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm"
                    disabled={mutation.isLoading}
                    {...register("title", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 dark:sm:border-slate-700">
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 dark:text-slate-300 sm:mt-px sm:pt-2"
              >
                Durata dell{"'"}evento
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="flex max-w-lg rounded-md shadow-sm">
                  <select
                    className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm"
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

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 dark:sm:border-slate-700">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-slate-300 sm:mt-px sm:pt-2"
              >
                Descrizione (markdown abilitato)
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <textarea
                  rows={6}
                  className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm"
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
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-30 dark:bg-indigo-700 dark:hover:bg-indigo-600"
            disabled={mutation.isLoading}
          >
            Salva
          </button>
        </div>
      </div>

      <p>Preview</p>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow dark:divide-slate-700 dark:bg-slate-800">
        <div className="flex items-center gap-4 px-4 py-5 sm:px-6">
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
