"use client";

import { useEffect } from "react";
import { RefreshCw, KeyRound } from "lucide-react";

export default function LoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Login Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 dir-rtl">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/80 shadow-xl p-6 sm:p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-100 shadow-inner">
          <KeyRound className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-lg font-bold text-slate-800">
            خطا در بارگذاری فرم ورود
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            متأسفانه هنگام ارتباط با سرویس احراز هویت مشکلی پیش آمده است. لطفا اتصالات اینترنت خود را بررسی کرده و مجدداً تلاش کنید.
          </p>
          
          {error.digest && (
            <span className="inline-block font-mono text-[10px] text-slate-400 bg-slate-50 px-2.5 py-1 rounded border border-slate-100 mt-2 dir-ltr">
              کد اشکال: #{error.digest}
            </span>
          )}
        </div>

        <div className="pt-2">
          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-xl text-xs font-semibold transition shadow-sm shadow-indigo-100"
          >
            <RefreshCw className="w-4 h-4" />
            تلاش مجدد برای بارگذاری فرم
          </button>
        </div>

      </div>
    </div>
  );
}