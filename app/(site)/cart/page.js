"use client";

import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import PlaceholderImage from "@/components/site/PlaceholderImage";
import QuantityStepper from "@/components/site/QuantityStepper";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-heading text-2xl font-bold text-text">
          Your cart is empty
        </h1>
        <p className="mt-2 text-text-dim">
          Browse the collection and find a lamp you love.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href="/">Back to shop</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-text">Your cart</h1>

      <div className="mt-8 divide-y divide-line rounded-[20px] border border-line bg-bg-soft">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
          >
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-line bg-surface">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              ) : (
                <PlaceholderImage className="h-full w-full" />
              )}
            </div>

            <div className="flex-1">
              <p className="font-heading font-semibold text-text">
                {item.name}
              </p>
              <p className="text-sm text-text-dim">{item.colorName}</p>
              <p className="mt-1 font-heading text-sm text-glow-dim">
                {formatPrice(item.price)}
              </p>
            </div>

            <QuantityStepper
              quantity={item.quantity}
              onChange={(q) => updateQuantity(item.key, q)}
            />

            <p className="w-24 text-right font-heading font-bold text-text">
              {formatPrice(item.price * item.quantity)}
            </p>

            <button
              type="button"
              onClick={() => removeItem(item.key)}
              className="text-sm text-text-dim hover:text-danger"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-2">
        <div className="flex w-full max-w-xs items-center justify-between font-heading text-lg font-bold sm:w-auto sm:gap-10">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="text-sm text-text-dim">
          Cash on delivery — pay when your lamp arrives.
        </p>
        <Button href="/checkout" className="mt-2">
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
}
