// Buket bunga sudut kartu — SVG inline, tanpa gambar.
export default function Bouquet({ className = "h-20 w-20", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} ${flip ? "-scale-x-100" : ""}`}
      aria-hidden
      fill="none"
    >
      <path d="M50 95 C48 70 46 55 30 40 M50 95 C52 70 54 55 70 40 M50 95 L50 60" stroke="#6F8F6A" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="32" cy="52" rx="10" ry="6" fill="#A8C3A0" transform="rotate(-30 32 52)" />
      <ellipse cx="68" cy="52" rx="10" ry="6" fill="#A8C3A0" transform="rotate(30 68 52)" />
      <ellipse cx="50" cy="66" rx="10" ry="6" fill="#A8C3A0" />
      {[
        { cx: 30, cy: 32, f: "#F6C9D4" },
        { cx: 70, cy: 32, f: "#DCCBF2" },
        { cx: 50, cy: 22, f: "#E9B44C" },
      ].map((b) => (
        <g key={b.cx}>
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse
              key={r}
              cx={b.cx}
              cy={b.cy - 9}
              rx="5"
              ry="8"
              transform={`rotate(${r} ${b.cx} ${b.cy})`}
              fill={b.f}
              stroke="#5B4A42"
              strokeWidth="1.2"
            />
          ))}
          <circle cx={b.cx} cy={b.cy} r="4.5" fill="#E9B44C" stroke="#5B4A42" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
}
