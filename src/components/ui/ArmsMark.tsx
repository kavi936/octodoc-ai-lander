import { cn } from "@/lib/cn";

type ArmsMarkProps = {
  className?: string;
  title?: string;
  decorative?: boolean;
};

/** Precomputed so SSR/CSR path `d` strings match (no Math.cos drift). */
const ARMS = [
  "M 32 22 Q 36.97 14.7 32 6",
  "M 39.07 24.93 Q 47.75 23.29 50.38 13.62",
  "M 42 32 Q 49.3 36.97 58 32",
  "M 39.07 39.07 Q 40.71 47.75 50.38 50.38",
  "M 32 42 Q 27.03 49.3 32 58",
  "M 24.93 39.07 Q 16.25 40.71 13.62 50.38",
  "M 22 32 Q 14.7 27.03 6 32",
  "M 24.93 24.93 Q 23.29 16.25 13.62 13.62",
] as const;

/** Abstract eight-arm radial mark — favicon, gutters, loaders. Not a cartoon. */
export function ArmsMark({
  className,
  title = "OctoDoc mark",
  decorative = true,
}: ArmsMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("text-teal-700", className)}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
    >
      {!decorative ? <title>{title}</title> : null}
      <circle cx="32" cy="32" r="5.5" fill="currentColor" />
      {ARMS.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
