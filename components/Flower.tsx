export default function Flower({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <ellipse
          key={r}
          cx="24"
          cy="12"
          rx="7"
          ry="10"
          transform={`rotate(${r} 24 24)`}
          fill="#F6C9D4"
          stroke="#5B4A42"
          strokeWidth="1.5"
          opacity="0.9"
        />
      ))}
      <circle cx="24" cy="24" r="6" fill="#E9B44C" stroke="#5B4A42" strokeWidth="1.5" />
    </svg>
  );
}
