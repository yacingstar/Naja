import Button from "@/components/ui/Button";

// TODO(shop owner): replace the phone number/social links below with the
// real ones before launch. A contact form isn't wired up (no email service
// connected) — the fastest reliable path is still a phone call, same as the
// order-confirmation call after checkout.
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <span className="inline-block rounded-full bg-mint px-3 py-1 text-xs font-heading font-bold text-[#1f7a5c]">
        say hello
      </span>
      <h1 className="mt-2 font-heading text-3xl font-bold text-text">
        Contact us
      </h1>
      <p className="mt-3 text-text-dim">
        Questions about an order or a custom lamp idea? Give us a call — the
        fastest way to reach us.
      </p>

      <div className="mt-8 rounded-card bg-surface p-5">
        <p className="font-heading font-bold text-text">Phone</p>
        <p className="mt-1 text-text-dim">+213 XX XXX XXXX</p>
      </div>

      <div className="mt-6">
        <Button href="/">Browse the shop</Button>
      </div>
    </div>
  );
}
