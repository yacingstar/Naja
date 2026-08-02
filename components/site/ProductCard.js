import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import PlaceholderImage from "./PlaceholderImage";

export default function ProductCard({ product }) {
  const colors = product.product_colors ?? [];
  const cover =
    colors.find((c) => c.in_stock && c.image_url) ??
    colors.find((c) => c.image_url);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-card bg-bg-soft p-3 shadow-[0_10px_30px_rgba(180,120,150,0.12)] transition hover:-translate-y-1.5"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface">
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
      <div className="flex flex-1 flex-col gap-1 px-1 pt-3">
        {product.category && (
          <span className="mb-1 inline-block w-fit rounded-full bg-mint px-2.5 py-0.5 text-xs font-heading font-bold text-[#1f7a5c]">
            {product.category}
          </span>
        )}
        <p className="font-heading font-bold text-text">{product.name}</p>
        <p className="line-clamp-2 text-sm text-text-dim">
          {product.description}
        </p>
        <p className="mt-1 font-heading font-bold text-glow-dim">
          {formatPrice(product.price)}
        </p>
        {colors.length > 0 && (
          <div className="mt-1 flex gap-1.5">
            {colors.slice(0, 5).map((c) => (
              <span
                key={c.id}
                className="h-4 w-4 rounded-full border border-line-strong"
                style={{ backgroundColor: c.hex }}
                title={c.color_name}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
