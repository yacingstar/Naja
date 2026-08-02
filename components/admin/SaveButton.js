"use client";

import { useFormStatus } from "react-dom";

export default function SaveButton({
  children = "Save",
  pendingLabel = "Saving…",
  variant = "primary",
  ...props
}) {
  const { pending } = useFormStatus();

  const classes =
    variant === "danger"
      ? "border border-line-strong text-danger hover:bg-danger hover:text-white"
      : "bg-glow text-white hover:bg-glow-dim";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-full px-5 py-2 font-heading text-sm font-semibold transition disabled:opacity-50 ${classes}`}
      {...props}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
