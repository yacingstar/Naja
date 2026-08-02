"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError("Incorrect email or password.");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-bg px-4 py-16">
      <div className="w-full max-w-sm rounded-[24px] border border-line bg-bg-soft p-8 shadow-sm">
        <p className="font-accent text-2xl text-glow-dim">Naja</p>
        <h1 className="mt-1 font-heading text-2xl font-bold text-text">
          Admin login
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block font-heading text-sm font-semibold text-text"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-line-strong bg-bg px-4 py-3 text-text outline-none focus:border-glow"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block font-heading text-sm font-semibold text-text"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-line-strong bg-bg px-4 py-3 text-text outline-none focus:border-glow"
            />
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-glow px-6 py-3 font-heading font-semibold text-white transition hover:-translate-y-0.5 hover:bg-glow-dim disabled:opacity-50"
          >
            {isSubmitting ? "Logging in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
