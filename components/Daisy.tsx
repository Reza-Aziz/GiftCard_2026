// Daisy chapter badge: little illustrated flower + chapter word.
// One cohesive doodle set with the meadow + bouquets.
export default function Daisy({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
      <path d="M24 30 C 24 36 24 40 24 44" stroke="#6F8F6A" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="17" cy="38" rx="6" ry="3.4" fill="#A8C3A0" transform="rotate(-25 17 38)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
        <ellipse
          key={r}
          cx="24"
          cy="13"
          rx="5"
          ry="8.5"
          transform={`rotate(${r} 24 24)`}
          fill="#FBE9EE"
          stroke="#5B4A42"
          strokeWidth="1.8"
        />
      ))}
      <circle cx="24" cy="24" r="6.5" fill="#E9B44C" stroke="#5B4A42" strokeWidth="1.8" />
      <circle cx="22" cy="22" r="1.4" fill="#5B4A42" />
      <circle cx="26" cy="22" r="1.4" fill="#5B4A42" />
      <path d="M22 26 Q24 28 26 26" stroke="#5B4A42" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
