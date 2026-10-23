import { cn } from "@/lib/cn";

type SectionEyebrowProps = {
  children: string;
  className?: string;
  coord?: string;
};

export function SectionEyebrow({
  children,
  className,
  coord,
}: SectionEyebrowProps) {
  return (
    <div
      className={cn(
        "eyebrow mb-5 flex flex-wrap items-center gap-3",
        className,
      )}
    >
      <span>[{children}]</span>
      {coord ? (
        <span className="text-blot" aria-hidden="true">
          {coord}
        </span>
      ) : null}
    </div>
  );
}
