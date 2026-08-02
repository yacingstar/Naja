import Link from "next/link";
import { getAnonClient } from "@/lib/supabase/anon";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default async function AdminProductsPage() {
  const supabase = getAnonClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, product_colors(id)")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-text">
          Products
        </h1>
        <Button href="/admin/products/new">+ New product</Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-[20px] border border-line bg-bg-soft">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-line text-sm text-text-dim">
              <th className="px-5 py-3 font-heading font-semibold">Name</th>
              <th className="px-5 py-3 font-heading font-semibold">
                Category
              </th>
              <th className="px-5 py-3 font-heading font-semibold">Price</th>
              <th className="px-5 py-3 font-heading font-semibold">Colors</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((product) => (
              <tr key={product.id} className="border-b border-line last:border-0">
                <td className="px-5 py-3 font-heading font-semibold text-text">
                  {product.name}
                </td>
                <td className="px-5 py-3 text-text-dim">
                  {product.category || "—"}
                </td>
                <td className="px-5 py-3 text-text-dim">
                  {formatPrice(product.price)}
                </td>
                <td className="px-5 py-3 text-text-dim">
                  {product.product_colors?.length ?? 0}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="font-heading font-semibold text-glow-dim hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-text-dim">
                  No products yet. Create your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
