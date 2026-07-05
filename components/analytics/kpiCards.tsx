// app/dashboard/analytics/_components/KpiCards.tsx
"use client";

import { DollarSign, TrendingUp, Users, Clock } from "lucide-react";

interface KpiCardsProps {
  kpis: {
    totalSales: number;
    netProfit: number;
    receivables: number;
    activeProjects: number;
  };
}

export default function KpiCards({ kpis }: KpiCardsProps) {
  const formatPrice = (num: number) => new Intl.NumberFormat("fa-IR").format(num);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-400 block">کل فروش صادر شده</span>
          <span className="text-lg font-bold text-slate-800 block">{formatPrice(kpis.totalSales)} <span className="text-[10px] font-normal text-slate-400">تومان</span></span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><DollarSign className="w-5 h-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-400 block">سود خالص تقریبی</span>
          <span className="text-lg font-bold text-emerald-600 block">{formatPrice(kpis.netProfit)} <span className="text-[10px] font-normal text-slate-400">تومان</span></span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600"><TrendingUp className="w-5 h-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-400 block">مانده مطالبات (بدهکاران)</span>
          <span className="text-lg font-bold text-rose-600 block">{formatPrice(kpis.receivables)} <span className="text-[10px] font-normal text-slate-400">تومان</span></span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600"><Clock className="w-5 h-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-400 block">پروژه‌های در حال ساخت/نصب</span>
          <span className="text-lg font-bold text-slate-800 block">{kpis.activeProjects} پروژه مبل</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600"><Users className="w-5 h-5" /></div>
      </div>

    </div>
  );
}