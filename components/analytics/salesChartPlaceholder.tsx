// app/dashboard/analytics/_components/SalesChart.tsx
"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { TrendingUp } from "lucide-react";

interface SalesChartProps {
  chartData: Array<{ month: string; sales: number }>;
}

export default function SalesChart({ chartData }: SalesChartProps) {
  const formatValue = (value: number) => new Intl.NumberFormat("fa-IR").format(value / 1000000) + " م";

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          روند درآمد و فروش کارگاه
        </h3>
        <p className="text-[11px] text-slate-400 mb-4">تحلیل حجم مالی فاکتورهای صادر شده به تفکیک ماه‌های سال</p>
      </div>

      <div className="w-full h-64 dir-ltr">
        <ResponsiveContainer width="100%" h="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} tickFormatter={formatValue} />
            <Tooltip 
              formatter={(value: any) => [`${new Intl.NumberFormat("fa-IR").format(value)} تومان`, "فروش"]}
              labelStyle={{ fontSize: "11px", fontWeight: "bold", color: "#334155", textAlign: "right" }}
              contentStyle={{ borderRadius: "8px", borderColor: "#e2e8f0", direction: "rtl" }}
            />
            <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}