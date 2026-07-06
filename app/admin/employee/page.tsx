import StaffListContainer from "@/components/employee/staffListContainer";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function StaffPage() {
  const supabase = await createClient();

  const { data: profilesData, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, phone, role, status, created_at")
    .order("role", { ascending: true });

  if (error) {
    console.error("خطا در دریافت لیست کارکنان از دیتابیس:", error.message);
  }

  const formattedStaff = (profilesData || []).map((member: any) => {
    return {
      id: `STF-${String(member.id).substring(0, 4)}`,
      rawId: member.id,
      fullName: member.full_name || "همکار بدون نام",
      email: member.email || "بدون ایمیل",
      phone: member.phone || "ثبت نشده",
      role: (member.role === "admin" ? "admin" : "employee") as
        | "admin"
        | "employee",
      status: (member.status === "suspended" ? "suspended" : "active") as
        | "active"
        | "suspended",
      createdAt: member.created_at
        ? new Date(member.created_at).toLocaleDateString("fa-IR")
        : new Date().toLocaleDateString("fa-IR"),
    };
  });

  console.log("دیتای فرمت شده نهایی برای فرانت‌اند:", formattedStaff);

  return (
    <div className="h-full bg-slate-50/50 flex flex-col">
      <div className="flex-1">
        <StaffListContainer initialStaff={formattedStaff} />
      </div>
    </div>
  );
}
