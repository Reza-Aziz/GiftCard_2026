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
          background: "#FFF9F1",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#fff",
            border: "6px solid #4A3730",
            borderRadius: 32,
            boxShadow: "12px 12px 0 #4A3730",
            padding: "60px 90px",
          }}
        >
          <div style={{ fontSize: 28, letterSpacing: 8, color: "#C99B3F", fontWeight: 700 }}>
            HAPPY 21ST
          </div>
          <div style={{ fontSize: 84, fontWeight: 900, color: "#4A3730", marginTop: 8 }}>{herName}</div>
          <div style={{ fontSize: 32, color: "#C8A2E8", marginTop: 12, fontWeight: 700 }}>
            a little universe for you ♥
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
