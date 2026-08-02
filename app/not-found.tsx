import Link from "next/link";
import { FileQuestion, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 dir-rtl font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center space-y-5">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-slate-800">صفحه مورد نظر یافت نشد (404)</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            صفحه‌ای که به دنبال آن هستید وجود ندارد یا تغییر آدرس داده است.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition shadow-sm"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به داشبورد
        </Link>
      </div>
    </div>
  );
}