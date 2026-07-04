"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateCustomer(payload: {
  rawId: number;
  name: string;
  phone: string;
  address: string;
}) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("customers")
      .update({
        full_name: payload.name,
        phone: payload.phone,
        address: payload.address,
      })
      .eq("id", payload.rawId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "خطایی رخ داد" };
  }
}