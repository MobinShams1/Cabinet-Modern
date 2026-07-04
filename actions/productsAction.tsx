"use server";

import { createClient } from "@/lib/supabase/server";

export async function createNewProduct(payload: {
  name: string;
  category: "cabinet" | "material" | "accessory";
  type: string;
  pricePerMeter: number;
  description: string;
  stock: number;
}) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: payload.name,
          category: payload.category,
          style_type: payload.type,
          price: payload.pricePerMeter,
          description: payload.description,
          stock: payload.stock,
        },
      ])
      .select();

    if (error) return { success: false, error: error.message };

    return { 
      success: true, 
      productId: data[0].id,
      sku: data[0].sku || `PRD-${data[0].id}`
    };
  } catch (err: any) {
    return { success: false, error: err.message || "خطایی در سرور رخ داد" };
  }
}

export async function updateProduct(payload: {
  rawId: number;
  name: string;
  category: "cabinet" | "material" | "accessory";
  type: string;
  pricePerMeter: number;
  stock: number;
  description: string;
}) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("products")
      .update({
        name: payload.name,
        category: payload.category,
        style_type: payload.type,
        price: payload.pricePerMeter,
        stock: payload.stock,
        description: payload.description,
      })
      .eq("id", payload.rawId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "خطایی در سرور رخ داد" };
  }
}




export async function deleteProduct(rawId: number) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", rawId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "خطایی در سرور رخ داد" };
  }
}