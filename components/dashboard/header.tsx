// app/dashboard/components/Header.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useUser } from "../../context/userContext";
import { 
  Search, 
  ChevronDown, 
  LogOut, 
  Settings, 
  User,
} from "lucide-react";
import { logout } from "@/services/auth.service";

export default function Header() {
  const { user, loading, refreshUser } = useUser();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // تابع خروج از سیستم
  const handleLogOut = async () => {
    try {
      setIsLoggingOut(true);
      
      const { error } = await logout();
      
      if (error) {
        console.error("Error logging out:", error);
        return;
      }

      setIsDropdownOpen(false);
      
      await refreshUser?.();
      
      router.push("/login");
      router.refresh(); 
      
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      admin: "مدیر سیستم",
      employee: "کارمند",
      user: "کاربر",
    };
    return roles[role] || role;
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-800">داشبورد</h2>

      <div className="flex items-center gap-4">
     
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو..."
            className="border border-slate-300 rounded-lg pr-10 pl-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition w-48 md:w-64"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-slate-50 px-3 py-2 rounded-lg transition"
            disabled={loading || isLoggingOut}
          >
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
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 font-bold text-sm">
                    {user?.full_name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-slate-800">
                    {user?.full_name || "کاربر"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {getRoleLabel(user?.role || "user")}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
              </div>
            )}
          </button>

          {isDropdownOpen && !loading && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-medium text-slate-800">
                  {user?.full_name || "کاربر"}
                </p>
                <p className="text-xs text-slate-500">{user?.email}</p>
                <p className="text-xs text-indigo-600 mt-1">
                  {getRoleLabel(user?.role || "user")}
                </p>
              </div>

              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  router.push("/admin/profile");
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
              >
                <User className="w-4 h-4" />
                پروفایل
              </button>

              
              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={handleLogOut}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    در حال خروج...
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4" />
                    خروج از سیستم
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}