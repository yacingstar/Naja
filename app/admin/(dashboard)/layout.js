import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/admin/Sidebar";

// Second safety net behind proxy.js: re-check the session here too, so a
// stale/edge-cached response can never render an admin page unauthenticated.
export default async function DashboardLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-full flex-1 flex-col sm:flex-row">
      <Sidebar />
      <main className="flex-1 bg-bg p-5 sm:p-8">{children}</main>
    </div>
  );
}
