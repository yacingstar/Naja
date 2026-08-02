import { getAnonClient } from "@/lib/supabase/anon";
import ProductCard from "@/components/site/ProductCard";
import Button from "@/components/ui/Button";

export default async function HomePage() {
  const supabase = getAnonClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, product_colors(*)")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 text-center sm:px-6 sm:pt-20">
        <p className="font-accent text-2xl text-glow-dim">warm light, made for you</p>
        <h1 className="mx-auto mt-2 max-w-2xl font-heading text-4xl font-bold text-text sm:text-5xl">
          Lamps 3D-printed just for your order
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-text-dim">
          Pick a shape, pick a color, and we&apos;ll print it fresh. Delivered
          across Algeria — pay in cash when it arrives at your door.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="#shop">Shop the collection</Button>
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-text-dim">
            No lamps yet — check back soon!
          </p>
        )}
      </section>
    </div>
  );
}
