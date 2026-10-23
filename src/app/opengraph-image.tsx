import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";

export const runtime = "edge";
export const alt = `${siteConfig.domain} — premium .ai domain`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#F7FAFB",
          color: "#0B1F2A",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#0F5F73",
            fontSize: 22,
            letterSpacing: 2,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              border: "2px solid #0E7490",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ◈
          </div>
          [ THE DOMAIN ]
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {siteConfig.domain}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#3A4F5A",
              maxWidth: 820,
              lineHeight: 1.25,
            }}
          >
            Many arms. One truth. Document intelligence or clinical co-pilot —
            acquire safely via escrow.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#5E7380",
            fontSize: 20,
          }}
        >
          <span>Structure from chaos · Care from context</span>
          <span style={{ color: "#0F5F73" }}>escrow-ready</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
