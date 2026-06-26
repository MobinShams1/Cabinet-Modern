

import Chart from "@/components/dashboard/chart";
import KpiCards from "@/components/dashboard/kpiCards";
import OrderTable from "@/components/dashboard/orderTable";
export default async function DashboardPage() {
  return (
    <>
      <KpiCards />

      <Chart />

      <OrderTable />
    </>
  );
}
