// app/dashboard/orders/_components/FormItemsSection.tsx
"use client";

import { Plus, Trash2 } from "lucide-react";

export interface FormItem {
  name: string;
  quantity: number;
  price: number;
}

interface FormItemsSectionProps {
  items: FormItem[];
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onItemChange: (index: number, field: keyof FormItem, value: string | number) => void;
}

export default function FormItemsSection({
  items,
  onAddItem,
  onRemoveItem,
  onItemChange,
}: FormItemsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-700 border-r-4 border-indigo-500 pr-2">آیتم‌های سفارش و قیمت</h4>
        <button
          type="button"
          onClick={onAddItem}
          className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          افزودن ردیف
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-end sm:items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative group">
            <div className="flex-1 w-full">
              <label className="block text-[10px] font-medium text-slate-500 mb-1 sm:hidden">شرح کالا / خدمات</label>
              <input
                type="text"
                required
                value={item.name}
                onChange={(e) => onItemChange(index, "name", e.target.value)}
                placeholder="مثال: کابینت زمینی، کمد دیواری، صفحه کورین..."
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
            <div className="w-full sm:w-24">
              <label className="block text-[10px] font-medium text-slate-500 mb-1 sm:hidden">تعداد / متراژ</label>
              <input
                type="number"
                min="1"
                required
                value={item.quantity}
                onChange={(e) => onItemChange(index, "quantity", parseInt(e.target.value) || 1)}
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-center outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
            <div className="w-full sm:w-44">
              <label className="block text-[10px] font-medium text-slate-500 mb-1 sm:hidden">قیمت واحد (تومان)</label>
              <input
                type="number"
                required
                value={item.price || ""}
                onChange={(e) => onItemChange(index, "price", parseInt(e.target.value) || 0)}
                placeholder="مبلغ به تومان"
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
            
            <button
              type="button"
              disabled={items.length === 1}
              onClick={() => onRemoveItem(index)}
              className="p-1.5 text-slate-400 hover:text-red-500 disabled:opacity-30 rounded-lg hover:bg-red-50 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}