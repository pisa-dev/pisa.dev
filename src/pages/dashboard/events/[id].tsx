import { useRouter } from "next/router";
import EventDetailsForm from "../../../components/dashboard/eventDetailsForm";
import Layout from "../../../components/dashboard/layout";
import { trpc } from "../../../utils/trpc";

const SpeakerEventDetailsPage = () => {
  const router = useRouter();
  if (!router.query.id || typeof router.query.id !== "string") {
    return <div>Invalid event id</div>;
  }

  const q = trpc.useQuery([
    "events.getById",
    {
      id: router.query.id,
    },
  ]);

  if (q.isLoading) {
    return <p>Loading...</p>;
  }

  if (!q.data) {
    return <p>Not found</p>;
  }

  return (
    <Layout title="Modifica evento">
      <EventDetailsForm
        eventId={q.data.id}
        defaultValues={{
          title: q.data.title,
          description: q.data.description,
        }}
      />
    </Layout>
  );
};

export default SpeakerEventDetailsPage;
