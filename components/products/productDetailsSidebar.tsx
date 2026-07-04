"use client";

import { Product } from "./productListContainer";
import { X, DollarSign, Layers, Tag, FileText, Edit } from "lucide-react";

interface ProductDetailSidebarProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailSidebar({ product, isOpen, onClose }: ProductDetailSidebarProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="w-full lg:w-[360px] bg-white border border-slate-100 rounded-xl shadow-sm flex flex-col h-full overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-left-4">
      
      <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <h3 className="text-sm font-bold text-slate-800">مشخصات فنی کالا</h3>
        <button onClick={onClose} className="p-1 hover:bg-slate-50 rounded-lg transition text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-5 flex-1 overflow-y-auto">
        
        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100/60 text-center">
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-2">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-800 text-sm">{product.name}</h4>
          <span className="text-[10px] text-slate-400 block mt-0.5">کد محصول: #{product.id}</span>
        </div>

        <div className="space-y-2">
          <h5 className="text-[11px] font-bold text-slate-400 tracking-wider">جزییات قیمت‌گذاری جاری</h5>
          
          <div className="flex items-center justify-between text-xs p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" />
              <span>قیمت مبنا (واحد/متر)</span>
            </div>
            <span className="font-bold text-slate-800">
              {new Intl.NumberFormat("fa-IR").format(product.pricePerMeter)} تومان
            </span>
          </div>

          <div className="flex items-center justify-between text-xs p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span>سبک / تیپ متریال</span>
            </div>
            <span className="font-semibold text-slate-700">{product.type}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="text-[11px] font-bold text-slate-400 tracking-wider">توضیحات و نکات اجرایی</h5>
          <div className="p-3 bg-slate-50/50 rounded-lg border border-slate-100/70 text-xs text-slate-600 leading-relaxed flex items-start gap-2">
            <FileText className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <p>{product.description || "هیچ توضیحات فنی برای این مورد ثبت نشده است."}</p>
          </div>
        </div>
      </div>

      {/* کلید ویرایش در فوتر */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <button 
          className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition shadow-sm"
        >
          <Edit className="w-3.5 h-3.5" />
          ویرایش قیمت و مشخصات کالا
        </button>
      </div>
    </div>
  );
}