"use client";

import { Users, UserCheck, Wallet } from "lucide-react";

interface StatsCardsProps {
  totalCustomers: number;
  activeCustomers: number;
  totalRevenue: number;
}

export default function StatsCards({ totalCustomers, activeCustomers, totalRevenue }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 pt-6">
      
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 block">کل مخاطبین / مشتریان</span>
          <span className="text-xl font-bold text-slate-800 block mt-1">
            {new Intl.NumberFormat("fa-IR").format(totalCustomers)} نفر
          </span>
        </div>
        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
          <Users className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 block">خریداران خشنود و فعال</span>
          <span className="text-xl font-bold text-slate-800 block mt-1">
            {new Intl.NumberFormat("fa-IR").format(activeCustomers)} خریدار
          </span>
        </div>
        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
          <UserCheck className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 block">مجموع ارزش فاکتورها</span>
          <span className="text-xl font-bold text-slate-800 block mt-1 text-indigo-600">
            {new Intl.NumberFormat("fa-IR").format(totalRevenue)} <span className="text-xs text-slate-400 font-normal">تومان</span>
          </span>
        </div>
        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
          <Wallet className="w-5 h-5" />
        </div>
      </div>

    </div>
  );
}