import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl font-bold text-text">
        New product
      </h1>

      <form action={createProduct} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block font-heading text-sm font-semibold text-text"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-2xl border border-line-strong bg-bg-soft px-4 py-3 text-text outline-none focus:border-glow"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block font-heading text-sm font-semibold text-text"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="w-full rounded-2xl border border-line-strong bg-bg-soft px-4 py-3 text-text outline-none focus:border-glow"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="mb-1 block font-heading text-sm font-semibold text-text"
          >
            Price (DA)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="1"
            required
            className="w-full rounded-2xl border border-line-strong bg-bg-soft px-4 py-3 text-text outline-none focus:border-glow"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-1 block font-heading text-sm font-semibold text-text"
          >
            Category (shape) — optional
          </label>
          <input
            id="category"
            name="category"
            placeholder="e.g. Moon, Cloud, Mushroom"
            className="w-full rounded-2xl border border-line-strong bg-bg-soft px-4 py-3 text-text outline-none focus:border-glow"
          />
          <p className="mt-1 text-xs text-text-dim">
            Products sharing a category show up together in the &quot;Shop by
            Shape&quot; row on the homepage.
          </p>
        </div>

        <button
          type="submit"
          className="rounded-full bg-glow px-6 py-3 font-heading font-semibold text-white transition hover:-translate-y-0.5 hover:bg-glow-dim"
        >
          Create product
        </button>
      </form>
    </div>
  );
}
