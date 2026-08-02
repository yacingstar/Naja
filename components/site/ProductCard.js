"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import PlaceholderImage from "./PlaceholderImage";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const colors = product.product_colors ?? [];
  const cover =
    colors.find((c) => c.in_stock && c.image_url) ??
    colors.find((c) => c.image_url);
  const defaultColor = colors.find((c) => c.in_stock) ?? colors[0] ?? null;

  function handleQuickAdd(e) {
    e.preventDefault();
    if (!defaultColor) return;
    addItem({
      productId: product.id,
      colorName: defaultColor.color_name,
      name: product.name,
      price: product.price,
      imageUrl: defaultColor.image_url ?? null,
      hex: defaultColor.hex,
      quantity: 1,
    });
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col rounded-card bg-bg-soft p-4 shadow-[0_10px_30px_rgba(180,120,150,0.12)] transition hover:-translate-y-1.5"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-surface">
        {cover?.image_url ? (
          <Image
            src={cover.image_url}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage className="h-full w-full" />
        )}
      </div>

      <div className="flex flex-1 flex-col pt-4">
        {product.category && (
          <span className="mb-2 inline-block w-fit rounded-full bg-mint px-2.5 py-0.5 text-xs font-heading font-bold text-[#1f7a5c]">
            {product.category}
          </span>
        )}
        <p className="font-heading font-bold text-text">{product.name}</p>
        <p className="mt-0.5 line-clamp-1 text-sm text-text-dim">
          {product.description}
        </p>

        {colors.length > 0 && (
          <div className="mt-2 flex gap-1.5">
            {colors.slice(0, 5).map((c) => (
              <span
                key={c.id}
                className="h-3.5 w-3.5 rounded-full border border-line-strong"
                style={{ backgroundColor: c.hex }}
                title={c.color_name}
              />
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <p className="font-heading font-bold text-glow-dim">
            {formatPrice(product.price)}
          </p>
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!defaultColor || !defaultColor.in_stock}
            aria-label={`Add ${product.name} to cart`}
            title={
              defaultColor
                ? `Quick add — ${defaultColor.color_name}`
                : "No colors available"
            }
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-soft text-lg font-bold text-glow-dim transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          >
            +
          </button>
        </div>
      </div>
    </Link>
  );
}
