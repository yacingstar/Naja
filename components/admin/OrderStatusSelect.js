"use client";

import { updateOrderStatus } from "@/app/admin/(dashboard)/orders/actions";

const STATUSES = ["pending", "called", "shipped", "delivered"];

export default function OrderStatusSelect({ orderId, status }) {
  return (
    <form action={updateOrderStatus}>
      <input type="hidden" name="id" value={orderId} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.target.form.requestSubmit()}
        className="rounded-full border border-line-strong bg-bg-soft px-3 py-1.5 font-heading text-sm font-semibold capitalize text-text outline-none focus:border-glow"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </form>
  );
}
