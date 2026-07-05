"use client";

import { useState } from "react";
import { HelpCircle, X, CheckCircle2 } from "lucide-react";

export default function InventoryGuide() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-amber-50/60 border border-amber-200/70 p-4 rounded-xl text-amber-900 text-xs leading-relaxed flex items-start gap-3 mb-6 animate-in fade-in duration-200">
      <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      
      <div className="flex-1 space-y-2">
        <h4 className="font-bold text-amber-900 text-sm">راهنمای تفکیک و ثبت اقلام سیستم</h4>
        <p className="text-amber-800/90 font-medium">
          کاربر گرامی، برای حفظ دقیق موجودی و فاکتورها، لطفاً قبل از ثبت هرگونه کالا به دسته بندی آن دقت فرمایید:
        </p>
        
        <ul className="space-y-1.5 list-disc list-inside pr-1 text-amber-800">
          <li>
            <strong className="text-amber-950">📦 متریال خام و قطعات فیزیکی (ثبت در این صفحه):</strong> ورق‌های ام‌دی‌اف خام، لولا، جک، ریل، قرنیز و هر قطعه‌ای که به صورت فیزیکی در انبار موجود است را باید از طریق این صفحه (مدیریت انبار) ورود یا خروج بزنید.
          </li>
          <li>
            <strong className="text-indigo-950">📐 سبک‌ها و پروژه‌های آماده (ثبت در صفحه محصولات):</strong> اگر قصد دارید یک تیپ یا سبکِ کار تمام‌شده (مانند "کابینت نئوکلاسیک متری" یا "کابینت مدرن ملامینه") را برای استفاده در فرم فاکتور مشتریان تعریف کنید، باید به <span className="underline font-bold">صفحه محصولات</span> مراجعه فرمایید.
          </li>
        </ul>
      </div>

      <button 
        onClick={() => setIsVisible(false)}
        className="p-1 hover:bg-amber-100 rounded-lg text-amber-500 hover:text-amber-700 transition"
        title="بستن راهنما"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}