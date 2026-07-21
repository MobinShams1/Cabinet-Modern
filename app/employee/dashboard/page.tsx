

import Chart from "@/components/dashboard/chart";
import KpiCards from "@/components/dashboard/kpiCards";
import OrderTable from "@/components/dashboard/orderTable";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export default async function DashboardPage() {

  await delay(2000);

  return (
    <>
      <KpiCards />

      <Chart />

      <OrderTable />
    </>
  );
}
