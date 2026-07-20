"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface CreateStaffInput {
  fullName: string;
  email: string;
  phone: string;
  role: "admin" | "employee";
  password: string;
}

export async function createStaffMember(data: CreateStaffInput) {
  try {
    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: "عملیات ساخت حساب با خطا مواجه شد." };
    }

    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: authData.user.id,
        full_name: data.fullName,
        phone: data.phone,
        email: data.email,
        role: data.role,
        status: "active",
      },
      { onConflict: "id" },
    );

    if (profileError) {
      return { success: false, error: profileError.message };
    }

    const newStaffFormatted = {
      id: `STF-${String(authData.user.id).substring(0, 4)}`,
      rawId: authData.user.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || "ثبت نشده",
      role: data.role,
      status: "active" as const,
      createdAt: new Date().toLocaleDateString("fa-IR"),
    };

    revalidatePath("/dashboard/employee");

    return { success: true, newMember:newStaffFormatted };

  } catch (err: any) {
    return {
      success: false,
      error: err.message || "خطای غیرمنتظره‌ای رخ داد.",
    };
  }
}
