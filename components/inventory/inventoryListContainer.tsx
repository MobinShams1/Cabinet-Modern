// app/dashboard/inventory/_components/InventoryListContainer.tsx
"use client";

import { useState } from "react";
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Package } from "lucide-react";
import InventoryTable from "./inventoryTable";
import InventorySidebar from "./inventorySidebar";
import InventoryGuide from "./inventoryGuide";

export interface InventoryItem {
  id: string;
  rawId: number;
  name: string;
  category: "ورق خام" | "یراق آلات" | "تجهیزات جانبی";
  currentStock: number; 
  minStock: number; 
  unit: string;
  location: string; 
  lastUpdated: string;
}

interface InventoryListContainerProps {
  initialItems: InventoryItem[];
}

export default function InventoryListContainer({ initialItems }: InventoryListContainerProps) {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (stockFilter === "out") return matchesSearch && item.currentStock === 0;
    if (stockFilter === "low") return matchesSearch && item.currentStock > 0 && item.currentStock <= item.minStock;
    return matchesSearch;
  });

  const handleUpdateStock = (rawId: number, newStock: number) => {
    setItems(prev => prev.map(item => item.rawId === rawId ? { ...item, currentStock: newStock, lastUpdated: new Date().toLocaleDateString("fa-IR") } : item));
    if (selectedItem?.rawId === rawId) {
      setSelectedItem(prev => prev ? { ...prev, currentStock: newStock, lastUpdated: new Date().toLocaleDateString("fa-IR") } : null);
    }
  };

  return (
    <div className="h-full bg-slate-50/50 flex flex-col p-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">کنترل و مدیریت انبار</h1>
          <p className="text-xs text-slate-500 mt-1">مانیتورینگ پویای موجودی، نقطه سفارش متریال و ثبت حواله‌های کارگاه</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-medium transition border border-emerald-200">
            <ArrowUpRight className="w-4 h-4" />
            حواله ورود (رسید انبار)
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-medium transition border border-rose-200">
            <ArrowDownLeft className="w-4 h-4" />
            حواله خروج (مصرف کارگاه)
          </button>
        </div>
      </div>
      <InventoryGuide/>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="جستجوی نام کالا، شناسه انبار، ضخامت ورق..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pr-9 pl-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition text-slate-800"
          />
        </div>
        <div className="flex items-center gap-2 min-w-[180px]">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition text-slate-700"
          >
            <option value="all">همه اقلام انبار</option>
            <option value="low">⚠️ رو به اتمام (نقطه سفارش)</option>
            <option value="out">❌ اقلام ناموجود</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch flex-1">
        <div className="flex-1 min-w-0">
          <InventoryTable 
            items={filteredItems}
            selectedItemId={selectedItem?.id}
            onSelectItem={(item) => {
              setSelectedItem(item);
              setIsSidebarOpen(true);
            }}
          />
        </div>

        <InventorySidebar 
          item={selectedItem}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onStockUpdated={handleUpdateStock}
        />
      </div>
    </div>
  );
}