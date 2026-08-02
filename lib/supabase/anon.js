import { createClient } from "@supabase/supabase-js";

// Plain anon-key client with no cookie/session awareness. Safe to import
// from both Server Components and Client Components — it's what the public
// storefront (and the admin panel's *reads*) use, relying on the anon RLS
// policies + grants in supabase/migration.sql.
let client;

export function getAnonClient() {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return client;
}
