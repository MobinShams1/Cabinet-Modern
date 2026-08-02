"use client";

import { AlertOctagon, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-slate-50 min-h-screen flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center space-y-5">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
            <AlertOctagon className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-900">بروز خطای بحرانی در سیستم</h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              سیستم با یک خطای غیرمنتظره روبه‌رو شده است. لطفا صفحه را مجدداً بارگذاری کنید.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
          >
            <RefreshCw className="w-4 h-4" />
            بازنشانی سامانه
          </button>
        </div>
      </body>
    </html>
  );
}