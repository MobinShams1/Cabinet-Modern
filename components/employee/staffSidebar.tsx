"use client";

import { useState, useEffect } from "react";
import { StaffMember } from "./staffListContainer";
import {
  X,
  ShieldAlert,
  UserCheck,
  Loader2,
} from "lucide-react";
import { updateStaffByAdmin } from "@/actions/adminAction";
import { toast } from "sonner";

interface StaffSidebarProps {
  member: StaffMember | null;
  isOpen: boolean;
  currentUserId: string;
  currentUserRole: "admin" | "employee";
  onClose: () => void;
  onDataUpdated: (
    rawId: string,
    status: "active" | "suspended",
    role: "admin" | "employee",
  ) => void;
}

export default function StaffSidebar({
  member,
  isOpen,
  onClose,
  onDataUpdated,
  currentUserId,
  currentUserRole,
}: StaffSidebarProps) {
  const [role, setRole] = useState<"admin" | "employee">("employee");
  const [status, setStatus] = useState<"active" | "suspended">("active");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member) {
      setRole(member.role);
      setStatus(member.status);
    }
  }, [member]);

  if (!isOpen || !member) return null;

  const isMe = member.rawId === currentUserId || member.email === currentUserId;
  const isAdmin = currentUserRole === "admin";

  const handleAdminSaveChanges = async () => {
    try {
      setLoading(true);

      const res = await updateStaffByAdmin({
        targetUserId: member.rawId,
        role: role,
        status: status,
      });

      if (res.success) {
        onDataUpdated(member.rawId, status, role);
        toast.success(`سطح دسترسی با موفقیت در دیتابیس بروزرسانی شد.`);
      } else {
        toast.error(`خطا در ذخیره‌سازی: ${res.error}`);
      }
    } catch (err) {
      toast.error("خطا در ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop موبایل */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity animate-in fade-in"
      />

      <aside className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] rounded-t-2xl lg:rounded-xl lg:static lg:z-auto lg:max-h-none lg:w-[340px] xl:w-[360px] bg-white border border-slate-200/80 shadow-xl lg:shadow-sm flex flex-col h-auto lg:h-full overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-5 lg:slide-in-from-left-4 dir-rtl">
        
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-2.5 lg:hidden" />

        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 z-10">
          <h3 className="text-sm font-bold text-slate-800">
            کارت امنیتی و مدیریت دسترسی
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 rounded-lg transition text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 flex-1 overflow-y-auto">
          <div className="text-center bg-slate-50/80 p-4 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
              {member.fullName} {isMe && "(حساب شما)"}
            </h4>
            <span className="text-[11px] font-mono text-slate-400 block mt-1 dir-ltr">
              {member.email}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 block">
              سطح دسترسی پنل کارگاه
            </label>
            <select
              value={role}
              disabled={!isAdmin}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500 transition text-slate-700 font-medium disabled:opacity-60 disabled:bg-slate-100 cursor-pointer"
            >
              <option value="admin">👑 مدیر سیستم (دسترسی کامل)</option>
              <option value="employee">
                🛠️ کارکنان کارگاه (ثبت فاکتور و کاتالوگ)
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 block">
              وضعیت ورود به پنل
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={!isAdmin}
                onClick={() => setStatus("active")}
                className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold border transition disabled:opacity-50 active:scale-95 ${
                  status === "active"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" /> مجاز (فعال)
              </button>
              <button
                type="button"
                disabled={!isAdmin}
                onClick={() => setStatus("suspended")}
                className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold border transition disabled:opacity-50 active:scale-95 ${
                  status === "suspended"
                    ? "bg-rose-50 border-rose-200 text-rose-700"
                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" /> مسدود ورود
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
            <span className="text-slate-400 flex items-center gap-1">
              ⏱️ تاریخ عضویت:
            </span>
            <span className="text-slate-600 font-medium font-mono dir-ltr">
              {member.createdAt}
            </span>
          </div>
        </div>

        {/* فوتر سایدبار */}
        <div className="p-4 border-t border-slate-100 bg-white">
          {isAdmin ? (
            <button
              onClick={handleAdminSaveChanges}
              disabled={loading}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white rounded-xl text-xs font-semibold transition disabled:opacity-60 shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  در حال ثبت...
                </>
              ) : (
                "ذخیره تغییرات نقش و وضعیت"
              )}
            </button>
          ) : (
            <div className="p-3 bg-amber-50 rounded-xl text-amber-800 text-[10px] text-center font-medium border border-amber-100 leading-relaxed">
              🔒 امکان تغییر دسترسی‌ها فقط برای مدیر سیستم فعال است.
            </div>
          )}
        </div>
      </aside>
    </>
  );
}