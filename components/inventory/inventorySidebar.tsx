"use client";

import { useState } from "react";
import { InventoryItem } from "./inventoryListContainer";
import { X, RefreshCw, Layers, MapPin, AlertCircle ,Loader2} from "lucide-react";
import { toast } from "sonner";
import { updateProductStock } from "@/actions/inventoryAction";
interface InventorySidebarProps {
  item: InventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onStockUpdated: (rawId: number, newStock: number) => void;
}

export default function InventorySidebar({ item, isOpen, onClose, onStockUpdated }: InventorySidebarProps) {
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [adjustmentValue, setAdjustmentValue] = useState<number>(0);

  if (!isOpen || !item) return null;

  const handleApplyAdjustment = async (type: "add" | "sub") => {
    if (adjustmentValue <= 0) {
      toast.error("لطفاً مقدار معتبری وارد کنید.");
      return;
    }

    let newStock = item.currentStock;
    if (type === "add") {
      newStock += adjustmentValue;
    } else {
      if (adjustmentValue > item.currentStock) {
        toast.error("مقدار خروجی نمی‌تواند بیشتر از موجودی انبار باشد.");
        return;
      }
      newStock -= adjustmentValue;
    }

    setIsSubmitting(true); 
    
    const result = await updateProductStock(item.rawId, newStock);
    
    setIsSubmitting(false); 
    if (result.success) {
      onStockUpdated(item.rawId, newStock);
      toast.success(`موجودی کالا در دیتابیس بروز شد. موجودی جدید: ${newStock} ${item.unit}`);
      setAdjustmentValue(0);
    } else {
      toast.error(`خطا در ذخیره‌سازی دیتابیس: ${result.error}`);
    }
  };
  return (
    <div className="w-full lg:w-[360px] bg-white border border-slate-100 rounded-xl shadow-sm flex flex-col h-full overflow-hidden transition-all duration-300">
      
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
        <h3 className="text-sm font-bold text-slate-800">کارت انبارداری کالا</h3>
        <button onClick={onClose} className="p-1 hover:bg-slate-50 rounded-lg transition text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-5 flex-1 overflow-y-auto">
        
        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100/60 text-center">
          <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-2">
            <Layers className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-slate-800 text-xs">{item.name}</h4>
          <span className="text-[10px] text-slate-400 block mt-0.5">محل استقرار: {item.location}</span>
        </div>

        <div className="p-4 bg-slate-50/40 rounded-xl border border-dashed border-slate-200 space-y-3">
          <h5 className="text-[11px] font-bold text-slate-500">حواله اصلاحی سریع انبار</h5>
          <div className="flex gap-2">
            <input
              type="number"
              value={adjustmentValue || ""}
              onChange={(e) => setAdjustmentValue(Math.abs(Number(e.target.value)))}
              placeholder={`مقدار به (${item.unit})`}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-indigo-500 transition text-center"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleApplyAdjustment("add")}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-medium transition shadow-sm shadow-emerald-100"
            >
              + ثبت ورود (افزایش)
            </button>
            <button
              onClick={() => handleApplyAdjustment("sub")}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-medium transition shadow-sm shadow-rose-100"
            >
              - ثبت خروج (مصرف)
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="text-[11px] font-bold text-slate-400 tracking-wider">حد آستانه و لجستیک</h5>
          <div className="flex items-center justify-between text-xs p-2.5 bg-white border border-slate-100 rounded-lg shadow-sm">
            <span className="text-slate-500">حداقل کالا برای اخطار خرید</span>
            <span className="font-bold text-amber-600">{item.minStock} {item.unit}</span>
          </div>
          <div className="flex items-center justify-between text-xs p-2.5 bg-white border border-slate-100 rounded-lg shadow-sm">
            <span className="text-slate-500">آخرین بروزرسانی کاردکس</span>
            <span className="font-semibold text-slate-700">{item.lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
}