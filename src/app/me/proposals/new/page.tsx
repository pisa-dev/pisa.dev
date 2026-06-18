"use client";

import { ProposalForm } from "@/components/Me/ProposalForm";
import { Layout } from "@/components/Me/Layout";

export default function NewProposalPage() {
  return (
    <Layout title="Nuova proposta">
      <ProposalForm />
    </Layout>
  );
}
