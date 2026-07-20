"use client";

import { useState } from "react";
import { X, UserPlus, Loader2, Eye, EyeOff } from "lucide-react"; 
import { createStaffMember } from "@/actions/employeeAction";
import { toast } from "sonner";

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStaffAdded: (newMember :any) => void;
}

export default function AddStaffModal({ isOpen, onClose }: AddStaffModalProps) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "employee" as "admin" | "employee",
    password: "", 
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("لطفاً تمام فیلدهای ستاره‌دار را وارد کنید.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    try {
      setLoading(true);
      const res = await createStaffMember(formData);

      if (res.success && res.newMember) {
        toast.success(`همکار جدید (${formData.fullName}) با موفقیت به سیستم اضافه شد.`);
        setFormData({ fullName: "", email: "", phone: "", role: "employee", password: "" });
        onStaffAdded(res.newMember);
        onClose();
      } else {
        toast.error(`خطا: ${res.error}`);
      }
    } catch (err) {
      toast.error("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col">
        
        {/* هدر مودال */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <UserPlus className="w-4 h-4 text-indigo-600" />
            افزودن عضو جدید به کارگاه
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-lg transition text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">نام و نام خانوادگی *</label>
            <input
              type="text"
              required
              placeholder="مثال: علیرضا کاظمی"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">نشانی ایمیل (نام کاربری ورود) *</label>
            <input
              type="email"
              required
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition text-left font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">کلمه عبور ورود به پنل *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="حداقل ۶ کاراکتر"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pr-3 pl-10 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition text-left font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">شماره تماس</label>
            <input
              type="text"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">سطح دسترسی و نقش</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition text-slate-700"
            >
              <option value="employee">🛠️ کارکنان کارگاه (Employee)</option>
              <option value="admin">👑 مدیر سیستم (Admin)</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 mt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-medium transition"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-medium transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  در حال ایجاد حساب...
                </>
              ) : (
                "ثبت و فعال‌سازی دسترسی"
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}