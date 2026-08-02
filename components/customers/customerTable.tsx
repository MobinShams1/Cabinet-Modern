"use client";

import { Customer } from "./customerListContainer";
import { ChevronLeft, User, Package } from "lucide-react";

interface CustomerTableProps {
  customers: Customer[];
  selectedCustomerId?: string;
  onSelectCustomer: (customer: Customer) => void;
}

export default function CustomerTable({ customers, selectedCustomerId, onSelectCustomer }: CustomerTableProps) {
  
  const getStatusBadge = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">فعال</span>;
      case "debtor":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">بدهکار</span>;
      case "subdued":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">کم‌کار</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden flex-1 flex flex-col dir-rtl">
      <div className="overflow-x-auto min-w-full">
        <table className="w-full text-right border-collapse min-w-[600px] sm:min-w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-600 text-xs sm:text-sm font-semibold">
              <th className="p-3.5 sm:p-4">نام مشتری</th>
              <th className="p-3.5 sm:p-4">شماره تماس</th>
              <th className="p-3.5 sm:p-4 hidden md:table-cell">تعداد سفارشات</th>
              <th className="p-3.5 sm:p-4">مجموع خرید</th>
              <th className="p-3.5 sm:p-4 hidden lg:table-cell">آخرین همکاری</th>
              <th className="p-3.5 sm:p-4">وضعیت</th>
              <th className="p-3.5 sm:p-4 text-center">جزئیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => onSelectCustomer(customer)}
                className={`hover:bg-slate-50/90 active:bg-slate-100 transition cursor-pointer text-xs sm:text-sm text-slate-700 ${
                  selectedCustomerId === customer.id ? "bg-indigo-50/50 font-medium" : ""
                }`}
              >
                <td className="p-3.5 sm:p-4 flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-slate-900 font-semibold truncate max-w-[120px] sm:max-w-none">{customer.name}</span>
                </td>
                <td className="p-3.5 sm:p-4 dir-ltr text-right text-slate-600 font-mono">{customer.phone}</td>
                <td className="p-3.5 sm:p-4 hidden md:table-cell text-slate-600">{customer.totalOrders} سفارش</td>
                <td className="p-3.5 sm:p-4 text-slate-900 font-bold whitespace-nowrap">
                  {new Intl.NumberFormat("fa-IR").format(customer.totalSpent)} <span className="text-[10px] text-slate-500 font-normal">تومان</span>
                </td>
                <td className="p-3.5 sm:p-4 hidden lg:table-cell text-slate-500">{customer.lastOrderDate}</td>
                <td className="p-3.5 sm:p-4 whitespace-nowrap">{getStatusBadge(customer.status)}</td>
                <td className="p-3.5 sm:p-4 text-center">
                  <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition inline-flex items-center justify-center">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {customers.length === 0 && (
        <div className="p-12 text-center text-slate-400 my-auto">
          <Package className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="text-sm font-medium">هیچ مشتری منطبقی پیدا نشد</p>
        </div>
      )}
    </div>
  );
}