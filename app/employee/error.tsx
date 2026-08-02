"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard Boundary Caught Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 dir-rtl">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/80 shadow-lg p-6 sm:p-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto border border-rose-100 shadow-inner">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-800">
            خطایی در بارگذاری اطلاعات رخ داد!
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            متأسفانه هنگام دریافت یا پردازش اطلاعات این بخش مشکلی پیش آمده است. می‌توانید دوباره تلاش کنید یا به صفحه اصلی بازگردید.
          </p>
          
          {error.digest && (
            <span className="inline-block font-mono text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100 mt-2 dir-ltr">
              کد خطا: #{error.digest}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-xs font-semibold transition shadow-sm shadow-indigo-100"
          >
            <RefreshCw className="w-4 h-4" />
            تلاش مجدد
          </button>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            <LayoutDashboard className="w-4 h-4" />
            داشبورد اصلی
          </Link>
        </div>

      </div>
    </div>
  );
}