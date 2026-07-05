"use client";

import { CalendarClock, AlertCircle } from "lucide-react";

interface UpcomingPaymentsProps {
  payments: Array<{
    id: string;
    customerName: string;
    amount: number;
    dueDate: string;
    status: "pending" | "critical";
  }>;
}

export default function UpcomingPayments({ payments }: UpcomingPaymentsProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
      <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-1.5">
        <CalendarClock className="w-4 h-4 text-indigo-500" />
        زمان‌بندی وصول سررسیدها و اقساط فاکتورها
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold">
              <th className="p-3">کارفرما / مشتری</th>
              <th className="p-3">مبلغ قسط</th>
              <th className="p-3">تاریخ سررسید</th>
              <th className="p-3 text-center">وضعیت فوریت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {payments.map((pay) => (
              <tr key={pay.id} className="text-slate-700 hover:bg-slate-50/50 transition">
                <td className="p-3 font-medium text-slate-800">{pay.customerName}</td>
                <td className="p-3 font-bold text-slate-900">
                  {new Intl.NumberFormat("fa-IR").format(pay.amount)} تومان
                </td>
                <td className="p-3 font-medium text-slate-600">{pay.dueDate}</td>
                <td className="p-3 text-center">
                  {pay.status === "critical" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-50 text-rose-700 rounded-md font-bold text-[10px] border border-rose-100">
                      <AlertCircle className="w-3 h-3" />
                      سررسید گذشته / فوری
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 bg-slate-50 text-slate-600 rounded-md text-[10px] border border-slate-100">
                      در جریان
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}