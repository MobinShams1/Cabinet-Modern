"use client";

import { useState } from "react";
import { Calendar, DollarSign, TrendingUp, Users, Clock } from "lucide-react";
import KpiCards from "./kpiCards";
import SalesChart from "./salesChartPlaceholder";
import TopCustomers from "./topCustomers";
import UpcomingPayments from "./upComingPayment";


export interface ChartItem {
  month: string;
  sales: number;
}
export interface AnalyticsData {
  kpis: {
    totalSales: number;
    netProfit: number;
    receivables: number;
    activeProjects: number;
  };
  topCustomers: Array<{
    id: string;
    name: string;
    totalOrders: number;
    totalSpent: number;
  }>;
  upcomingPayments: Array<{
    id: string;
    customerName: string;
    amount: number;
    dueDate: string;
    status: "pending" | "critical";
  }>;
  chartData: ChartItem[];
}

interface AnalyticsContainerProps {
  initialData: AnalyticsData;
}

export default function AnalyticsContainer({ initialData }: AnalyticsContainerProps) {
  const [timeRange, setTimeRange] = useState("30-days");
  const [data, setData] = useState<AnalyticsData>(initialData);

  return (
    <div className="h-full bg-slate-50/50 flex flex-col p-6 space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">گزارشات و تحلیل‌های مالی</h1>
          <p className="text-xs text-slate-500 mt-1">بررسی میزان سودآوری، جریان نقدینگی، مطالبات کارفرمایان و راندمان کارگاه</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-slate-400 mr-2" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent text-xs text-slate-600 outline-none pl-6 pr-2 font-medium cursor-pointer"
          >
            <option value="30-days">۳۰ روز گذشته</option>
            <option value="3-months">۳ ماهه اخیر</option>
            <option value="current-year">سال مالی جاری</option>
          </select>
        </div>
      </div>

      <KpiCards kpis={data.kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart chartData={data.chartData} />
        </div>
        
        <div className="lg:col-span-1">
          <TopCustomers customers={data.topCustomers} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <UpcomingPayments payments={data.upcomingPayments} />
      </div>

    </div>
  );
}