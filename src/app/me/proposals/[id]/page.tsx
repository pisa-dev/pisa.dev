"use client";

import { useRouter, useParams } from "next/navigation";
import { ProposalForm } from "@/components/Me/ProposalForm";
import { Layout } from "@/components/Me/Layout";
import { api } from "@/utils/api";

const ProposalPage = () => {
  const params = useParams();
  const id = params?.id as string;

  if (!id || typeof id !== "string") {
    return <div>Invalid event id</div>;
  }

  const q = api.proposals.getById.useQuery({ id });

  if (q.isPending) {
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
