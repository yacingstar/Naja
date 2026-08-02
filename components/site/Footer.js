import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-heading text-xl font-bold text-text">Naja</p>
            <p className="mt-1 font-accent text-lg text-glow-dim">
              made to order, with love
            </p>
            <p className="mt-3 max-w-xs text-sm text-text-dim">
              3D-printed lamps, made to order across Algeria. Cash on
              delivery — pay when your lamp arrives.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="font-heading font-semibold text-text">Shop</p>
              <ul className="mt-2 space-y-1 text-sm text-text-dim">
                <li>
                  <Link href="/" className="hover:text-text">
                    All lamps
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-text">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-heading font-semibold text-text">Naja</p>
              <ul className="mt-2 space-y-1 text-sm text-text-dim">
                <li>
                  <Link href="/about" className="hover:text-text">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-text">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-text-dim">
          © {new Date().getFullYear()} Naja. Made with care in Algeria.
        </p>
      </div>
    </footer>
  );
}
