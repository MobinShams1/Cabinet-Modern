// app/dashboard/analytics/page.tsx
import AnalyticsContainer from "@/components/analytics/analyticsContainer";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const { data: ordersData, error: ordersError } = await supabase
    .from("orders")
    .select("total_price, status, created_at, cost_price");
  const { data: customersData, error: customersError } = await supabase
    .from("customers")
    .select("id, full_name, total_spent, total_orders, debt");

  if (ordersError || customersError) {
    console.error(
      "خطا در فچ دیتای تحلیل مالی:",
      ordersError?.message || customersError?.message,
    );
  }

  const rawOrders = ordersData || [];
  const rawCustomers = customersData || [];

  const totalSales = rawOrders.reduce(
    (sum, o) => sum + (Number(o.total_price) || 0),
    0,
  );
  const totalCosts = rawOrders.reduce(
    (sum, o) => sum + (Number(o.cost_price) || 0),
    0,
  );
  const netProfit = totalSales - totalCosts; 

  const receivables = rawCustomers.reduce(
    (sum, c) => sum + (Number(c.debt) || 0),
    0,
  );
  const activeProjects = rawOrders.filter(
    (o) => o.status === "in-progress" || o.status === "installing",
  ).length;

  const topCustomers = [...rawCustomers]
    .sort((a, b) => (b.total_spent || 0) - (a.total_spent || 0))
    .slice(0, 5)
    .map((c) => ({
      id: c.id.toString(),
      name: c.full_name,
      totalOrders: c.total_orders || 0,
      totalSpent: Number(c.total_spent) || 0,
    }));

  const monthlySales: Record<string, number> = {
    فروردین: 0,
    اردیبهشت: 0,
    خرداد: 0,
    تیر: 0,
    مرداد: 0,
    شهریور: 0,
    مهر: 0,
    آبان: 0,
    آذر: 0,
    دی: 0,
    بهمن: 0,
    اسفند: 0,
  };

  rawOrders.forEach((order) => {
    const totalPrice = Number(order.total_price) || 0;
    if (!order.created_at) return;

    const jalaaliDate = new Date(order.created_at).toLocaleDateString(
      "fa-IR-u-nu-latn",
    );

    const monthNumber = parseInt(jalaaliDate.split("/")[1], 10);

    const monthNames = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    const monthName = monthNames[monthNumber - 1];

    if (monthName && monthlySales[monthName] !== undefined) {
      monthlySales[monthName] += totalPrice;
    }
  });

  const chartData = Object.keys(monthlySales).map((month) => ({
    month,
    sales: monthlySales[month],
  }));

  const upcomingPayments = rawCustomers
    .filter((c) => (c.debt || 0) > 0)
    .slice(0, 4)
    .map((c, idx) => ({
      id: `PAY-${c.id}`,
      customerName: c.full_name,
      amount: Number(c.debt) * 0.4,
      dueDate: `1405/04/${10 + idx * 5}`,
      status: idx === 0 ? ("critical" as const) : ("pending" as const),
    }));

  const analyticsData = {
    kpis: { totalSales, netProfit, receivables, activeProjects },
    topCustomers,
    upcomingPayments,
    chartData,
  };

  return (
    <div className="h-full bg-slate-50/50 flex flex-col">
      <AnalyticsContainer initialData={analyticsData} />
    </div>
  );
}
