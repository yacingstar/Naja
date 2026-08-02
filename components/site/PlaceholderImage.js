export default function PlaceholderImage({ className = "" }) {
  return (
    <div
      className={`flex items-center justify-center bg-surface text-glow-dim ${className}`}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="h-1/3 w-1/3"
        aria-hidden="true"
      >
        <path
          d="M32 6c-8 0-14 6-14 14 0 6 3 9 6 12v6h16v-6c3-3 6-6 6-12 0-8-6-14-14-14Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M26 44h12M28 50h8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M32 52v6M24 58h16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
