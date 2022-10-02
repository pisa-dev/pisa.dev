import { EventForm } from "@/components/Dashboard/EventForm/EventForm";
import { Layout } from "@/components/Dashboard/Layout";
import { EventWithSpeaker } from "@/server/router/events";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";

export const NewEventPage = () => {
  const mutation = trpc.useMutation(["admin.events.create"]);
  const router = useRouter();

  const onSubmit: SubmitHandler<EventWithSpeaker> = async (data) => {
    await mutation.mutateAsync({ data });
    await router.push("/dashboard/events");
  };

  return (
    <Layout title="Nuovo Evento" name="Eventi">
      <EventForm
        disabled={mutation.isLoading}
        handler={(d, e) => onSubmit(d, e)}
      ></EventForm>
    </Layout>
  );
};

export default NewEventPage;
