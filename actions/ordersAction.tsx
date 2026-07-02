
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

    if (customerError) throw new Error(`خطا در ثبت مشتری: ${customerError.message}`);
    const customerId = customerData.id;

    // ۲. ثبت اطلاعات اصلی سفارش در جدول orders
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

    if (itemsError) throw new Error(`خطا در ثبت اقلام فاکتور: ${itemsError.message}`);

    revalidatePath("/dashboard/orders");

    return { success: true };
  } catch (error: any) {
    console.error("Supabase Transaction Error:", error.message);
    return { success: false, error: error.message };
  }
}