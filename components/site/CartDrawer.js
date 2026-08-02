"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import PlaceholderImage from "./PlaceholderImage";
import QuantityStepper from "./QuantityStepper";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, subtotal } =
    useCart();

  return (
    <>
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-50 bg-paper/30 transition-opacity ${
          isDrawerOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-bg-soft shadow-2xl transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <p className="font-heading text-lg font-bold">Your cart</p>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-text-dim">
              Your cart is empty.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-line">
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <PlaceholderImage className="h-full w-full" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-heading font-semibold leading-tight">
                        {item.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-xs text-text-dim hover:text-danger"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-xs text-text-dim">{item.colorName}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <QuantityStepper
                        size="sm"
                        quantity={item.quantity}
                        onChange={(q) => updateQuantity(item.key, q)}
                      />
                      <p className="font-heading font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line px-5 py-4">
            <div className="mb-4 flex items-center justify-between font-heading font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Button href="/checkout" onClick={closeDrawer}>
                Checkout
              </Button>
              <Button href="/cart" variant="secondary" onClick={closeDrawer}>
                View cart
              </Button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
