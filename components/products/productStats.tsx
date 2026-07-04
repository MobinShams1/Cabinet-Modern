"use client";

import { Layers, AlertTriangle, Tag } from "lucide-react";

interface ProductStatsProps {
  totalItems: number;
  outOfStock: number;
  avgPrice: number;
}

export default function ProductStats({ totalItems, outOfStock, avgPrice }: ProductStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 pt-6">
      
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 block">تنوع کالا و متریال</span>
          <span className="text-xl font-bold text-slate-800 block mt-1">
            {new Intl.NumberFormat("fa-IR").format(totalItems)} ردیف کالا
          </span>
        </div>
        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
          <Layers className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 block">اقلام ناموجود / اتمام ورق</span>
          <span className="text-xl font-bold text-slate-800 block mt-1">
            {outOfStock > 0 ? `${new Intl.NumberFormat("fa-IR").format(outOfStock)} مورد` : "انبار فول شارژ"}
          </span>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${outOfStock > 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 block">میانگین قیمت هر متر کابینت</span>
          <span className="text-xl font-bold text-indigo-600 block mt-1">
            {new Intl.NumberFormat("fa-IR").format(Math.round(avgPrice))}{" "}
            <span className="text-[10px] text-slate-400 font-normal">تومان</span>
          </span>
        </div>
        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
          <Tag className="w-5 h-5" />
        </div>
      </div>

    </div>
  );
}