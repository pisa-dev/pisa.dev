import { Layout } from "@/components/Dashboard/Layout";
import { ProposalsTable } from "@/components/Dashboard/ProposalsTable";
import { NextPage } from "next";

export const ProposalsPage: NextPage = () => {
  return (
    <Layout title="Lista proposte" name="Proposte">
      <ProposalsTable />
    </Layout>
  );
};

export default ProposalsPage;
