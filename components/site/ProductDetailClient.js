"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import PlaceholderImage from "./PlaceholderImage";
import QuantityStepper from "./QuantityStepper";
import Button from "@/components/ui/Button";

export default function ProductDetailClient({ product }) {
  const colors = product.product_colors ?? [];
  const defaultColor = colors.find((c) => c.in_stock) ?? colors[0] ?? null;

  const [selectedId, setSelectedId] = useState(defaultColor?.id ?? null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const selectedColor =
    colors.find((c) => c.id === selectedId) ?? defaultColor;

  function handleAddToCart() {
    if (!selectedColor) return;
    addItem({
      productId: product.id,
      colorName: selectedColor.color_name,
      name: product.name,
      price: product.price,
      imageUrl: selectedColor.image_url ?? null,
      hex: selectedColor.hex,
      quantity,
    });
    setQuantity(1);
  }

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="aspect-square overflow-hidden rounded-[24px] border border-line bg-surface">
        {selectedColor?.image_url ? (
          <Image
            src={selectedColor.image_url}
            alt={`${product.name} — ${selectedColor.color_name}`}
            width={800}
            height={800}
            className="h-full w-full object-cover"
          />
        ) : (
          <PlaceholderImage className="h-full w-full" />
        )}
      </div>

      <div>
        {product.category && (
          <span className="mb-2 inline-block w-fit rounded-full bg-mint px-2.5 py-0.5 text-xs font-heading font-bold text-[#1f7a5c]">
            {product.category}
          </span>
        )}
        <h1 className="font-heading text-3xl font-bold text-text">
          {product.name}
        </h1>
        <p className="mt-2 font-heading text-2xl font-bold text-glow-dim">
          {formatPrice(product.price)}
        </p>
        <p className="mt-4 whitespace-pre-line text-text-dim">
          {product.description}
        </p>

        {colors.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 font-heading font-semibold text-text">
              Color{selectedColor ? `: ${selectedColor.color_name}` : ""}
            </p>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => {
                const isSelected = color.id === selectedColor?.id;
                return (
                  <button
                    key={color.id}
                    type="button"
                    disabled={!color.in_stock}
                    onClick={() => setSelectedId(color.id)}
                    title={
                      color.in_stock
                        ? color.color_name
                        : `${color.color_name} — out of stock`
                    }
                    className={`relative h-10 w-10 rounded-full border-2 transition ${
                      isSelected ? "border-glow" : "border-line-strong"
                    } ${!color.in_stock ? "opacity-40" : "hover:scale-105"}`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {!color.in_stock && (
                      <span className="absolute inset-0 rounded-full border-t-2 border-danger" style={{ transform: "rotate(45deg)" }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center gap-4">
          <QuantityStepper quantity={quantity} onChange={setQuantity} />
          <Button
            onClick={handleAddToCart}
            disabled={!selectedColor || !selectedColor.in_stock}
          >
            Add to cart
          </Button>
        </div>
        {selectedColor && !selectedColor.in_stock && (
          <p className="mt-2 text-sm text-danger">
            This color is currently out of stock.
          </p>
        )}
      </div>
    </div>
  );
}
