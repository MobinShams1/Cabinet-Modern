"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { createNewProduct } from "@/actions/productsAction";
import { toast } from "sonner"; 

interface ProductFormProps {
  onClose: () => void;
  onProductAdded: (product: any) => void;
}

export default function ProductForm({ onClose, onProductAdded }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<"cabinet" | "material" | "accessory">("cabinet");
  const [type, setType] = useState("");
  const [pricePerMeter, setPricePerMeter] = useState<number>(0);
  const [stock, setStock] = useState<number>(10);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !type || pricePerMeter <= 0) {
      toast.error("لطفا تمامی فیلد ها را پر کنید !")
      return;
    }

    setIsSubmitting(true);
    const result = await createNewProduct({ name, category, type, pricePerMeter, description, stock });
    setIsSubmitting(false);

    if (result.success) {
      let stockStatus: "in-stock" | "low-stock" | "out-of-stock" = "in-stock";
      if (stock <= 0) stockStatus = "out-of-stock";
      else if (stock <= 5) stockStatus = "low-stock";

      onProductAdded({
        id: result.sku,
        rawId: result.productId,
        name,
        category,
        type,
        pricePerMeter,
        stockStatus,
        description,
      });
      toast.success(`محصول "${name}" با موفقیت به کاتالوگ اضافه شد.`);
      onClose();
    } else {
      toast.error(`خطا در ثبت محصول: ${result.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600 block">نام محصول / متریال *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: ام‌دی‌اف سفید های‌گلاس پاکچوب"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600 block">دسته‌بندی مبنا *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500 transition"
          >
            <option value="cabinet">انواع کابینت (پروژه‌ای)</option>
            <option value="material">ورق‌ها و متریال خام</option>
            <option value="accessory">یراق‌آلات و تجهیزات</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600 block">سبک / نوع متریال *</label>
          <input
            type="text"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="مثال: مدرن، کلاسیک، ممبران"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-semibold text-slate-600 block">قیمت مبنا (تومان / واحد یا متر) *</label>
          <input
            type="number"
            required
            value={pricePerMeter || ""}
            onChange={(e) => setPricePerMeter(Number(e.target.value))}
            placeholder="قیمت کل به عدد"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-600 block">موجودی عددی انبار (ورق/عدد)</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-600 block">توضیحات و نکات فنی اجرایی</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="ابعاد ورق، ضخامت، روکش یا کدهای رنگی خاص..."
          rows={3}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 transition resize-none"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm transition"
        >
          انصراف
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          افزودن به کاتالوگ
        </button>
      </div>
    </form>
  );
}