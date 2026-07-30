"use server";

import { createClient as createAdminClient } from "@supabase/supabase-js";
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
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceRoleKey) {
      return {
        success: false,
        error: "کلید SUPABASE_SERVICE_ROLE_KEY در فایل .env.local تعریف نشده است.",
      };
    }

    // ساخت کلاینت ادمین بدون دستکاری cookieStore
    const supabaseAdmin = createAdminClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false, // جلوگیری از ذخیره یا دستکاری سشن فعلی ادمین
      },
    });

    // ۱. ساخت کاربر جدید
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        full_name: data.fullName,
      },
    });

    if (authError) return { success: false, error: authError.message };
    if (!authData.user) return { success: false, error: "خطا در ایجاد کاربر." };

    // ۲. درج اطلاعات در پروفایل
    const { error: profileError } = await supabaseAdmin.from("profiles").upsert(
      {
        id: authData.user.id,
        full_name: data.fullName,
        phone: data.phone,
        email: data.email,
        role: data.role,
        status: "active",
      },
      { onConflict: "id" }
    );

    if (profileError) return { success: false, error: profileError.message };

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

    return { success: true, newMember: newStaffFormatted };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "خطای غیرمنتظره‌ای رخ داد.",
    };
  }
}