import { Layout } from "@/components/Me/Layout";
import { NextPage } from "next";
import { FC } from "react";
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from "victory";
import { api } from "~/utils/api";
import { AttendeeReportResult } from "~/utils/event_brite_client";

interface AttendeeStatsProps {
  data: (AttendeeReportResult["data"][number])[];
}
const AttendeeStats: FC<AttendeeStatsProps> = ({ data }) => {
  return <>
    <VictoryChart width={400} height={200} theme={VictoryTheme.material} animate={true}>
      <VictoryLine
        style={{ data: { stroke: 'red' } }}
        data={data.map(({ date, totals }) => ({ x: new Date(date), y: totals.num_orders }))}
      />
      <VictoryLine
        style={{ data: { stroke: 'green' } }}
        data={data.map(({ date, totals }) => ({ x: new Date(date), y: totals.num_attendees }))}
      />
    </VictoryChart>
  </>;
}

const DashboardPage: NextPage = () => {
  const q = api.admin.eventbrite.reportAttendee.useQuery();

  return (
    <Layout>
      <>
        <h1>TODO</h1>
        <div className="">
          <AttendeeStats data={q.data ? Object.values(q.data) : []} />
        </div>
      </>
    </Layout>
  );
};

export default DashboardPage;
