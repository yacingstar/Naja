export const metadata = { title: "About — Naja" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <span className="inline-block rounded-full bg-mint px-3 py-1 text-xs font-heading font-bold text-[#1f7a5c]">
        our story
      </span>
      <h1 className="mt-2 font-heading text-3xl font-bold text-text">
        About Naja
      </h1>
      <div className="mt-6 space-y-4 text-text-dim">
        <p>
          Naja started with a single 3D printer and a love for warm, cozy
          light. Every lamp is made to order — nothing sits in a warehouse,
          which means each piece is printed fresh just for you.
        </p>
        <p>
          We&apos;re a small, made-to-order shop based in Algeria. Once you
          place an order, we&apos;ll give you a call to confirm the details, then print,
          deliver, and collect payment in cash right at your door.
        </p>
        <p>
          No factories, no mass production — just careful, small-batch
          printing and a lamp made with your order in mind.
        </p>
      </div>
    </div>
  );
}
