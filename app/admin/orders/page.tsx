import { createClient } from "@/lib/supabase/server";
import OrderListContainer from "@/components/orders/orderListContainer";

export const revalidate = 0;

export default async function OrdersPage() {
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
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("خطا در دریافت اطلاعات از Supabase:", error.message);
  }

  const formattedOrders = (ordersData || []).map((order: any) => {
    // فرمت دهی امن تاریخ برای نمایش در RTL
    let formattedDate = order.order_date;
    if (!formattedDate && order.created_at) {
      formattedDate = new Date(order.created_at).toLocaleDateString("fa-IR");
    }

    return {
      id: `ORD-${order.id}`,
      rawId: order.id,
      customerName: order.customers?.full_name || "مشتری ناشناس",
      customerPhone: order.customers?.phone || "بدون شماره",
      customerAddress: order.customers?.address || "بدون آدرس",
      date: formattedDate || "ثبت نشده",
      status: order.status,
      totalPrice: Number(order.total_price || 0),
      cabinetType: order.cabinet_type,
      materialType: order.material_type,
      items: [],
    };
  });

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-slate-50">
      <OrderListContainer initialOrders={formattedOrders} />
    </div>
  );
}