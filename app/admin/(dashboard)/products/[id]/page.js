import { notFound } from "next/navigation";
import { getAnonClient } from "@/lib/supabase/anon";
import { updateProduct, deleteProduct } from "../actions";
import ColorRow from "@/components/admin/ColorRow";
import SaveButton from "@/components/admin/SaveButton";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function EditProductPage({ params }) {
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
    <div className="max-w-3xl">
      <h1 className="font-heading text-2xl font-bold text-text">
        Edit product
      </h1>

      <form action={updateProduct} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={product.id} />

        <div>
          <label className="mb-1 block font-heading text-sm font-semibold text-text">
            Name
          </label>
          <input
            name="name"
            defaultValue={product.name}
            required
            className="w-full rounded-2xl border border-line-strong bg-bg-soft px-4 py-3 text-text outline-none focus:border-glow"
          />
        </div>

        <div>
          <label className="mb-1 block font-heading text-sm font-semibold text-text">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={product.description}
            required
            rows={4}
            className="w-full rounded-2xl border border-line-strong bg-bg-soft px-4 py-3 text-text outline-none focus:border-glow"
          />
        </div>

        <div>
          <label className="mb-1 block font-heading text-sm font-semibold text-text">
            Price (DA)
          </label>
          <input
            name="price"
            type="number"
            min="0"
            step="1"
            defaultValue={product.price}
            required
            className="w-full rounded-2xl border border-line-strong bg-bg-soft px-4 py-3 text-text outline-none focus:border-glow"
          />
        </div>

        <div className="flex items-center gap-3">
          <SaveButton>Save changes</SaveButton>
        </div>
      </form>

      <div className="mt-10">
        <h2 className="font-heading text-xl font-bold text-text">Colors</h2>
        <p className="mt-1 text-sm text-text-dim">
          Each color has its own photo, name, and stock status.
        </p>

        <div className="mt-4 space-y-3">
          {(product.product_colors ?? []).map((color) => (
            <ColorRow key={color.id} productId={product.id} color={color} />
          ))}
          <ColorRow productId={product.id} color={null} />
        </div>
      </div>

      <div className="mt-10 border-t border-line pt-6">
        <form action={deleteProduct}>
          <input type="hidden" name="id" value={product.id} />
          <DeleteProductButton productName={product.name} />
        </form>
      </div>
    </div>
  );
}
