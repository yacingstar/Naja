"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/supabase/admin-guard";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/utils";

async function uniqueProductId(supabase, name) {
  const base = slugify(name) || "lamp";
  const { data: existing } = await supabase
    .from("products")
    .select("id")
    .like("id", `${base}%`);

  const taken = new Set((existing ?? []).map((row) => row.id));
  if (!taken.has(base)) return base;

  let n = 2;
  while (taken.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}

async function uploadColorImage(supabase, productId, image) {
  if (!image || typeof image !== "object" || image.size === 0) return null;

  const extension = image.name.split(".").pop() || "jpg";
  const path = `${productId}/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(path, image, { contentType: image.type });

  if (uploadError) throw new Error(uploadError.message);

  return supabase.storage.from("product-images").getPublicUrl(path).data
    .publicUrl;
}

export async function createProduct(formData) {
  await requireAdminSession();
  const supabase = createAdminClient();

  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const price = Number(formData.get("price"));
  const category = formData.get("category")?.toString().trim() || null;

  if (!name || !description || !Number.isFinite(price)) {
    throw new Error("Name, description, and price are required.");
  }

  const id = await uniqueProductId(supabase, name);

  const { error } = await supabase
    .from("products")
    .insert({ id, name, description, price, category });

  if (error) throw new Error(error.message);

  const colorKeys = (formData.get("colorKeys")?.toString() || "")
    .split(",")
    .filter(Boolean);

  const colorRows = [];
  for (const key of colorKeys) {
    const colorName = formData.get(`color-${key}-name`)?.toString().trim();
    if (!colorName) continue;

    const hex = formData.get(`color-${key}-hex`)?.toString().trim();
    const inStock = formData.get(`color-${key}-inStock`) === "on";
    const image = formData.get(`color-${key}-image`);
    const imageUrl = await uploadColorImage(supabase, id, image);

    colorRows.push({
      product_id: id,
      color_name: colorName,
      hex,
      in_stock: inStock,
      image_url: imageUrl,
    });
  }

  if (colorRows.length > 0) {
    const { error: colorsError } = await supabase
      .from("product_colors")
      .insert(colorRows);
    if (colorsError) throw new Error(colorsError.message);
  }

  revalidatePath("/");
  revalidatePath(`/product/${id}`);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(formData) {
  await requireAdminSession();
  const supabase = createAdminClient();

  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const price = Number(formData.get("price"));
  const category = formData.get("category")?.toString().trim() || null;

  if (!id || !name || !description || !Number.isFinite(price)) {
    throw new Error("Name, description, and price are required.");
  }

  const { error } = await supabase
    .from("products")
    .update({ name, description, price, category })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath(`/product/${id}`);
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
}

export async function deleteProduct(formData) {
  await requireAdminSession();
  const supabase = createAdminClient();

  const id = formData.get("id")?.toString();
  if (!id) throw new Error("Missing product id.");

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function saveColor(formData) {
  await requireAdminSession();
  const supabase = createAdminClient();

  const id = formData.get("id")?.toString() || null;
  const productId = formData.get("productId")?.toString();
  const colorName = formData.get("colorName")?.toString().trim();
  const hex = formData.get("hex")?.toString().trim();
  const inStock = formData.get("inStock") === "on";
  const existingImageUrl = formData.get("existingImageUrl")?.toString() || null;
  const image = formData.get("image");

  if (!productId || !colorName || !hex) {
    throw new Error("Color name and hex are required.");
  }

  const imageUrl =
    (await uploadColorImage(supabase, productId, image)) ?? existingImageUrl;

  const payload = {
    product_id: productId,
    color_name: colorName,
    hex,
    in_stock: inStock,
    image_url: imageUrl,
  };

  const { error } = id
    ? await supabase.from("product_colors").update(payload).eq("id", id)
    : await supabase.from("product_colors").insert(payload);

  if (error) throw new Error(error.message);

  revalidatePath(`/admin/products/${productId}`);
  revalidatePath(`/product/${productId}`);
  revalidatePath("/");
}

export async function deleteColor(formData) {
  await requireAdminSession();
  const supabase = createAdminClient();

  const id = formData.get("id")?.toString();
  const productId = formData.get("productId")?.toString();
  if (!id || !productId) throw new Error("Missing color id.");

  const { error } = await supabase
    .from("product_colors")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath(`/admin/products/${productId}`);
  revalidatePath(`/product/${productId}`);
  revalidatePath("/");
}
