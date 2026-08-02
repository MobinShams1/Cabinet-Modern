"use client";

import { StaffMember } from "./staffListContainer";
import { Shield, Users, ChevronLeft, Inbox } from "lucide-react";

interface StaffTableProps {
  staff: StaffMember[];
  selectedId?: string;
  onSelectMember: (member: StaffMember) => void;
  currentUserId: string;
}

export default function StaffTable({
  staff,
  selectedId,
  onSelectMember,
  currentUserId,
}: StaffTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden flex-1 flex flex-col dir-rtl">
      <div className="overflow-x-auto min-w-full">
        <table className="w-full text-right border-collapse min-w-[650px] sm:min-w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-600 text-xs sm:text-sm font-semibold">
              <th className="p-3.5 sm:p-4">نام و نام خانوادگی</th>
              <th className="p-3.5 sm:p-4">نشانی ایمیل</th>
              <th className="p-3.5 sm:p-4">شماره تماس</th>
              <th className="p-3.5 sm:p-4">سطح دسترسی</th>
              <th className="p-3.5 sm:p-4">وضعیت حساب</th>
              <th className="p-3.5 sm:p-4 text-center">تنظیمات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {staff.map((member) => {
              const isMe =
                member.rawId === currentUserId ||
                member.email === currentUserId;

              return (
                <tr
                  key={member.rawId}
                  onClick={() => onSelectMember(member)}
                  className={`hover:bg-slate-50/90 active:bg-slate-100 transition cursor-pointer text-xs sm:text-sm text-slate-700 ${
                    selectedId === member.id
                      ? "bg-indigo-50/50 font-medium"
                      : ""
                  } ${isMe ? "bg-slate-50/50" : ""}`}
                >
                  <td className="p-3.5 sm:p-4 flex items-center gap-2">
                    <span className="font-semibold text-slate-900 truncate max-w-[120px] sm:max-w-none">
                      {member.fullName}
                    </span>
                    {isMe && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-600 text-white shadow-sm shadow-indigo-100 shrink-0">
                        شما
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono text-xs text-slate-500 dir-ltr text-right">
                    {member.email}
                  </td>
                  <td className="p-3.5 sm:p-4 text-xs text-slate-600 font-mono dir-ltr text-right">
                    {member.phone || "—"}
                  </td>
                  <td className="p-3.5 sm:p-4 whitespace-nowrap">
                    {member.role === "admin" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
                        <Shield className="w-3 h-3" /> مدیر سیستم
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                        <Users className="w-3 h-3" /> کارکنان کارگاه
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 sm:p-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          member.status === "active" ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      />
                      <span className="text-xs font-medium text-slate-700">
                        {member.status === "active" ? "فعال" : "دسترسی مسدود"}
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5 sm:p-4 text-center">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition inline-flex items-center justify-center">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {staff.length === 0 && (
        <div className="p-12 text-center text-slate-400 my-auto">
          <Inbox className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="text-xs font-medium">هیچ کاربری با این مشخصات یافت نشد</p>
        </div>
      )}
    </div>
  );
}