import Link from "next/link";
import { getAnonClient } from "@/lib/supabase/anon";
import ProductCard from "@/components/site/ProductCard";
import Button from "@/components/ui/Button";

const CATEGORY_BG_CLASSES = [
  "bg-pink-soft",
  "bg-mint",
  "bg-lavender",
  "bg-peach",
  "bg-sky",
];

function ShapeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M32 6c-8 0-14 6-14 14 0 6 3 9 6 12v6h16v-6c3-3 6-6 6-12 0-8-6-14-14-14Z"
        fill="currentColor"
        opacity="0.9"
      />
      <rect x="26" y="44" width="12" height="6" rx="3" fill="currentColor" />
      <rect x="28" y="52" width="8" height="5" rx="2.5" fill="currentColor" />
    </svg>
  );
}

const TRUST_ITEMS = [
  { label: "3D-Printed to Order", detail: "Nothing sits in a warehouse" },
  { label: "Cash on Delivery", detail: "Pay when it arrives, not before" },
  { label: "Delivered Across Algeria", detail: "Straight to your door" },
  { label: "Made with Care", detail: "Small-batch, checked by hand" },
];

export default async function HomePage({ searchParams }) {
  const { category: activeCategory } = await searchParams;
  const supabase = getAnonClient();
  const { data: allProducts } = await supabase
    .from("products")
    .select("*, product_colors(*)")
    .order("sort_order", { ascending: true });

  const products = allProducts ?? [];
  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const visibleProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pink-soft to-bg px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className="text-center md:text-left">
            <span className="inline-block rounded-full bg-bg-soft px-4 py-1.5 font-heading text-sm font-bold text-glow-dim shadow-[0_3px_0_var(--color-pink-soft)]">
              100% 3D-Printed, Made to Order
            </span>
            <h1 className="mx-auto mt-4 max-w-md font-heading text-4xl font-extrabold leading-tight text-text sm:text-5xl md:mx-0">
              Lamps with a little{" "}
              <span className="text-glow-dim">glow</span> and a lot of
              personality.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-text-dim md:mx-0">
              Pick a shape, pick a color, and we&apos;ll print it fresh.
              Delivered across Algeria — pay in cash when it arrives at your
              door.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
              <Button href="#shop">Shop the collection</Button>
              <Button href="/about" variant="secondary">
                See how it&apos;s made
              </Button>
            </div>
          </div>

          <div className="relative mx-auto flex h-[280px] w-full max-w-sm items-center justify-center sm:h-[340px]">
            <div
              className="absolute h-64 w-64 rounded-[63%_37%_54%_46%/45%_55%_45%_55%] bg-lavender sm:h-80 sm:w-80"
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col items-center gap-3 rounded-[28px] bg-bg-soft p-8 text-center shadow-[0_20px_40px_rgba(200,120,160,0.25)]">
              <ShapeIcon className="h-20 w-20 text-glow" />
              <p className="font-heading font-bold text-text">
                Made just for you
              </p>
            </div>
            <div className="absolute -right-2 top-2 rotate-6 rounded-2xl bg-bg-soft px-4 py-3 text-center shadow-[0_12px_24px_rgba(200,120,160,0.2)] sm:right-0">
              <p className="font-heading text-xs font-bold text-glow-dim">
                cash on delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by shape */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-bold text-text sm:text-3xl">
            Shop by shape
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <Link
              href="/"
              className="flex w-24 flex-col items-center gap-2 text-center"
            >
              <span
                className={`flex h-20 w-20 items-center justify-center rounded-full bg-surface transition group-hover:-translate-y-1 ${
                  !activeCategory ? "ring-2 ring-glow" : ""
                }`}
              >
                <ShapeIcon className="h-9 w-9 text-glow-dim" />
              </span>
              <p className="font-heading text-sm font-bold text-text">All</p>
            </Link>
            {categories.map((category, i) => (
              <Link
                key={category}
                href={`/?category=${encodeURIComponent(category)}#shop`}
                className="flex w-24 flex-col items-center gap-2 text-center"
              >
                <span
                  className={`flex h-20 w-20 items-center justify-center rounded-full transition hover:-translate-y-1 ${CATEGORY_BG_CLASSES[i % CATEGORY_BG_CLASSES.length]} ${
                    activeCategory === category ? "ring-2 ring-glow" : ""
                  }`}
                >
                  <ShapeIcon className="h-9 w-9 text-glow-dim" />
                </span>
                <p className="font-heading text-sm font-bold text-text">
                  {category}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Products */}
      <section id="shop" className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-text sm:text-3xl">
            {activeCategory ? `${activeCategory} lamps` : "The collection"}
          </h2>
          {activeCategory && (
            <Link
              href="/"
              className="mt-2 inline-block text-sm font-semibold text-glow-dim hover:underline"
            >
              Clear filter
            </Link>
          )}
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-text-dim">
            {activeCategory
              ? "No lamps in this shape yet — check back soon."
              : "No lamps yet — check back soon."}
          </p>
        )}
      </section>

      {/* Trust bar */}
      <section className="bg-lavender/50 px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 text-center sm:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label}>
              <p className="font-heading text-sm font-bold text-text">
                {item.label}
              </p>
              <p className="mt-1 text-xs text-text-dim">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
