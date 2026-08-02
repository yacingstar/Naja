"use client";

import { useState } from "react";
import { saveColor, deleteColor } from "@/app/admin/(dashboard)/products/actions";
import SaveButton from "./SaveButton";
import PlaceholderImage from "@/components/site/PlaceholderImage";

export default function ColorRow({ productId, color }) {
  const isNew = !color;
  const [preview, setPreview] = useState(color?.image_url ?? null);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-bg p-4 sm:flex-row sm:items-end">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line bg-surface">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-full w-full object-cover" />
        ) : (
          <PlaceholderImage className="h-full w-full" />
        )}
      </div>

      <form action={saveColor} className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
        <input type="hidden" name="productId" value={productId} />
        {color && <input type="hidden" name="id" value={color.id} />}
        {color && (
          <input
            type="hidden"
            name="existingImageUrl"
            value={color.image_url ?? ""}
          />
        )}

        <div className="flex-1 min-w-[140px]">
          <label className="mb-1 block text-xs font-heading font-semibold text-text-dim">
            Color name
          </label>
          <input
            name="colorName"
            defaultValue={color?.color_name ?? ""}
            required
            className="w-full rounded-xl border border-line-strong bg-bg-soft px-3 py-2 text-sm text-text outline-none focus:border-glow"
          />
        </div>

        <div className="w-24">
          <label className="mb-1 block text-xs font-heading font-semibold text-text-dim">
            Hex
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              name="hex"
              defaultValue={color?.hex ?? "#ffb84d"}
              className="h-9 w-9 shrink-0 cursor-pointer rounded-lg border border-line-strong bg-bg-soft p-1"
            />
          </div>
        </div>

        <div className="w-36">
          <label className="mb-1 block text-xs font-heading font-semibold text-text-dim">
            Photo
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-xs text-text-dim file:mr-2 file:rounded-full file:border-0 file:bg-surface file:px-3 file:py-1.5 file:font-heading file:text-xs file:font-semibold file:text-text"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            name="inStock"
            defaultChecked={color?.in_stock ?? true}
            className="h-4 w-4 rounded border-line-strong accent-[#ffb84d]"
          />
          In stock
        </label>

        <SaveButton>{isNew ? "Add color" : "Save"}</SaveButton>
      </form>

      {color && (
        <form action={deleteColor}>
          <input type="hidden" name="id" value={color.id} />
          <input type="hidden" name="productId" value={productId} />
          <SaveButton variant="danger" pendingLabel="Deleting…">
            Delete
          </SaveButton>
        </form>
      )}
    </div>
  );
}
