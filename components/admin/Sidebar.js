"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";

const NAV_LINKS = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-line bg-bg-soft p-5 sm:h-screen sm:w-60 sm:border-b-0 sm:border-r">
      <p className="font-accent text-2xl text-glow-dim">Naja</p>
      <p className="font-heading text-sm font-semibold text-text-dim">
        Admin
      </p>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV_LINKS.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 font-heading font-semibold transition ${
                isActive
                  ? "bg-glow text-[#5c3a12]"
                  : "text-text-dim hover:bg-surface hover:text-text"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <form action={signOut}>
        <button
          type="submit"
          className="w-full rounded-full border border-line-strong px-4 py-2 text-left font-heading font-semibold text-text-dim transition hover:bg-surface hover:text-text"
        >
          Log out
        </button>
      </form>
    </aside>
  );
}
