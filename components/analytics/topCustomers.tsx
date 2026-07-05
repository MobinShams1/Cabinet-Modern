"use client";

import { Award } from "lucide-react";

interface TopCustomersProps {
  customers: Array<{
    id: string;
    name: string;
    totalOrders: number;
    totalSpent: number;
  }>;
}

export default function TopCustomers({ customers }: TopCustomersProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-500" />
          مشتریان برتر کارگاه
        </h3>
        
        <div className="space-y-3">
          {customers.map((customer, index) => (
            <div key={customer.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/70 border border-slate-100/60">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                  {index + 1}
                </span>
                <span className="text-xs font-semibold text-slate-700">{customer.name}</span>
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-slate-800 block">
                  {new Intl.NumberFormat("fa-IR").format(customer.totalSpent)} <span className="text-[9px] font-normal text-slate-400">تومان</span>
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">{customer.totalOrders} فاکتور ثبت‌شده</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}