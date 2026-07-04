"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface OrderItemInput {
  name: string;
  quantity: number;
  price: number;
}

interface NewOrderInput {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  cabinetType: string;
  materialType: string;
  items: OrderItemInput[];
  totalPrice: number;
  orderDate: string;
}

export async function createNewOrder(formData: NewOrderInput) {
  const supabase = await createClient();

  try {
    const { data: customerData, error: customerError } = await supabase
      .from("customers")
      .insert([
        {
          full_name: formData.customerName,
          phone: formData.customerPhone,
          address: formData.customerAddress,
          city: "تهران",
        },
      ])
      .select("id")
      .single();

    if (customerError)
      throw new Error(`خطا در ثبت مشتری: ${customerError.message}`);
    const customerId = customerData.id;

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          customer_id: customerId,
          status: "pending",
          total_price: formData.totalPrice,
          cabinet_type: formData.cabinetType,
          material_type: formData.materialType,
          order_date: formData.orderDate,
        },
      ])
      .select("id")
      .single();

    if (orderError) throw new Error(`خطا در ثبت سفارش: ${orderError.message}`);
    const orderId = orderData.id;

    const itemsToInsert = formData.items.map((item) => ({
      order_id: orderId,
      description: item.name,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(itemsToInsert);

    if (itemsError)
      throw new Error(`خطا در ثبت اقلام فاکتور: ${itemsError.message}`);

    revalidatePath("/dashboard/orders");

    return { success: true };
  } catch (error: any) {
    console.error("Supabase Transaction Error:", error.message);
    return { success: false, error: error.message };
  }
}

export async function deleteOrder(orderId: number) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from("orders").delete().eq("id", orderId);

    if (error) throw new Error(error.message);

    revalidatePath("/dashboard/orders");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Order Error:", error.message);
    return { success: false, error: error.message };
  }
}

interface UpdateOrderInput {
  rawId: number;
  cabinetType: string;
  materialType: string;
  status: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  totalPrice: number;
}

export async function updateOrder(formData: UpdateOrderInput) {
  const supabase = await createClient();

  try {
    const { error: orderError } = await supabase
      .from("orders")
      .update({
        cabinet_type: formData.cabinetType,
        material_type: formData.materialType,
        status: formData.status,
        total_price: formData.totalPrice,
      })
      .eq("id", formData.rawId);

    if (orderError)
      throw new Error(`خطا در آپدیت سفارش: ${orderError.message}`);

    const { error: deleteItemsError } = await supabase
      .from("order_items")
      .delete()
      .eq("order_id", formData.rawId);

    if (deleteItemsError)
      throw new Error(
        `خطا در پاکسازی اقلام قدیمی: ${deleteItemsError.message}`,
      );

    const itemsToInsert = formData.items.map((item) => ({
      order_id: formData.rawId,
      description: item.name,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    const { error: insertItemsError } = await supabase
      .from("order_items")
      .insert(itemsToInsert);

    if (insertItemsError)
      throw new Error(
        `خطا در ثبت اقلام جدید فاکتور: ${insertItemsError.message}`,
      );

    revalidatePath("/dashboard/orders");
    return { success: true };
  } catch (error: any) {
    console.error("Update Order Error:", error.message);
    return { success: false, error: error.message };
  }
}
