import { notFound } from "next/navigation";
import { getAnonClient } from "@/lib/supabase/anon";
import ProductDetailClient from "@/components/site/ProductDetailClient";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const supabase = getAnonClient();

  const { data: product } = await supabase
    .from("products")
    .select("*, product_colors(*)")
    .eq("id", id)
    .order("color_name", { referencedTable: "product_colors" })
    .single();

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <ProductDetailClient product={product} />
    </div>
  );
}
