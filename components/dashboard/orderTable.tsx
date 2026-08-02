"use client";

import Link from "next/link";
import { useUser } from "@/context/userContext";

interface Order {
  id: string;
  created_at: string;
  total_price: number;
  status: string;
  customers?: {
    full_name: string;
  } | null;
}

interface RecentOrdersTableProps {
  orders: Order[];
  userRole?: string;
}

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const { user } = useUser();
  const targetPath = user?.role === "admin" ? "/admin/orders" : "/employee/orders";

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800 text-sm md:text-base">سفارشات اخیر</h3>
        <Link
          href={targetPath}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          مشاهده همه
        </Link>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <table className="w-full text-right border-collapse min-w-[500px]">
          <thead>
            <tr className="text-gray-400 border-b border-gray-100 text-xs font-medium">
              <th className="pb-3 px-2">شماره سفارش</th>
              <th className="pb-3 px-2">مشتری</th>
              <th className="pb-3 px-2">مبلغ</th>
              <th className="pb-3 px-2">وضعیت</th>
              <th className="pb-3 px-2">تاریخ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs md:text-sm text-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="h-12 md:h-14 hover:bg-gray-50/50 transition-colors">
                <td className="font-semibold text-gray-800 px-2 whitespace-nowrap">
                  #{String(order.id).slice(0, 5)}
                </td>
                <td className="px-2 whitespace-nowrap">
                  {order.customers?.full_name || "مشتری عمومی"}
                </td>
                <td className="px-2 whitespace-nowrap">
                  {Number(order.total_price || 0).toLocaleString("fa-IR")} تومان
                </td>
                <td className="px-2 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] md:text-xs font-medium ${
                      order.status === "completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {order.status === "completed" ? "تکمیل شده" : "در حال پردازش"}
                  </span>
                </td>
                <td className="text-gray-500 px-2 whitespace-nowrap">
                  {new Date(order.created_at).toLocaleDateString("fa-IR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}