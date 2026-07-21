"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Warehouse,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useUser } from "@/context/userContext";

import MenuLink from "../dashboard/menuLinks";

const menuItems = [
  {
    id: "dashboard",
    label: "داشبورد",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "dashboard",
  },
  {
    id: "orders",
    label: "سفارشات",
    icon: <ShoppingBag className="w-5 h-5" />,
    href: "orders",
  },
  {
    id: "products",
    label: "محصولات",
    icon: <Package className="w-5 h-5" />,
    href: "products",
  },
  {
    id: "inventory",
    label: "انبار",
    icon: <Warehouse className="w-5 h-5" />,
    href: "inventory",
  },
  {
    id: "reports",
    label: "گزارشات",
    icon: <BarChart3 className="w-5 h-5" />,
    href: "reports",
  },
 
];

export default function Sidebar() {
  const { user, loading } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside
      className={`bg-white border-l border-slate-200 transition-all duration-300 relative ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-white border border-slate-200 rounded-full p-1.5 shadow-md hover:bg-slate-50 transition z-10"
      >
        {isSidebarOpen ? (
          <ChevronRight className="w-4 h-4 text-slate-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        )}
      </button>

      <div
        className={`p-6 flex items-center ${isSidebarOpen ? "justify-start" : "justify-center"}`}
      >
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">C</span>
        </div>
        {isSidebarOpen && (
          <h1 className="text-2xl font-bold mr-3 text-slate-800 whitespace-nowrap">
            Cabinet ERP
          </h1>
        )}
      </div>

      <nav className="px-3 space-y-1">
        {menuItems.map((item) => (
          <MenuLink
            key={item.id}
            id={item.id}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isSidebarOpen={isSidebarOpen}
            onClick={toggleSidebar}
          />
        ))}
      </nav>

      {loading && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      )}
      {isSidebarOpen && !loading && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-bold">
                {user?.full_name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">
                {user?.role === "admin" ? "مدیر سیستم" : "تعریف نشده"}
              </p>
              <p className="text-xs truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
