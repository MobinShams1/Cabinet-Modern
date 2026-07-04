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
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">فعال</span>;
      case "debtor":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">بدهکار</span>;
      case "subdued":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">کم‌کار</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex-1">
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-600 text-sm font-semibold">
              <th className="p-4">نام مشتری</th>
              <th className="p-4">شماره تماس</th>
              <th className="p-4 hidden md:table-cell">تعداد سفارشات</th>
              <th className="p-4">مجموع خرید</th>
              <th className="p-4 hidden lg:table-cell">آخرین همکاری</th>
              <th className="p-4">وضعیت</th>
              <th className="p-4 text-center">جزئیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {customers.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => onSelectCustomer(customer)}
                className={`hover:bg-slate-50/80 transition cursor-pointer text-sm text-slate-700 ${
                  selectedCustomerId === customer.id ? "bg-indigo-50/40 font-medium" : ""
                }`}
              >
                <td className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-slate-900 font-medium">{customer.name}</span>
                </td>
                <td className="p-4 dir-ltr text-right text-slate-600">{customer.phone}</td>
                <td className="p-4 hidden md:table-cell text-slate-600">{customer.totalOrders} سفارش</td>
                <td className="p-4 text-slate-900 font-semibold">
                  {new Intl.NumberFormat("fa-IR").format(customer.totalSpent)} تومان
                </td>
                <td className="p-4 hidden lg:table-cell text-slate-500">{customer.lastOrderDate}</td>
                <td className="p-4">{getStatusBadge(customer.status)}</td>
                <td className="p-4 text-center">
                  <button className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition inline-flex items-center justify-center">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {customers.length === 0 && (
        <div className="p-12 text-center text-slate-400">
          <Package className="w-12 h-12 mx-auto text-slate-200 mb-3" />
          <p>هیچ مشتری منطبقی پیدا نشد</p>
        </div>
      )}
    </div>
  );
}