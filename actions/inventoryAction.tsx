"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateProductStock(rawId: number, newStock: number) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("products")
      .update({ stock: newStock })
      .eq("id", rawId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "خطای سرور" };
  }
}