import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const ARMS = [
  "M 32 22 Q 36.97 14.7 32 6",
  "M 39.07 24.93 Q 47.75 23.29 50.38 13.62",
  "M 42 32 Q 49.3 36.97 58 32",
  "M 39.07 39.07 Q 40.71 47.75 50.38 50.38",
  "M 32 42 Q 27.03 49.3 32 58",
  "M 24.93 39.07 Q 16.25 40.71 13.62 50.38",
  "M 22 32 Q 14.7 27.03 6 32",
  "M 24.93 24.93 Q 23.29 16.25 13.62 13.62",
];

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7FAFB",
        }}
      >
        <svg width="52" height="52" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="5.5" fill="#0F5F73" />
          {ARMS.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="#0F5F73"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>
    ),
    { ...size },
  );
}
