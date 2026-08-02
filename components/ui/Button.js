import Link from "next/link";

const VARIANTS = {
  primary:
    "bg-glow text-[#5c3a12] hover:bg-glow-dim shadow-sm hover:shadow-md",
  secondary:
    "bg-bg-soft text-text border border-line-strong hover:bg-surface",
  danger: "bg-danger text-white hover:opacity-90",
  ghost: "bg-transparent text-text hover:bg-surface",
};

export default function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-heading font-semibold text-sm transition hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 ${VARIANTS[variant]} ${className}`;

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
