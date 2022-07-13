import { useRouter } from "next/router";
import { ProposalForm } from "@/components/Dashboard/ProposalForm";
import { Layout } from "@/components/Dashboard/Layout";
import { trpc } from "@/utils/trpc";

const ProposalPage = () => {
  const router = useRouter();
  if (!router.query.id || typeof router.query.id !== "string") {
    return <div>Invalid event id</div>;
  }

  const q = trpc.useQuery(["proposals.getById", { id: router.query.id }]);

  if (q.isLoading) {
    return <p>Loading...</p>;
  }

  if (!q.data) {
    return <p>Not found</p>;
  }

  return (
    <Layout title="Modifica proposta">
      <ProposalForm
        eventId={q.data.id}
        defaultValues={{
          title: q.data.title,
          description: q.data.description,
        }}
      />
    </Layout>
  );
};

export default ProposalPage;
