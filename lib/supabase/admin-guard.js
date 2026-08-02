import "server-only";
import { createClient } from "@/lib/supabase/server";

// Every admin write Server Action calls this first. It re-verifies the
// session server-side (never trusts the client) before the action is
// allowed to reach for the service_role client.
export async function requireAdminSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  return user;
}
