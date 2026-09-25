import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Talaat Ramadan — Software Engineer for Hire";
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
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#09090b",
          color: "#fafafa",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 32, color: "#22c55e", fontWeight: "bold" }}>
          ixtalaat.dev
        </div>
        <div style={{ fontSize: 72, fontWeight: "bold", marginTop: 16, lineHeight: 1.1 }}>
          Talaat Ramadan
        </div>
        <div style={{ fontSize: 36, color: "#a1a1aa", marginTop: 8 }}>
          Software Engineer — booking systems, stores & dashboards that win customers.
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 32, fontSize: 28, color: "#d4d4d8" }}>
          <span>ASP.NET Core</span>
          <span>•</span>
          <span>Laravel</span>
          <span>•</span>
          <span>Node.js</span>
          <span>•</span>
          <span>Angular</span>
          <span>•</span>
          <span>Next.js</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
