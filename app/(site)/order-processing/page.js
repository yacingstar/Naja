import { orderCode } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default async function OrderProcessingPage({ searchParams }) {
  const { order } = await searchParams;
  const code = order ? orderCode(order) : null;

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-glow text-3xl">
        🛎️
      </div>
      <h1 className="font-heading text-3xl font-bold text-text">
        We&apos;re processing your order!
      </h1>
      <p className="mt-3 text-text-dim">
        Expect a call soon to confirm delivery. You&apos;ll pay in cash when
        your lamp arrives.
      </p>
      {code && (
        <p className="mt-6 font-heading text-lg font-semibold text-text">
          Order code:{" "}
          <span className="rounded-full bg-surface px-4 py-1 text-glow-dim">
            {code}
          </span>
        </p>
      )}
      <div className="mt-8 flex justify-center">
        <Button href="/">Continue shopping</Button>
      </div>
    </div>
  );
}
