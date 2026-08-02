"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface MonthlySalesData {
  month: string;
  sales: number;
}

interface SalesChartProps {
  data: MonthlySalesData[];
}

export default function SalesChart({ data }: SalesChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-800 text-sm md:text-base">فروش ماهانه</h3>
        <div className="h-[220px] md:h-[260px] flex items-center justify-center text-gray-400 text-xs md:text-sm">
          داده‌ای برای فروش ماهانه ثبت نشده است.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3 md:space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800 text-sm md:text-base">فروش ماهانه</h3>
        <span className="text-[11px] md:text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          برحسب تومان
        </span>
      </div>

      <div className="h-[220px] md:h-[260px] w-full pt-2 md:pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickFormatter={(val) =>
                `${(val / 1_000_000).toLocaleString("fa-IR")}M`
              }
            />
            <Tooltip
              formatter={(value) => [
                `${Number(value || 0).toLocaleString("fa-IR")} تومان`,
                "فروش",
              ]}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                direction: "rtl",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}