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
          fill="#F9C5D5"
          stroke="#4A3730"
          strokeWidth="1.5"
          opacity="0.9"
        />
      ))}
      <circle cx="24" cy="24" r="6" fill="#C99B3F" stroke="#4A3730" strokeWidth="1.5" />
    </svg>
  );
}
