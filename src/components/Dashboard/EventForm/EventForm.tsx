import { Input } from "@/components/Form";
import { Button } from "@/components/Form/Button";
import { Textarea } from "@/components/Form/Textarea";
import { EventWithSpeaker } from "@/server/router/events";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ReactMarkdown from "react-markdown";

export interface EventFormProps {
  inputValues?: Partial<EventWithSpeaker>;
  disabled: boolean;
  handler: SubmitHandler<EventWithSpeaker>;
}

/* TODO: The upload mechanism should stay in a single component.
 * Note: This function should be local.
 */ 
export const fileToBase64 = (
  file: File
): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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
    mode: "all",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const values = watch();

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
          <Input type="text" {...register("title", { required: true })} />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <Input type="text" {...register("slug", { required: true })} />
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
              {...register("description", { required: true })}
            />
          )}
          {descrMode === "preview" && (
            <ReactMarkdown className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm">
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
              />
            )}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="location">Luogo</label>
          <Input type="text" {...register("location", { required: true })} />
        </div>

        <div className="col-span-6 align-middle sm:col-span-3">
          <label htmlFor="location">EventBrite ID</label>
          <Input
            type="text"
            {...register("eventbriteId", { required: true })}
          />
        </div>

        <div className="col-span-6 flex items-center sm:col-span-3">
          <div className="flex h-5 items-center">
            <input
              type="checkbox"
              className="rounded sm:border-gray-200 dark:sm:border-slate-700"
              {...register("unlisted")}
            />
          </div>

          <div className="ml-3 text-sm">
            <label htmlFor="unlisted" className="font-medium text-gray-700">
              Unlisted
            </label>
            <p className="text-gray-500">
              Questo evento non sarà visibile sulla piattaforma.
            </p>
          </div>
        </div>

        <div className="col-span-6 align-middle sm:col-span-3">
          <label htmlFor="imageUrl">Cover</label>
          <small className="block text-gray-500">
            Scegli la cover da usare per la card dell&apos;evento
          </small>
          <div className="mt-4 flex flex-col items-center justify-center">
            {!values.imageUrl && (
              <Controller
                name="imageUrl"
                rules={{ required: true }}
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <Button
                        onClick={(e) =>
                          inputRef.current?.click() && e.stopPropagation()
                        }
                      >
                        Cerca
                      </Button>
                      <Input
                        ref={inputRef}
                        type="file"
                        multiple={false}
                        accept="image/*"
                        className="pointer-events-none hidden rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm"
                        onChange={async (v) => {
                          const file = v.currentTarget.files?.item(0);
                          if (!file) {
                            field.onChange(v);
                          } else {
                            field.onChange(await fileToBase64(file));
                          }
                        }}
                      />
                    </>
                  );
                }}
              />
            )}
            {values.imageUrl && (
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
                  onClick={async () => setValue("imageUrl", null)}
                >
                  remove
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex w-full justify-end">
        <Button
          type="submit"
          disabled={disabled || Object.keys(errors).length > 0}
        >
          Salva
        </Button>
      </div>
    </form>
  );
};
