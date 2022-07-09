import EventDetailsForm from "../../../components/dashboard/eventDetailsForm";
import Layout from "../../../components/dashboard/layout";

const NewEventPage = () => {
  return (
    <Layout title="Nuovo evento">
      <EventDetailsForm />
    </Layout>
  );
};

export default NewEventPage;
