import "server-only";
import { createClient } from "@supabase/supabase-js";

// service_role client — full read/write access, bypasses RLS. Only ever
// call this from inside a Server Action, and only after verifying a valid
// admin session with requireAdminSession() (lib/supabase/admin-guard.js).
// The `server-only` import makes any accidental client-component import of
// this file fail at build time instead of leaking the key to the browser.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
