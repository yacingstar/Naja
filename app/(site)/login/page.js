import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-text">Log in</h1>
      <p className="mt-3 text-text-dim">
        Accounts aren&apos;t needed to shop — checkout works as a guest with
        cash on delivery. Customer accounts aren&apos;t wired up yet; this
        page is a placeholder.
      </p>

      <form className="mt-8 space-y-4 opacity-60">
        <div>
          <label className="mb-1 block font-heading text-sm font-semibold text-text">
            Email
          </label>
          <input
            disabled
            className="w-full rounded-2xl border border-line-strong bg-bg-soft px-4 py-3 text-text"
          />
        </div>
        <div>
          <label className="mb-1 block font-heading text-sm font-semibold text-text">
            Password
          </label>
          <input
            disabled
            type="password"
            className="w-full rounded-2xl border border-line-strong bg-bg-soft px-4 py-3 text-text"
          />
        </div>
      </form>

      <p className="mt-6 text-sm text-text-dim">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-glow-dim">
          Sign up
        </Link>
      </p>
    </div>
  );
}
