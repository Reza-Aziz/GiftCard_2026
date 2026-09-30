import { ImageResponse } from "next/og";
import { herName } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG image: pretty link preview when the URL is shared in chat.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFF9F0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#fff",
            border: "4px solid #5B4A42",
            borderRadius: 28,
            boxShadow: "0 18px 40px -24px #5B4A42",
            padding: "60px 90px",
          }}
        >
          <div style={{ fontSize: 28, letterSpacing: 8, color: "#C08A3E", fontWeight: 700 }}>
            HAPPY 21ST
          </div>
          <div style={{ fontSize: 84, fontWeight: 900, color: "#5B4A42", marginTop: 8 }}>{herName}</div>
          <div style={{ fontSize: 32, color: "#D96C8A", marginTop: 12, fontWeight: 700 }}>
            a little universe for you ♥
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
