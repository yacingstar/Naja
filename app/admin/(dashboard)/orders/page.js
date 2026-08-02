import { getAnonClient } from "@/lib/supabase/anon";
import { formatPrice, orderCode } from "@/lib/utils";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export default async function AdminOrdersPage({ searchParams }) {
  const { q } = await searchParams;
  const supabase = getAnonClient();

  let query = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (q) {
    query = query.or(`customer_name.ilike.%${q}%,phone.ilike.%${q}%`);
  }

  const { data: orders } = await query;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-2xl font-bold text-text">Orders</h1>
        <form className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search by name or phone…"
            className="w-64 rounded-full border border-line-strong bg-bg-soft px-4 py-2 text-sm text-text outline-none focus:border-glow"
          />
          <button
            type="submit"
            className="rounded-full bg-glow px-4 py-2 font-heading text-sm font-semibold text-white hover:bg-glow-dim"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[20px] border border-line bg-bg-soft">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-line text-sm text-text-dim">
              <th className="px-5 py-3 font-heading font-semibold">Order</th>
              <th className="px-5 py-3 font-heading font-semibold">Customer</th>
              <th className="px-5 py-3 font-heading font-semibold">Phone</th>
              <th className="px-5 py-3 font-heading font-semibold">City</th>
              <th className="px-5 py-3 font-heading font-semibold">Total</th>
              <th className="px-5 py-3 font-heading font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {(orders ?? []).map((order) => (
              <tr key={order.id} className="border-b border-line last:border-0">
                <td className="whitespace-nowrap px-5 py-3 text-sm text-text-dim">
                  {orderCode(order.id)}
                  <div className="text-xs">
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-5 py-3 font-heading font-semibold text-text">
                  {order.customer_name}
                </td>
                <td className="px-5 py-3 text-text-dim">{order.phone}</td>
                <td className="px-5 py-3 text-text-dim">{order.city}</td>
                <td className="px-5 py-3 font-heading font-semibold text-text">
                  {formatPrice(order.total)}
                </td>
                <td className="px-5 py-3">
                  <OrderStatusSelect orderId={order.id} status={order.status} />
                </td>
              </tr>
            ))}
            {(!orders || orders.length === 0) && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-text-dim">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
