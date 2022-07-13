import Link from "next/link";
import { Layout } from "@/components/Dashboard/Layout";
import { FC } from "react";
import { ProposalsTable } from "../ProposalsTable";

export const DashboardPageContent: FC = () => {
  return (
    <Layout>
      <ProposalsTable />
    </Layout>
  );
};
