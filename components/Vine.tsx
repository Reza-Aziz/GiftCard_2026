import Flower from "./Flower";

// Divider tangkai bunga memanjang.
export default function Vine() {
  return (
    <div className="flex items-center gap-2 py-1" aria-hidden>
      <span className="h-px flex-1 bg-cocoa/25" />
      <svg viewBox="0 0 60 12" className="h-3 w-14" fill="none">
        <path d="M0 6 H24 M36 6 H60" stroke="#6F8F6A" strokeWidth="1.5" />
        <ellipse cx="18" cy="4" rx="4" ry="2.2" fill="#A8C3A0" />
        <ellipse cx="42" cy="8" rx="4" ry="2.2" fill="#A8C3A0" />
      </svg>
      <Flower className="h-6 w-6" />
      <svg viewBox="0 0 60 12" className="h-3 w-14 -scale-x-100" fill="none">
        <path d="M0 6 H24 M36 6 H60" stroke="#6F8F6A" strokeWidth="1.5" />
        <ellipse cx="18" cy="4" rx="4" ry="2.2" fill="#A8C3A0" />
        <ellipse cx="42" cy="8" rx="4" ry="2.2" fill="#A8C3A0" />
      </svg>
      <span className="h-px flex-1 bg-cocoa/25" />
    </div>
  );
}
