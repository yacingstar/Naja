import Link from "next/link";

const VARIANTS = {
  primary:
    "bg-glow text-white shadow-[0_6px_0_var(--color-glow-dim)] hover:translate-y-[2px] hover:shadow-[0_4px_0_var(--color-glow-dim)] active:translate-y-[6px] active:shadow-none",
  secondary:
    "bg-bg-soft text-glow-dim border-2 border-glow hover:bg-surface",
  danger:
    "bg-danger text-white shadow-[0_6px_0_rgba(0,0,0,0.15)] hover:translate-y-[2px] hover:shadow-[0_4px_0_rgba(0,0,0,0.15)]",
  ghost: "bg-transparent text-text hover:bg-surface",
};

export default function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-heading font-bold text-sm transition disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
