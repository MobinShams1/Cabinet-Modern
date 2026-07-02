// app/dashboard/orders/page.tsx
import OrderListContainer from "../../../components/orders/orderListContainer";
import { Order } from "@/types/order";

// این دیتای موقت (Sample Data) است؛ بعداً جایش را به فچ واقعی از Supabase می‌دهد


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export default async function OrdersPage() {
  await delay(2000);

  return (
    <div className="h-full bg-slate-50">
      
      <OrderListContainer initialOrders={sampleOrders} />
    </div>
  );
}