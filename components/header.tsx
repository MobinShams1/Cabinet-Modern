// app/dashboard/components/Header.tsx
"use client";

import { useUser } from "../context/userContext";

export default function Header() {
  const { user, loading } = useUser();
  
  console.log("salam", user?.full_name);

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-800">داشبورد</h2>

      <div className="flex items-center gap-4">
        <input
          placeholder="جستجو..."
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        />

        {loading ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
            <div className="hidden md:block text-right space-y-1.5">
              <div className="h-4 bg-slate-200 rounded w-28 animate-pulse" />
              <div className="h-3 bg-slate-200 rounded w-16 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-bold text-sm">
                {user?.full_name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-slate-800">
                {user?.full_name || "کاربر"}
              </p>
              <p className="text-xs text-slate-500">
                {user?.role === "admin" ? "مدیر سیستم" : "کارمند"}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
