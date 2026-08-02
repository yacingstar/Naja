import { createBrowserClient } from "@supabase/ssr";

// Session-aware browser client, used only by the admin login form to sign
// in (this writes the auth cookies @supabase/ssr's server client and
// proxy.js then read).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
