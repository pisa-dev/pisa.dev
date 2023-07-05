import { useRouter } from "next/router";
import { ProposalForm } from "@/components/Me/ProposalForm";
import { Layout } from "@/components/Me/Layout";
import { api } from "@/utils/api";

const ProposalPage = () => {
  const router = useRouter();
  if (!router.query.id || typeof router.query.id !== "string") {
    return <div>Invalid event id</div>;
  }

  const q = api.proposals.getById.useQuery({ id: router.query.id });

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
          duration: q.data.duration,
        }}
      />
    </Layout>
  );
};

export default ProposalPage;
