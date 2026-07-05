// app/dashboard/inventory/_components/InventoryStats.tsx
"use client";

import { Package, AlertCircle, CheckCircle2 } from "lucide-react";

interface InventoryStatsProps {
  totalItems: number;
  outOfStock: number;
  lowStock: number;
}

export default function InventoryStats({ totalItems, outOfStock, lowStock }: InventoryStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 pt-6">
      
      {/* کارت کل تنوع متریال */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 block">تنوع اقلام کاردکس انبار</span>
          <span className="text-xl font-bold text-slate-800 block mt-1">
            {new Intl.NumberFormat("fa-IR").format(totalItems)} ردیف کالا
          </span>
        </div>
        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
          <Package className="w-5 h-5" />
        </div>
      </div>

      {/* کارت اقلام رو به اتمام (نقطه سفارش فاکتور) */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 block">اقلام در وضعیت بحرانی (کم)</span>
          <span className={`text-xl font-bold block mt-1 ${lowStock > 0 ? "text-amber-600" : "text-slate-800"}`}>
            {lowStock > 0 ? `${new Intl.NumberFormat("fa-IR").format(lowStock)} ردیف کالا` : "وضعیت پایدار"}
          </span>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${lowStock > 0 ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-400"}`}>
          <AlertCircle className="w-5 h-5" />
        </div>
      </div>

      {/* کارت کارهای کاملاً ناموجود */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 block">کسری انبار (موجودی صفر)</span>
          <span className={`text-xl font-bold block mt-1 ${outOfStock > 0 ? "text-rose-600 animate-pulse" : "text-emerald-600"}`}>
            {outOfStock > 0 ? `${new Intl.NumberFormat("fa-IR").format(outOfStock)} ردیف ورق/یراق` : "بدون کسری انبار"}
          </span>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${outOfStock > 0 ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}>
          {outOfStock > 0 ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
        </div>
      </div>

    </div>
  );
}