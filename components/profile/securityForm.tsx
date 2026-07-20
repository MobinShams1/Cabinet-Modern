// app/dashboard/profile/_components/SecurityForm.tsx
"use client";

import { Lock, Loader2 } from "lucide-react";

interface SecurityFormState {
  newPassword:  string;
  confirmPassword: string;
}

interface SecurityFormProps {
  formData: SecurityFormState;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SecurityForm({ formData, loading, onChange, onSubmit }: SecurityFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-50 pb-2 mb-2">
        <Lock className="w-4 h-4 text-slate-400" />
        <h2 className="text-xs font-bold text-slate-700">امنیت و کلمه عبور</h2>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 block">رمز عبور جدید</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={onChange}
          placeholder="حداقل ۶ کاراکتر"
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-indigo-500 focus:bg-white transition text-slate-800 font-mono text-left"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 block">تکرار رمز عبور جدید</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onChange}
          placeholder="تکرار مجدد رمز عبور"
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-indigo-500 focus:bg-white transition text-slate-800 font-mono text-left"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition disabled:opacity-60 shadow-sm"
      >
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
        تغییر و بروزرسانی رمز عبور
      </button>
    </form>
  );
}