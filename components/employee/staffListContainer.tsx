// app/dashboard/staff/_components/staffListContainer.tsx
"use client";

import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import StaffTable from "./staffTable";
import StaffSidebar from "./staffSidebar";
import AddStaffModal from "./addStaffModal";

export interface StaffMember {
  id: string;
  rawId: string;
  fullName: string;
  email: string;
  phone: string;
  role: "admin" | "employee";
  createdAt: string;
  status: "active" | "suspended";
}

interface StaffListContainerProps {
  initialStaff: StaffMember[];
  currentUserId: string;
  currentUserRole: "admin" | "employee";
}

export default function StaffListContainer({
  initialStaff,
  currentUserId,
  currentUserRole,
}: StaffListContainerProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (roleFilter === "all") return matchesSearch;
    return matchesSearch && member.role === roleFilter;
  });

  const handleStaffAdded = (newMember: StaffMember) => {
    setStaff((prev) => [newMember, ...prev]);
  };

  const handleStatusUpdated = (
    rawId: string,
    newStatus: "active" | "suspended",
    newRole: "admin" | "employee",
  ) => {
    setStaff((prev) =>
      prev.map((m) =>
        m.rawId === rawId ? { ...m, status: newStatus, role: newRole } : m,
      ),
    );
    if (selectedStaff?.rawId === rawId) {
      setSelectedStaff((prev) =>
        prev ? { ...prev, status: newStatus, role: newRole } : null,
      );
    }
  };

  return (
    <div className="min-h-full bg-slate-50/50 flex flex-col space-y-4 sm:space-y-6 p-4 sm:p-6 dir-rtl">
      
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-800">
            مدیریت کارکنان و دسترسی‌ها
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            مشاهده سطوح دسترسی کاربران پنل، تعویض نقش‌ها و وضعیت فعال بودن پرسنل
          </p>
        </div>

        {currentUserRole === "admin" && (
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-xs font-semibold transition shadow-sm"
            onClick={() => setIsAddModalOpen(true)}
          >
            <UserPlus className="w-4 h-4" />
            دعوت کاربر / همکار جدید
          </button>
        )}
      </div>

      {/* نوار جستجو و فیلتر */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="جستجوی نام یا نشانی ایمیل همکار..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pr-9 pl-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition text-slate-800 placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-2 min-w-[160px]">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition text-slate-700 cursor-pointer"
          >
            <option value="all">همه نقش‌ها</option>
            <option value="admin">👑 مدیران سیستم</option>
            <option value="employee">🛠️ کارکنان کارگاه</option>
          </select>
        </div>
      </div>

      {/* بخش اصلی جدول و سایدبار */}
      <div className="flex flex-col lg:flex-row gap-6 items-start flex-1 min-h-0">
        <div className="w-full flex-1 min-w-0">
          <StaffTable
            staff={filteredStaff}
            selectedId={selectedStaff?.id}
            onSelectMember={(member) => {
              setSelectedStaff(member);
              setIsSidebarOpen(true);
            }}
            currentUserId={currentUserId}
          />
        </div>

        <StaffSidebar
          member={selectedStaff}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onDataUpdated={handleStatusUpdated}
          currentUserId={currentUserId}
          currentUserRole={currentUserRole}
        />
      </div>

      <AddStaffModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onStaffAdded={handleStaffAdded}
      />
    </div>
  );
}