"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { getAnonClient } from "@/lib/supabase/anon";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

const FIELDS = [
  { name: "customerName", label: "Full name", autoComplete: "name" },
  { name: "phone", label: "Phone number", autoComplete: "tel" },
  { name: "address", label: "Address", autoComplete: "street-address" },
  { name: "city", label: "City", autoComplete: "address-level2" },
  { name: "postalCode", label: "Postal code", autoComplete: "postal-code" },
];

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function validate() {
    const nextErrors = {};
    for (const field of FIELDS) {
      if (!form[field.name].trim()) {
        nextErrors[field.name] = "Required";
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setIsSubmitting(true);
    const supabase = getAnonClient();
    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_name: form.customerName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        postal_code: form.postalCode.trim(),
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          colorName: item.colorName,
          price: item.price,
          quantity: item.quantity,
        })),
        total: subtotal,
      })
      .select("id")
      .single();

    setIsSubmitting(false);

    if (error || !data) {
      setSubmitError(
        "Something went wrong placing your order. Please try again."
      );
      return;
    }

    clear();
    router.push(`/order-processing?order=${data.id}`);
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-heading text-2xl font-bold text-text">
          Your cart is empty
        </h1>
        <p className="mt-2 text-text-dim">
          Add a lamp to your cart before checking out.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href="/">Back to shop</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-text">Checkout</h1>
      <p className="mt-1 text-text-dim">
        Cash on delivery only — no payment needed now. The shop owner will
        call to confirm your order.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {FIELDS.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-1 block font-heading text-sm font-semibold text-text"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                autoComplete={field.autoComplete}
                value={form[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={`w-full rounded-2xl border bg-bg-soft px-4 py-3 text-text outline-none focus:border-glow ${
                  errors[field.name] ? "border-danger" : "border-line-strong"
                }`}
              />
              {errors[field.name] && (
                <p className="mt-1 text-xs text-danger">
                  Please enter your {field.label.toLowerCase()}.
                </p>
              )}
            </div>
          ))}

          {submitError && (
            <p className="text-sm text-danger">{submitError}</p>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Placing order…" : "Place order — Cash on delivery"}
          </Button>
        </form>

        <div className="h-fit rounded-[20px] border border-line bg-bg-soft p-5">
          <p className="font-heading font-semibold text-text">Order summary</p>
          <ul className="mt-3 space-y-2 text-sm text-text-dim">
            {items.map((item) => (
              <li key={item.key} className="flex justify-between gap-2">
                <span>
                  {item.name} ({item.colorName}) × {item.quantity}
                </span>
                <span className="shrink-0 text-text">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-line pt-3 font-heading font-bold text-text">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
