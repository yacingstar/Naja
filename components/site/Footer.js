import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#3d2a44] text-[#f5e6ef]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-heading text-xl font-bold text-pink-soft">
              <span
                className="h-3 w-3 rounded-full bg-pink-soft"
                aria-hidden="true"
              />
              Naja
            </p>
            <p className="mt-3 max-w-xs text-sm text-[#f5e6ef]/75">
              3D-printed lamps, made to order across Algeria. Cash on
              delivery — pay when your lamp arrives.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="font-heading font-bold text-pink-soft">Shop</p>
              <ul className="mt-2 space-y-1.5 text-sm text-[#f5e6ef]/75">
                <li>
                  <Link href="/" className="hover:text-white">
                    All lamps
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-white">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-heading font-bold text-pink-soft">Naja</p>
              <ul className="mt-2 space-y-1.5 text-sm text-[#f5e6ef]/75">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-[#f5e6ef]/15 pt-6 text-xs text-[#f5e6ef]/50">
          © {new Date().getFullYear()} Naja. Made with care in Algeria.
        </p>
      </div>
    </footer>
  );
}
