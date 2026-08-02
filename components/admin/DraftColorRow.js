"use client";

import { useState } from "react";
import PlaceholderImage from "@/components/site/PlaceholderImage";

export default function DraftColorRow({ rowKey, onRemove }) {
  const [preview, setPreview] = useState(null);

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

      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
        <div className="flex-1 min-w-[140px]">
          <label className="mb-1 block text-xs font-heading font-semibold text-text-dim">
            Color name
          </label>
          <input
            name={`color-${rowKey}-name`}
            className="w-full rounded-xl border border-line-strong bg-bg-soft px-3 py-2 text-sm text-text outline-none focus:border-glow"
          />
        </div>

        <div className="w-24">
          <label className="mb-1 block text-xs font-heading font-semibold text-text-dim">
            Hex
          </label>
          <input
            type="color"
            name={`color-${rowKey}-hex`}
            defaultValue="#ff8fb1"
            className="h-9 w-9 shrink-0 cursor-pointer rounded-lg border border-line-strong bg-bg-soft p-1"
          />
        </div>

        <div className="w-36">
          <label className="mb-1 block text-xs font-heading font-semibold text-text-dim">
            Photo
          </label>
          <input
            type="file"
            name={`color-${rowKey}-image`}
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-xs text-text-dim file:mr-2 file:rounded-full file:border-0 file:bg-surface file:px-3 file:py-1.5 file:font-heading file:text-xs file:font-semibold file:text-text"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            name={`color-${rowKey}-inStock`}
            defaultChecked
            className="h-4 w-4 rounded border-line-strong accent-[#ff8fb1]"
          />
          In stock
        </label>
      </div>

      <button
        type="button"
        onClick={() => onRemove(rowKey)}
        className="font-heading text-sm font-semibold text-text-dim transition hover:text-danger"
      >
        Remove
      </button>
    </div>
  );
}
