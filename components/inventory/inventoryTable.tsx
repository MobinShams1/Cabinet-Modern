// app/dashboard/inventory/_components/InventoryTable.tsx
"use client";

import { InventoryItem } from "./inventoryListContainer";
import { ChevronLeft, Inbox } from "lucide-react";

interface InventoryTableProps {
  items: InventoryItem[];
  selectedItemId?: string;
  onSelectItem: (item: InventoryItem) => void;
}

export default function InventoryTable({ items, selectedItemId, onSelectItem }: InventoryTableProps) {
  
  const getStockStatus = (current: number, min: number) => {
    if (current === 0) return { label: "ناموجود", textClass: "text-rose-600", barClass: "bg-rose-500", width: "w-0" };
    if (current <= min) return { label: "بحرانی", textClass: "text-amber-600", barClass: "bg-amber-500", width: "w-1/3" };
    return { label: "ایمن", textClass: "text-emerald-600", barClass: "bg-emerald-500", width: "w-full" };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-600 font-semibold">
              <th className="p-4">کد کالا</th>
              <th className="p-4">عنوان متریال / کالا</th>
              <th className="p-4">دسته‌بندی</th>
              <th className="p-4">محل انبار</th>
              <th className="p-4">وضعیت حجم موجودی</th>
              <th className="p-4">تعداد/مقدار</th>
              <th className="p-4 text-center">جزئیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {items.map((item) => {
              const status = getStockStatus(item.currentStock, item.minStock);
              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className={`hover:bg-slate-50/80 transition cursor-pointer text-slate-700 ${
                    selectedItemId === item.id ? "bg-indigo-50/40 font-medium" : ""
                  }`}
                >
                  <td className="p-4 font-mono text-xs text-slate-400">{item.id}</td>
                  <td className="p-4 font-medium text-slate-900">{item.name}</td>
                  <td className="p-4 text-xs text-slate-500">{item.category}</td>
                  <td className="p-4 text-xs text-slate-600">{item.location}</td>
                  <td className="p-4 w-48">
                    {/* نوار وضعیت پیشرفت گرافیکی */}
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${status.barClass} ${status.width} rounded-full`} />
                      </div>
                      <span className={`text-[11px] font-bold ${status.textClass}`}>{status.label}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-800">
                    {item.currentStock} <span className="text-xs font-normal text-slate-400">{item.unit}</span>
                  </td>
                  <td className="p-4 text-center">
                    <ChevronLeft className="w-4 h-4 text-slate-300 mx-auto" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {items.length === 0 && (
        <div className="p-12 text-center text-slate-400 my-auto">
          <Inbox className="w-12 h-12 mx-auto text-slate-200 mb-3" />
          <p className="text-xs">کالایی با فیلتر انتخاب شده یافت نشد</p>
        </div>
      )}
    </div>
  );
}