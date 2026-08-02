# Naja

*warm light, made for you*

A little storefront for a made-to-order 3D-printed lamp shop in Algeria.
No payment gateway, no fuss — a customer picks a lamp and a color, the
shop owner calls to confirm, then delivers it and collects cash at the
door.

- **Frontend:** Next.js (App Router, JavaScript), Tailwind CSS v4
- **Backend:** Supabase (Postgres + Auth + Storage)
- **Hosting:** Netlify (frontend) + Supabase (backend)

## Getting started

### 1. Create the Supabase project

Create a project at [supabase.com](https://supabase.com), then open the SQL
editor and run [`supabase/migration.sql`](supabase/migration.sql) top to
bottom. It creates the `products`, `product_colors`, and `orders` tables,
sets up RLS policies + table grants for the `anon` and `service_role` roles,
and creates the public `product-images` Storage bucket.

### 2. Create the admin account

There is no public sign-up for the admin panel — the shop owner's account is
created by hand:

1. In the Supabase dashboard, go to **Authentication → Users → Add user**.
2. Enter an email and password for the shop owner.
3. That's it — they can log in at `/admin/login` with those credentials.

### 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in the three values from
your Supabase project's **Settings → API** page:

```
NEXT_PUBLIC_SUPABASE_URL=       # Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # anon / public key
SUPABASE_SERVICE_ROLE_KEY=      # service_role key — keep secret, server-only
```

`SUPABASE_SERVICE_ROLE_KEY` must never be prefixed `NEXT_PUBLIC_` and is only
ever read inside Server Actions — it's never sent to the browser.

**Env var changes require a full restart of `npm run dev`** — they don't
hot-reload.

### 4. Install and run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the storefront and
`http://localhost:3000/admin/login` for the admin panel.

## How it's put together

- **Public storefront** (`app/(site)`) — home, product detail, cart,
  checkout, order confirmation, about/contact, and placeholder login/signup
  pages. Reads go through the anon Supabase client; placing an order is the
  only public write, allowed by the `orders` insert policy.
- **Cart** (`lib/cart-context.js`) — a React Context persisted to
  `localStorage`, restored client-side only (no SSR access) to avoid
  hydration issues. Each line item is keyed by `productId::colorName` and
  stores a snapshot of the product at add-to-cart time, so the cart keeps
  working even if a product is edited or removed later.
- **Admin panel** (`app/admin`) — `/admin/login` is public; everything under
  `app/admin/(dashboard)` requires a session, checked twice: once in
  `proxy.js` (redirects unauthenticated requests before any admin page
  renders) and again in the `(dashboard)` layout as a safety net. Admin
  pages *read* data with the same anon client the public site uses. Every
  *write* goes through a Server Action that re-verifies the session and only
  then uses a service-role Supabase client (`lib/supabase/admin.js`,
  guarded with `server-only`) to perform the change, and calls
  `revalidatePath()` so the public site updates immediately.
- **Adding a product** happens in two steps by design: fill in name,
  description, and price on "New product," then you're dropped straight
  onto that product's edit page to add its colors — each with its own name,
  hex swatch, photo (uploaded straight to Supabase Storage), and in-stock
  toggle. Colors need a real product to attach to, so they can't exist
  before the product does.

## Deploying

- **Frontend:** push to Netlify, set the same three env vars in the site's
  environment settings.
- **Backend:** already live once you've run the migration against your
  Supabase project — nothing else to deploy.

---

*made to order, with love*
