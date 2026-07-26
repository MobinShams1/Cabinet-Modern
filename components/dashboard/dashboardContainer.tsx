import { createClient } from "@/lib/supabase/server";
import KpiCards from "./kpiCards";
import OrderStatusProgress from "./productionStatus";
import RecentOrdersTable from "./orderTable";
import SalesChart from "./salesChart";

export default async function DashboardContainer() {
  const supabase = await createClient();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    { count: todaysOrdersCount },
    { data: completedOrders },
    { count: activeOrdersCount },
    { data: recentOrders },
    { data: allOrdersForChart },
    { data: allOrdersForStatus },
  ] = await Promise.all([
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .gte("created_at", today.toISOString()),

    supabase.from("orders").select("total_price").eq("status", "completed"),

    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "designing"),

    supabase
      .from("orders")
      .select("id, customers (full_name), total_price, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),

    supabase
      .from("orders")
      .select("created_at, total_price")
      .eq("status", "completed")
      .order("created_at", { ascending: true }),

    supabase.from("orders").select("status"),
  ]);

  const totalRevenue =
    completedOrders?.reduce(
      (acc, curr) => acc + (Number(curr.total_price) || 0),
      0,
    ) || 0;

  const monthlySalesMap: { [key: string]: number } = {};
  allOrdersForChart?.forEach((order) => {
    const monthName = new Date(order.created_at).toLocaleDateString("fa-IR", {
      month: "long",
    });
    monthlySalesMap[monthName] =
      (monthlySalesMap[monthName] || 0) + Number(order.total_price || 0);
  });

  const chartData = Object.keys(monthlySalesMap).map((month) => ({
    month,
    sales: monthlySalesMap[month],
  }));

  const totalOrders = allOrdersForStatus?.length || 0;
  const statusCounts = {
    completed: 0,
    designing: 0,
    pending: 0,
    cancelled: 0,
  };

  allOrdersForStatus?.forEach((o) => {
    if (o.status in statusCounts) {
      statusCounts[o.status as keyof typeof statusCounts]++;
    }
  });

  const orderStatusesData =
    totalOrders > 0
      ? [
          {
            name: "تکمیل شده",
            percentage: Math.round(
              (statusCounts.completed / totalOrders) * 100,
            ),
          },
          {
            name: "در حال طراحی",
            percentage: Math.round(
              (statusCounts.designing / totalOrders) * 100,
            ),
          },
          {
            name: "در انتظار بررسی",
            percentage: Math.round((statusCounts.pending / totalOrders) * 100),
          },
          {
            name: "لغو شده",
            percentage: Math.round(
              (statusCounts.cancelled / totalOrders) * 100,
            ),
          },
        ]
      : [];

  return (
    <div className="p-6 space-y-6 dir-rtl bg-slate-50/50 min-h-screen">
      <KpiCards
        todaysOrders={todaysOrdersCount || 0}
        activeCustomers={totalOrders}
        totalRevenue={totalRevenue}
        activeProjects={activeOrdersCount || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={chartData} />
        </div>
        <div>
          <OrderStatusProgress statuses={orderStatusesData || []} />
        </div>
      </div>

      <RecentOrdersTable orders={recentOrders || []} />
    </div>
  );
}
