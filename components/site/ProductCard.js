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
      className="group flex flex-col overflow-hidden rounded-[20px] border border-line bg-bg-soft transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-surface">
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
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="font-heading font-semibold text-text">{product.name}</p>
        <p className="line-clamp-2 text-sm text-text-dim">
          {product.description}
        </p>
        <p className="mt-2 font-heading font-bold text-glow-dim">
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
