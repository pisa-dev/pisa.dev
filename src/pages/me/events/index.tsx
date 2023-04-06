import { EventsTable } from "@/components/Dashboard/EventsTable";
import { Layout } from "@/components/Dashboard/Layout";

export const EventsPage = () => {
  return (
    <Layout title="Lista eventi" name="Eventi">
      <EventsTable></EventsTable>
    </Layout>
  );
};

export default EventsPage;
