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
  const {user} = useUser();
  const targetPath = user?.role === "admin" ? "/admin/orders" : "/employee/orders";

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800 text-base">سفارشات اخیر</h3>
        <Link
          href={targetPath}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          مشاهده همه
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-gray-100 text-xs font-medium">
              <th className="pb-3">شماره سفارش</th>
              <th className="pb-3">مشتری</th>
              <th className="pb-3">مبلغ</th>
              <th className="pb-3">وضعیت</th>
              <th className="pb-3">تاریخ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="h-14 hover:bg-gray-50/50 transition-colors">
                <td className="font-semibold text-gray-800">
                  #{String(order.id).slice(0, 5)}
                </td>
                <td>{order.customers?.full_name || "مشتری عمومی"}</td>
                <td>{Number(order.total_price || 0).toLocaleString("fa-IR")} تومان</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {order.status === "completed" ? "تکمیل شده" : "در حال پردازش"}
                  </span>
                </td>
                <td className="text-gray-500">
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