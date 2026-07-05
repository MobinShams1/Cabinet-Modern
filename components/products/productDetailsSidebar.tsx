"use client";

import { useState } from "react";
import { Product } from "./productListContainer";
import {
  X,
  DollarSign,
  Layers,
  Tag,
  FileText,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import { deleteProduct } from "@/actions/productsAction";
import { toast } from "sonner";
interface ProductDetailSidebarProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onEditClick: () => void;
  onProductDeleted: (id: string) => void;
}

export default function ProductDetailSidebar({
  product,
  isOpen,
  onClose,
  onEditClick,
  onProductDeleted,
}: ProductDetailSidebarProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    if (!confirm(`آیا از حذف محصول "${product.name}" مطمئن هستید؟`)) return;

    setIsDeleting(true);
    const result = await deleteProduct(product.rawId);
    setIsDeleting(false);

    if (result.success) {
      onProductDeleted(product.id);
      onClose();
      toast.success(`محصول "${product.name}" با موفقیت از سیستم حذف شد.`);
    } else {
      toast.error(`خطا در حذف محصول: ${result.error}`);
    }
  };

  return (
    <div className="w-full lg:w-[360px] bg-white border border-slate-100 rounded-xl shadow-sm flex flex-col h-full overflow-hidden transition-all duration-300">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white z-10">
        <h3 className="text-sm font-bold text-slate-800">مشخصات فنی کالا</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-50 rounded-lg transition text-slate-400 hover:text-slate-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-5 flex-1 overflow-y-auto">
        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100/60 text-center">
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-2">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-800 text-sm">{product.name}</h4>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            کد محصول: #{product.id}
          </span>
        </div>

        <div className="space-y-2">
          <h5 className="text-[11px] font-bold text-slate-400 tracking-wider">
            جزییات قیمت‌گذاری جاری
          </h5>
          <div className="flex items-center justify-between text-xs p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
            <span className="text-slate-500">قیمت مبنا (واحد/متر)</span>
            <span className="font-bold text-slate-800">
              {new Intl.NumberFormat("fa-IR").format(product.pricePerMeter)}{" "}
              تومان
            </span>
          </div>
          <div className="flex items-center justify-between text-xs p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
            <span className="text-slate-500">سبک / تیپ متریال</span>
            <span className="font-semibold text-slate-700">{product.type}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="text-[11px] font-bold text-slate-400 tracking-wider">
            توضیحات و نکات اجرایی
          </h5>
          <div className="p-3 bg-slate-50/50 rounded-lg border border-slate-100/70 text-xs text-slate-600 leading-relaxed flex items-start gap-2">
            <p>
              {product.description ||
                "هیچ توضیحات فنی برای این مورد ثبت نشده است."}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 bg-white grid grid-cols-4 gap-2">
        <button
          onClick={onEditClick}
          className="col-span-3 flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition shadow-sm"
        >
          <Edit className="w-3.5 h-3.5" />
          ویرایش قیمت و مشخصات
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="col-span-1 flex items-center justify-center p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-medium transition border border-rose-100 disabled:opacity-50"
          title="حذف کالا"
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
