"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface UpdateStaffByAdminInput {
  targetUserId: string;
  role: "admin" | "employee";
  status: "active" | "suspended";
}

export async function updateStaffByAdmin(data: UpdateStaffByAdminInput) {
  try {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: "کاربر احراز هویت نشده است." };
    }

    const { data: currentUserProfile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || currentUserProfile?.role !== "admin") {
      return { success: false, error: "🛡️ دسترسی غیرمجاز! فقط مدیر سیستم می‌تواند سطوح دسترسی را تغییر دهد." };
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        role: data.role,
        status: data.status,
      })
      .eq("id", data.targetUserId); 

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    revalidatePath("/dashboard/employee");
    
    return { success: true };

  } catch (err: any) {
    return { success: false, error: err.message || "خطای غیرمنتظره‌ای در سرور رخ داد." };
  }
}