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
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-800 border-r-4 border-indigo-500 pr-2.5">
          آیتم‌های سفارش و قیمت
        </h4>
        <button
          type="button"
          onClick={onAddItem}
          className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 active:scale-95 px-3 py-2 sm:py-1.5 rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          افزودن ردیف
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white p-3.5 sm:p-3 rounded-xl border border-slate-200 shadow-sm relative group flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            {/* شرح کالا */}
            <div className="flex-1">
              <label className="block text-[11px] font-semibold text-slate-500 mb-1 sm:hidden">
                شرح کالا / خدمات #{index + 1}
              </label>
              <input
                type="text"
                required
                value={item.name}
                onChange={(e) => onItemChange(index, "name", e.target.value)}
                placeholder="مثال: کابینت زمینی، کمد دیواری..."
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>

            {/* گرید ۲ ستونه برای تعداد و قیمت در موبایل */}
            <div className="grid grid-cols-12 gap-2 sm:flex sm:items-center sm:w-auto">
              <div className="col-span-4 sm:w-24">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1 sm:hidden">
                  تعداد / متر
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={item.quantity}
                  onChange={(e) => onItemChange(index, "quantity", parseInt(e.target.value) || 1)}
                  className="w-full border border-slate-300 rounded-lg px-2 py-2 text-sm text-center outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>

              <div className="col-span-6 sm:w-44">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1 sm:hidden">
                  قیمت واحد (تومان)
                </label>
                <input
                  type="number"
                  required
                  value={item.price || ""}
                  onChange={(e) => onItemChange(index, "price", parseInt(e.target.value) || 0)}
                  placeholder="مبلغ واحد"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>

              {/* دکمه حذف */}
              <div className="col-span-2 flex items-end justify-center sm:items-center pb-1 sm:pb-0">
                <button
                  type="button"
                  disabled={items.length === 1}
                  onClick={() => onRemoveItem(index)}
                  className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-20 rounded-lg hover:bg-red-50 active:bg-red-100 transition"
                  title="حذف ردیف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}