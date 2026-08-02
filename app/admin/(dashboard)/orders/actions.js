"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/supabase/admin-guard";
import { createAdminClient } from "@/lib/supabase/admin";

const VALID_STATUSES = ["pending", "called", "shipped", "delivered"];

export async function updateOrderStatus(formData) {
  await requireAdminSession();
  const supabase = createAdminClient();

  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString();

  if (!id || !VALID_STATUSES.includes(status)) {
    throw new Error("Invalid order status update.");
  }

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/orders");
}
