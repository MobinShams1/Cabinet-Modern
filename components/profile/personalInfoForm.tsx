"use client";

import { User, Mail, Save, Loader2 } from "lucide-react";

interface UserFormState {
  fullName: string;
  email: string;
}

interface PersonalInfoFormProps {
  formData: UserFormState;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PersonalInfoForm({ formData, loading, onChange, onSubmit }: PersonalInfoFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-50 pb-2 mb-2">
        <User className="w-4 h-4 text-slate-400" />
        <h2 className="text-xs font-bold text-slate-700">اطلاعات فردی</h2>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 block">نام و نام خانوادگی</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-indigo-500 focus:bg-white transition text-slate-800 font-medium"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 block">نشانی ایمیل (غیرقابل تغییر)</label>
        <div className="relative">
          <input
            type="email"
            disabled
            value={formData.email}
            className="w-full bg-slate-100 border border-slate-200 rounded-lg pr-9 pl-3 py-1.5 text-xs text-slate-400 font-mono text-left"
            style={{ direction: "ltr" }}
          />
          <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-medium transition disabled:opacity-60 shadow-sm"
      >
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
        ذخیره تغییرات فردی
      </button>
    </form>
  );
}