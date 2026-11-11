import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "radial-gradient(circle at 15% 10%, #3b3f7a 0%, #1b1b1f 45%), #1b1b1f",
          color: "#dfdfd6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>
          DB<span style={{ color: "#a8b1ff" }}>Modeling</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 40, fontSize: 76, fontWeight: 800, lineHeight: 1.1 }}>
          <span>Design databases</span>
          <span style={{ color: "#a8b1ff" }}>that scale.</span>
        </div>
        <div style={{ marginTop: 32, fontSize: 30, color: "#98989f" }}>
          Relationships · Schema patterns · Indexing · Validation — SQL & MongoDB
        </div>
      </div>
    ),
    size,
  );
}
