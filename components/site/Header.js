"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { count, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-heading text-2xl font-bold text-text">
            Naja
          </span>
          <span className="hidden font-accent text-lg text-glow-dim sm:inline">
            handmade light
          </span>
        </Link>

        <nav className="hidden items-center gap-6 font-heading font-semibold text-text-dim sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={openDrawer}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg-soft transition hover:-translate-y-0.5 hover:shadow-md"
          aria-label="Open cart"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              d="M4 6h2l2.2 10.5a2 2 0 0 0 2 1.6h6.6a2 2 0 0 0 2-1.6L20.5 9H7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="21" r="1.4" fill="currentColor" />
            <circle cx="17" cy="21" r="1.4" fill="currentColor" />
          </svg>
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink px-1 text-xs font-heading font-700 text-white">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
