"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Warehouse,
  BarChart3,
  UserCog,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useUser } from "@/context/userContext";

import MenuLink from "../dashboard/menuLinks";
import Image from "next/image";
import logo from "@/public/icon-logo1.png";

const menuItems = [
  { id: "dashboard", label: "داشبورد", icon: <LayoutDashboard className="w-5 h-5" />, href: "/admin/dashboard" },
  { id: "orders", label: "سفارشات", icon: <ShoppingBag className="w-5 h-5" />, href: "/admin/orders" },
  { id: "customers", label: "مشتریان", icon: <Users className="w-5 h-5" />, href: "/admin/customers" },
  { id: "products", label: "محصولات", icon: <Package className="w-5 h-5" />, href: "/admin/products" },
  { id: "inventory", label: "انبار", icon: <Warehouse className="w-5 h-5" />, href: "/admin/inventory" },
  { id: "reports", label: "گزارشات", icon: <BarChart3 className="w-5 h-5" />, href: "/admin/reports" },
  { id: "users", label: "کارکنان", icon: <UserCog className="w-5 h-5" />, href: "/admin/employee" },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ isMobileOpen = false, onCloseMobile }: SidebarProps) {
  const { user, loading } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      <aside
        className={`
          bg-white border-l border-slate-200 transition-all duration-300 z-50
          fixed inset-y-0 right-0 md:static flex flex-col h-full
          ${isMobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          ${isSidebarOpen ? "w-64" : "md:w-20 w-64"}
        `}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
          className="hidden md:flex absolute -left-3 top-6 bg-white border border-slate-200 rounded-full p-1.5 shadow-md hover:bg-slate-50 transition z-10"
        >
          {isSidebarOpen ? (
            <ChevronRight className="w-4 h-4 text-slate-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          )}
        </button>

        <button
          onClick={onCloseMobile}
          className="md:hidden absolute left-4 top-5 text-slate-500 hover:text-slate-800 p-1"
        >
          <X className="w-6 h-6" />
        </button>

        <div
          onClick={toggleSidebar}
          className={`p-6 flex items-center cursor-pointer select-none transition-opacity hover:opacity-80 ${
            isSidebarOpen ? "justify-start" : "md:justify-center justify-start"
          }`}
          title={isSidebarOpen ? "بستن سایدبار" : "باز کردن سایدبار"}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5 shadow-sm">
            <Image
              src={logo}
              alt="Cabinet ERP Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {(isSidebarOpen || isMobileOpen) && (
            <h1 className="text-2xl font-bold mr-3 text-slate-800 whitespace-nowrap">
              Cabinet ERP
            </h1>
          )}
        </div>

        <nav className="px-3 space-y-1 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <MenuLink
              key={item.id}
              id={item.id}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isSidebarOpen={isSidebarOpen || isMobileOpen}
            />
          ))}
        </nav>

        {loading && (
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {(isSidebarOpen || isMobileOpen) && !loading && (
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <span className="text-indigo-600 font-bold">
                  {user?.full_name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {user?.role === "admin" ? "مدیر سیستم" : "تعریف نشده"}
                </p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}