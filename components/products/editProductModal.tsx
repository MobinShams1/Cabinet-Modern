// app/dashboard/products/_components/EditProductModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Save, Loader2 } from "lucide-react";
import { updateProduct } from "@/actions/productsAction";
import { Product } from "./productListContainer";
import { toast } from "sonner"; 

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onProductUpdated: (updatedProduct: Product) => void;
}

export default function EditProductModal({ isOpen, onClose, product, onProductUpdated }: EditProductModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<"cabinet" | "material" | "accessory">("cabinet");
  const [type, setType] = useState("");
  const [pricePerMeter, setPricePerMeter] = useState<number>(0);
  const [stock, setStock] = useState<number>(10);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setType(product.type);
      setPricePerMeter(product.pricePerMeter);
      setDescription(product.description || "");
      setStock(product.stockStatus === "out-of-stock" ? 0 : product.stockStatus === "low-stock" ? 3 : 15);
    }
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setIsSubmitting(true);
    const result = await updateProduct({ rawId: product.rawId, name, category, type, pricePerMeter, stock, description });
    setIsSubmitting(false);

    if (result.success) {
      let stockStatus: "in-stock" | "low-stock" | "out-of-stock" = "in-stock";
      if (stock <= 0) stockStatus = "out-of-stock";
      else if (stock <= 5) stockStatus = "low-stock";

      onProductUpdated({
        ...product,
        name,
        category,
        type,
        pricePerMeter,
        stockStatus,
        description,
      });
      toast.success("تغییرات مشخصات کالا با موفقیت ذخیره شد.");
      onClose();
    } else {
      toast.error(`خطا در ویرایش کالا: ${result.error}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl w-full rounded-xl p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-right text-lg font-bold text-slate-800">ویرایش مشخصات فنی کالا</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">نام محصول / متریال</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">دسته‌بندی</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500 transition">
                <option value="cabinet">انواع کابینت</option>
                <option value="material">ورق‌ها و متریال خام</option>
                <option value="accessory">یراق‌آلات</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">سبک / نوع</label>
              <input type="text" required value={type} onChange={(e) => setType(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition" />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-600 block">قیمت مبنا (تومان)</label>
              <input type="number" required value={pricePerMeter || ""} onChange={(e) => setPricePerMeter(Number(e.target.value))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 block">موجودی عددی انبار</label>
            <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 block">توضیحات</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition resize-none" />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm transition">انصراف</button>
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}