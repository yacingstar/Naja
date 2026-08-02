export default function QuantityStepper({ quantity, onChange, size = "md" }) {
  const dims = size === "sm" ? "h-8 w-8 text-sm" : "h-10 w-10 text-base";

  return (
    <div className="inline-flex items-center rounded-full border border-line-strong bg-bg-soft">
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className={`${dims} flex items-center justify-center rounded-full font-heading font-semibold text-text-dim hover:text-text disabled:opacity-30`}
      >
        –
      </button>
      <span className="min-w-[2ch] text-center font-heading font-semibold">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
        className={`${dims} flex items-center justify-center rounded-full font-heading font-semibold text-text-dim hover:text-text`}
      >
        +
      </button>
    </div>
  );
}
