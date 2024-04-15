import { Input } from "@/components/Form";
import { Button } from "@/components/Form/Button";
import { Textarea } from "@/components/Form/Textarea";
import { EventWithSpeaker } from "~/server/api/routers/events";
import dayjs from "dayjs";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { FallbackEventImage } from "~/components/FallbackEventImage";

export interface EventFormProps {
  inputValues?: Partial<EventWithSpeaker>;
  disabled: boolean;
  handler: SubmitHandler<EventWithSpeaker>;
}

const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/*
 * `datetime-local` input type just handles the DateTime ISO format.
 *
 * TODO: Remove this for a custom and more flexible widget
 */
const dateFormatter = (d: Date) => dayjs(d).format("YYYY-MM-DDTHH:mm");

export const EventForm: FC<EventFormProps> = ({
  inputValues,
  handler,
  disabled = false,
}) => {
  const [descrMode, setDescrMode] = useState<"preview" | "edit">("edit");
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<EventWithSpeaker>({
    defaultValues: inputValues,
    mode: 'onSubmit',
  });
  const values = watch();

  useEffect(() => {
    if (!values.eventbriteId) {
      setValue('unlisted', true);
    }
  }, [setValue, values.eventbriteId]);

  return (
    <form onSubmit={handleSubmit(handler)}>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <Input type="text" {...register("title", { required: true })} error={errors.title} />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <Input type="text" {...register("slug", { required: true, disabled: !!inputValues?.slug })} error={errors.slug} />
          {inputValues?.slug && (
            <small className="mt-2 text-red-400">
              Attenzione! Modificare lo slug invaliderà tutti i link condivisi!
            </small>
          )}
        </div>

        <div className="col-span-6 sm:col-span-6">
          <label
            htmlFor="abstract"
            className="block text-sm font-medium text-gray-700"
          >
            Abstract
          </label>
          <Textarea
            cols={3}
            type="text"
            multiple={true}
            className="resize-none"
            error={errors.abstract}
            {...register("abstract", { required: true })}
          />
        </div>

        <div className="col-span-6 sm:col-span-6">
          <div className="flex items-center justify-between pb-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descrizione
            </label>
            <div className="ml-4 flex items-center">
              <small className="mr-1 text-sm font-medium text-gray-700">
                Preview
              </small>
              <input
                className="rounded sm:border-gray-200 dark:sm:border-slate-700"
                type="checkbox"
                checked={descrMode === "preview"}
                onChange={(v) =>
                  setDescrMode(v.target.checked ? "preview" : "edit")
                }
              />
            </div>
          </div>
          {descrMode === "edit" && (
            <Textarea
              cols={15}
              type="text"
              className="h-80"
              error={errors.description}
              {...register("description", { required: true })}
            />
          )}
          {descrMode === "preview" && (
            <ReactMarkdown className="prose block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm min-w-full">
              {values.description || ""}
            </ReactMarkdown>
          )}
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="date">Data e Ora</label>
          {/* FIXME: This should absolutely improved */}
          <Controller
            name="date"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                type="datetime-local"
                onChange={(v) =>
                  field.onChange(new Date(v.currentTarget.value))
                }
                value={field.value ? dateFormatter(field.value) : undefined}
                error={errors.date}
              />
            )}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="location">Luogo</label>
          <Input
            type="text"
            error={errors.location}
            {...register("location", { required: true })}
          />
        </div>

        <div className="col-span-6 align-middle sm:col-span-3">
          <label htmlFor="eventbriteId">EventBrite ID</label>
          <Input
            type="text"
            error={errors.eventbriteId}
            {...register("eventbriteId")}
          />
        </div>

        <div className="col-span-6 sm:col-span-3 flex flex-col justify-end">
          <div className="flex items-center">
            <div className="flex h-5 items-center">
              <input
                type="checkbox"
                className="rounded sm:border-gray-200 dark:sm:border-slate-700"
                {...register("unlisted", { disabled: !values.eventbriteId })}
              />
            </div>

            <div className="ml-3 text-sm">
              <label htmlFor="unlisted">
                Nascondi
              </label>
            </div>
          </div>
          <div style={{ visibility: !values.eventbriteId ? 'visible' : 'hidden' }}>
            <small className="mt-2 text-red-400 block">
              Attenzione! Non è possible rendere pubblico l&apos;evento senza fornire un ID EventBrite
            </small>
          </div>
        </div>

        <div className="col-span-6 align-middle sm:col-span-3">
          <label htmlFor="imageUrl">Cover</label>
          <small className="block text-gray-500">
            Scegli la cover da usare per la card dell&apos;evento
          </small>
          <div className="mt-4 flex flex-col items-center justify-center">
            <Input
              type="URL"
              className="mb-2"
              {...register("imageUrl")}
            />
            <div className="mt-8">
              {values.imageUrl && isValidURL(values.imageUrl) ? (
                <>
                  <Image
                    objectFit="contain"
                    src={values.imageUrl}
                    alt=""
                    height={256}
                    width={512}
                  />
                  <Button
                    className="block w-full bg-red-400 hover:bg-red-600"
                    onClick={() => setValue("imageUrl", null, { shouldValidate: true })}
                  >
                    remove
                  </Button>
                </>
              )
                : <div style={{ width: 512, height: 256, }}>
                  <FallbackEventImage />
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex w-full justify-end">
        <Button type="submit">
          Salva
        </Button>
      </div>
    </form>
  );
};
