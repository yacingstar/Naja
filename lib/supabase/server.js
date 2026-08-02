import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Session-aware server client for use in Server Components, layouts, and
// Server Actions that need to know *who is logged in* (admin auth checks).
// It is NOT used for reading products/orders — those go through the plain
// anon client (lib/supabase/anon.js) since the admin's authenticated role
// has no table grants of its own, only anon + service_role do.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component render — safe to ignore
            // because proxy.js refreshes the session on every request.
          }
        },
      },
    }
  );
}
