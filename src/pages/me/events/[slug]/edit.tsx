import { EventForm } from "@/components/Me/EventForm/EventForm";
import { Layout } from "@/components/Me/Layout";
import { EventWithSpeaker } from "~/server/api/routers/events";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";

export const EditEventPage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const mutation = api.admin.events.update.useMutation();
  const query = api.events.getBySlug.useQuery(
    { slug },
    {
      gcTime: 0,
    },
  );

  if (query.isPending) {
    return <p>Loading...</p>;
  }

  if (!query.data) {
    return <p>Not found</p>;
  }

  const event = query.data;
  const onSubmit: SubmitHandler<{
    id: string;
    data: EventWithSpeaker;
  }> = async ({ id, data }) => {
    await mutation.mutateAsync({ id, data });
    router.push(`/me/events`);
  };

  return (
    <Layout title="Modifca Evento" name="Eventi">
      {!!event && (
        <EventForm
          disabled={mutation.isPending || mutation.isSuccess}
          handler={(data, e) => onSubmit({ id: event.id, data }, e)}
          inputValues={event}
        ></EventForm>
      )}
    </Layout>
  );
};

export default EditEventPage;
