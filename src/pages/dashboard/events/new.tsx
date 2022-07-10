import { EventDetailsForm } from "@/components/Dashboard/EventDetailsForm";
import { Layout } from "@/components/Dashboard/Layout";

const NewEventPage = () => {
  return (
    <Layout title="Nuovo evento">
      <EventDetailsForm />
    </Layout>
  );
};

export default NewEventPage;
