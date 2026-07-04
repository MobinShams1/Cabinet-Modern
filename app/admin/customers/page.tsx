import CustomerListContainer from "@/components/customers/customerListContainer";
import StatsCards from "@/components/customers/statsCards";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function CustomersPage() {
  const supabase = await createClient();

  const { data: customersData, error } = await supabase
    .from("customers")
    .select(`
      id,
      full_name,
      phone,
      address,
      created_at,
      orders (
        total_price,
        status
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("خطا در دریافت لیست مشتریان:", error.message);
  }

  const formattedCustomers = (customersData || []).map((customer: any) => {
    const orders = customer.orders || [];
    const totalOrders = orders.length;
    
    const totalSpent = orders
      .filter((o: any) => o.status !== "cancelled")
      .reduce((sum: number, o: any) => sum + Number(o.total_price), 0);

    let status: "active" | "subdued" | "debtor" = "active";
    if (totalOrders === 0) status = "subdued";
    if (orders.some((o: any) => o.status === "pending" && totalSpent > 50000000)) status = "debtor";

    return {
      id: `CUST-${customer.id}`,
      rawId: customer.id,
      name: customer.full_name,
      phone: customer.phone || "بدون شماره",
      address: customer.address || "بدون آدرس ثبت شده",
      totalOrders,
      totalSpent,
      status,
      lastOrderDate: customer.created_at 
        ? new Date(customer.created_at).toLocaleDateString("fa-IR") 
        : "بدون سابقه",
    };
  });

  const totalCustomersCount = formattedCustomers.length;
  const activeCustomersCount = formattedCustomers.filter(c => c.status === "active").length;
  const totalSystemRevenue = formattedCustomers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div className="h-full bg-slate-50/50 flex flex-col">
      <StatsCards 
        totalCustomers={totalCustomersCount}
        activeCustomers={activeCustomersCount}
        totalRevenue={totalSystemRevenue}
      />

      <div className="flex-1">
        <CustomerListContainer initialCustomers={formattedCustomers} />
      </div>
    </div>
  );
}