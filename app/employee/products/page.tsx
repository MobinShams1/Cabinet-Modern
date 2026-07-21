// app/dashboard/products/page.tsx
import ProductListContainer from "@/components/products/productListContainer";
import ProductStats from "@/components/products/productStats";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function ProductsPage() {
  const supabase = await createClient();

  const { data: productsData, error } = await supabase
    .from("products")
    .select("*")
    .in("category", ["cabinet", "accessory"]) 
    .order("created_at", { ascending: false });

  if (error) {
    console.error("خطا در دریافت کاتالوگ محصولات:", error.message);
  }

  const formattedProducts = (productsData || []).map((product: any) => {
    let stockStatus: "in-stock" | "low-stock" | "out-of-stock" = "in-stock";
    if (product.stock <= 0) stockStatus = "out-of-stock";
    else if (product.stock <= 5) stockStatus = "low-stock";

    return {
      id: product.sku || `PRD-${product.id}`,
      rawId: product.id,
      name: product.name,
      category: product.category || "cabinet",
      type: product.style_type || "نامشخص",
      pricePerMeter: Number(product.price) || 0,
      stockStatus,
      description: product.description || "بدون توضیحات فنی",
    };
  });

  const totalItems = formattedProducts.length;
  const outOfStockItems = formattedProducts.filter(p => p.stockStatus === "out-of-stock").length;
  const averageCabinetPrice = formattedProducts.filter(p => p.category === "cabinet")
    .reduce((sum, p, _, arr) => sum + p.pricePerMeter / (arr.length || 1), 0);

  return (
    <div className="h-full bg-slate-50/50 flex flex-col">
      <ProductStats totalItems={totalItems} outOfStock={outOfStockItems} avgPrice={averageCabinetPrice} />
      <div className="flex-1">
        <ProductListContainer initialProducts={formattedProducts} />
      </div>
    </div>
  );
}