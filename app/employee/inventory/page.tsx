import InventoryListContainer from "@/components/inventory/inventoryListContainer";
import InventoryStats from "@/components/inventory/inventoryStats";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function InventoryPage() {
  const supabase = await createClient();

  const { data: inventoryData, error } = await supabase
    .from("products")
    .select("id, name, category, stock, style_type")
    .in("category", ["material", "accessory"]) 
    .order("stock", { ascending: true });

  if (error) {
    console.error("خطا در دریافت موجودی انبار کارگاه:", error.message);
  }

  const formattedItems = (inventoryData || []).map((item: any) => {
    let category: "ورق خام" | "یراق آلات" | "تجهیزات جانبی" = "ورق خام";
    let unit = "ورق";

    if (item.category === "accessory") {
      category = "یراق آلات";
      unit = "عدد";
    } else if (item.category === "equipment") {
      category = "تجهیزات جانبی";
      unit = "متر";
    }

    const minStock = item.category === "material" ? 5 : 10;

    return {
      id: `INV-${item.id.toString().padStart(4, "0")}`,
      rawId: item.id,
      name: `${item.name} (${item.style_type || "عمومی"})`,
      category,
      currentStock: item.stock || 0,
      minStock,
      unit,
      location: item.category === "material" ? "بخش A (تخته‌ها)" : "بخش B (قفسه یراق)",
      lastUpdated: new Date().toLocaleDateString("fa-IR"),
    };
  });

  const totalItemsCount = formattedItems.length;
  const outOfStockCount = formattedItems.filter(i => i.currentStock === 0).length;
  const lowStockCount = formattedItems.filter(i => i.currentStock > 0 && i.currentStock <= i.minStock).length;

  return (
    <div className="h-full bg-slate-50/50 flex flex-col">
      <InventoryStats totalItems={totalItemsCount} outOfStock={outOfStockCount} lowStock={lowStockCount} />
      <div className="flex-1">
        <InventoryListContainer initialItems={formattedItems} />
      </div>
    </div>
  );
}