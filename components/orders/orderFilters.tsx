// app/dashboard/orders/_components/OrderFilters.tsx
"use client";

import { Search, ChevronDown, Filter } from "lucide-react";

interface OrderFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export default function OrderFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}: OrderFiltersProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجو بر اساس شماره سفارش یا نام مشتری..."
          className="w-full border border-slate-300 rounded-lg pr-10 pl-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none border border-slate-300 rounded-lg px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white cursor-pointer"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="completed">تکمیل شده</option>
            <option value="in-progress">در حال انجام</option>
            <option value="pending">در انتظار</option>
            <option value="designing">در حال طراحی</option>
          </select>
          <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
          <Filter className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </div>
  );
}