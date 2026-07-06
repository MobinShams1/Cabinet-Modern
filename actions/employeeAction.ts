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

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: authData.user.id,
          full_name: data.fullName,
          phone: data.phone,
          email: data.email,
          role: data.role,
        },
      ]);

    if (profileError) {
      return { success: false, error: profileError.message };
    }

    revalidatePath("/dashboard/staff");
    return { success: true };

  } catch (err: any) {
    return { success: false, error: err.message || "خطای غیرمنتظره‌ای رخ داد." };
  }
}