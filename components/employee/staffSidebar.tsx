"use client";

import { useState, useEffect } from "react";
import { StaffMember } from "./staffListContainer";
import { X, ShieldAlert, UserCheck, Key } from "lucide-react";
import { toast } from "sonner";

interface StaffSidebarProps {
  member: StaffMember | null;
  isOpen: boolean;
  onClose: () => void;
  onDataUpdated: (rawId: number, status: "active" | "suspended", role: "admin" | "employee") => void;
}

export default function StaffSidebar({ member, isOpen, onClose, onDataUpdated }: StaffSidebarProps) {
  const [role, setRole] = useState<"admin" | "employee">("employee");
  const [status, setStatus] = useState<"active" | "suspended">("active");

  useEffect(() => {
    if (member) {
      setRole(member.role);
      setStatus(member.status);
    }
  }, [member]);

  if (!isOpen || !member) return null;

  const handleSaveChanges = () => {
    onDataUpdated(member.rawId, status, role);
    toast.success(`تغییرات دسترسی کاربر «${member.fullName}» با موفقیت در سیستم اعمال شد.`);
  };

  return (
    <div className="w-full lg:w-[340px] bg-white border border-slate-100 rounded-xl shadow-sm flex flex-col h-full overflow-hidden transition-all duration-300">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">کارت امنیتی و کنترل دسترسی</h3>
        <button onClick={onClose} className="p-1 hover:bg-slate-50 rounded-lg transition text-slate-400">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-5 flex-1 overflow-y-auto">
        <div className="text-center bg-slate-50/60 p-4 rounded-xl border border-slate-100">
          <h4 className="font-bold text-slate-800 text-xs">{member.fullName}</h4>
          <span className="text-[11px] font-mono text-slate-400 block mt-1">{member.email}</span>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 block">سطح دسترسی پنل کارگاه</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500 transition text-slate-700 font-medium"
          >
            <option value="admin">👑 مدیر سیستم (دسترسی به سود و انبار)</option>
            <option value="employee">🛠️ کارکنان کارگاه (فقط ثبت فاکتور و کاتالوگ)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 block">وضعیت ورود به سایت</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setStatus("active")}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition ${
                status === "active" 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold" 
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" /> مجاز (فعال)
            </button>
            <button
              type="button"
              onClick={() => setStatus("suspended")}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition ${
                status === "suspended" 
                  ? "bg-rose-50 border-rose-200 text-rose-700 font-bold" 
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" /> مسدودسازی ورود
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={handleSaveChanges}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-medium transition shadow-sm shadow-indigo-100"
          >
            <Key className="w-3.5 h-3.5" /> ذخیره تغییرات دسترسی
          </button>
        </div>
      </div>
    </div>
  );
}