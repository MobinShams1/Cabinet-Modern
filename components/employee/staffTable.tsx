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
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-600 font-semibold">
              <th className="p-4">نام و نام خانوادگی</th>
              <th className="p-4">نشانی ایمیل</th>
              <th className="p-4">شماره تماس</th>
              <th className="p-4">سطح دسترسی پنل</th>
              <th className="p-4">وضعیت حساب</th>
              <th className="p-4 text-center">تنظیمات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {staff.map((member) => {
              const isMe =
                member.rawId === currentUserId ||
                member.email === currentUserId;

              return (
                <tr
                  key={member.rawId}
                  onClick={() => onSelectMember(member)}
                  className={`hover:bg-slate-50/80 transition cursor-pointer text-slate-700 ${
                    selectedId === member.id
                      ? "bg-indigo-50/40 font-medium"
                      : ""
                  } ${isMe ? "bg-slate-50/40" : ""}`}
                >
                  <td className="p-4 flex items-center gap-2">
                    <span className="font-medium text-slate-900">
                      {member.fullName}
                    </span>
                    {isMe && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-600 text-white shadow-sm shadow-indigo-100 animate-pulse">
                        شما
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-500">
                    {member.email}
                  </td>
                  <td className="p-4 text-xs text-slate-600 font-medium">
                    {member.phone || "—"}
                  </td>
                  <td className="p-4">
                    {member.role === "admin" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                        <Shield className="w-3 h-3" /> مدیر سیستم
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        <Users className="w-3 h-3" /> کارکنان کارگاه
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          member.status === "active" ? "bg-emerald-500" : "bg-rose-400"
                        }`}
                      />
                      <span className="text-xs text-slate-600">
                        {member.status === "active" ? "فعال" : "دسترسی مسدود"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <ChevronLeft className="w-4 h-4 text-slate-300 mx-auto" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {staff.length === 0 && (
        <div className="p-12 text-center text-slate-400 my-auto">
          <Inbox className="w-12 h-12 mx-auto text-slate-200 mb-3" />
          <p className="text-xs">هیچ کاربری با این مشخصات یافت نشد</p>
        </div>
      )}
    </div>
  );
}