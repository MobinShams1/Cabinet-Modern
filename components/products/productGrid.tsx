"use client";

import { Product } from "./productListContainer";
import { Package } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  selectedProductId?: string;
  onSelectProduct: (product: Product) => void;
}

export default function ProductGrid({ products, selectedProductId, onSelectProduct }: ProductGridProps) {
  
  const getStockBadge = (status: Product["stockStatus"]) => {
    switch (status) {
      case "in-stock":
        return <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">موجود</span>;
      case "low-stock":
        return <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-semibold border border-amber-100">رو به اتمام</span>;
      case "out-of-stock":
        return <span className="text-[11px] px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-semibold border border-rose-100">ناموجود</span>;
    }
  };

  const getCategoryLabel = (cat: Product["category"]) => {
    if (cat === "cabinet") return "سفارش کابینت";
    if (cat === "material") return "متریال خام";
    return "یراق آلات";
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4 dir-rtl">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className={`bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md active:bg-slate-50 transition cursor-pointer flex flex-col justify-between relative group ${
              selectedProductId === product.id ? "ring-2 ring-indigo-600 border-transparent bg-indigo-50/10" : ""
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                  {getCategoryLabel(product.category)}
                </span>
                {getStockBadge(product.stockStatus)}
              </div>

              <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition">
                {product.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                نوع سبک/جنس: {product.type} - {product.description}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">مبنای محاسبه فاکتور:</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                {new Intl.NumberFormat("fa-IR").format(product.pricePerMeter)}{" "}
                <span className="text-[10px] text-slate-400 font-normal">تومان / متر</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center text-slate-400 shadow-sm dir-rtl">
          <Package className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="text-sm font-medium">هیچ کالا یا متریالی در این دسته‌بندی یافت نشد</p>
        </div>
      )}
    </>
  );
}