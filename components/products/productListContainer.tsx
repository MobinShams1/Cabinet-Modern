"use client";

import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import ProductGrid from "./productGrid";
import ProductDetailSidebar from "./productDetailsSidebar";

export interface Product {
  id: string;
  rawId: number;
  name: string;
  category: "cabinet" | "material" | "accessory";
  type: string; 
  pricePerMeter: number; 
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
  description: string;
}

interface ProductListContainerProps {
  initialProducts: Product[];
}

export default function ProductListContainer({ initialProducts }: ProductListContainerProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full bg-slate-50/50 flex flex-col p-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">کاتالوگ محصولات و متریال</h1>
          <p className="text-xs text-slate-500 mt-1">مدیریت قیمت فاکتور، انواع کابینت، ورق‌های MDF و تجهیزات جانبی</p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition shadow-sm shadow-indigo-100"
        >
          <Plus className="w-4 h-4" />
          افزودن محصول جدید
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="جستجوی نام محصول، نوع چوب، متریال..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pr-9 pl-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition text-slate-800"
          />
        </div>
        <div className="flex items-center gap-2 min-w-[180px]">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition text-slate-700"
          >
            <option value="all">همه دسته‌بندی‌ها</option>
            <option value="cabinet">انواع کابینت (پروژه)</option>
            <option value="material">ورق‌ها و متریال خام</option>
            <option value="accessory">یراق‌آلات و تجهیزات</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch flex-1">
        
        <div className="flex-1 min-w-0">
          <ProductGrid 
            products={filteredProducts} 
            selectedProductId={selectedProduct?.id}
            onSelectProduct={(product) => {
              setSelectedProduct(product);
              setIsSidebarOpen(true);
            }}
          />
        </div>

        <ProductDetailSidebar 
          product={selectedProduct}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </div>
  );
}