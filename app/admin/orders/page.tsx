// app/dashboard/orders/page.tsx
import { createClient } from "@/lib/supabase/server";
import OrderListContainer from "../../../components/orders/orderListContainer";
import { Order } from "@/types/order";

// این دیتای موقت (Sample Data) است؛ بعداً جایش را به فچ واقعی از Supabase می‌دهد

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const revalidate = 0;

export default async function OrdersPage() {
  await delay(2000);

  const supabase = await createClient();

  const { data: ordersData, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      status,
      total_price,
      created_at,
      cabinet_type,
      material_type,
      order_date,
      customers (
        full_name,
        phone,
        address
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("خطا در دریافت اطلاعات از Supabase:", error.message);
  }

  const formattedOrders = (ordersData || []).map((order: any) => ({
    id: `ORD-${order.id}`, 
    rawId: order.id,      
    customerName: order.customers?.full_name || "مشتری ناشناس",
    customerPhone: order.customers?.phone || "بدون شماره",
    customerAddress: order.customers?.address || "بدون آدرس",
    date: order.order_date || new Date(order.created_at).toLocaleDateString("fa-IR"),
    status: order.status,
    totalPrice: Number(order.total_price),
    cabinetType: order.cabinet_type,
    materialType: order.material_type,
    items: [] 
  }));

  
  return (
    <div className="h-full bg-slate-50">
      <OrderListContainer initialOrders={formattedOrders} />
    </div>
  );
}
