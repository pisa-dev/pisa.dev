import { EventForm } from "@/components/Dashboard/EventForm/EventForm";
import { Layout } from "@/components/Dashboard/Layout";
import { EventWithSpeaker } from "@/server/router/events";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";

export const EditEventPage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const mutation = trpc.useMutation(["admin.events.update"]);
  const query = trpc.useQuery(["events.get-by-slug", { slug }], {
    cacheTime: 0,
  });

  if (query.isLoading) {
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
    router.push(`/dashboard/events`);
  };

  return (
    <Layout title="Modifca Evento" name="Eventi">
      {!!event && (
        <EventForm
          disabled={mutation.isLoading || mutation.isSuccess}
          handler={(data, e) => onSubmit({ id: event.id, data }, e)}
          inputValues={event}
        ></EventForm>
      )}
    </Layout>
  );
};

export default EditEventPage;
