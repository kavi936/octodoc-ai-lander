"use client";

import { useMemo, useRef, useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Observer, gsap, registerGsap, useGsapContext } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const DEFAULT_SCHEMA = `{
  "vendor": "string",
  "invoice_id": "string",
  "total_usd": "number",
  "due_date": "date",
  "line_items": "array"
}`;

const EXTRACTED: Record<
  string,
  { value: string; confidence: number; note?: string }
> = {
  vendor: { value: "Meridian Supplies Co.", confidence: 0.97 },
  invoice_id: { value: "INV-2024-8841", confidence: 0.99 },
  total_usd: { value: "12,480.00", confidence: 0.94 },
  due_date: {
    value: "2024-11-15",
    confidence: 0.71,
    note: "Stamp partially occluded — mid confidence",
  },
  line_items: { value: "4 rows · table detected", confidence: 0.91 },
};

const PIPELINE = ["CAPTURE", "UNDERSTAND", "EXTRACT", "ACT"] as const;

export function DocumentDemo() {
  const [schema, setSchema] = useState(DEFAULT_SCHEMA);
  const [step, setStep] = useState(2);
  const scrubRef = useRef<HTMLDivElement>(null);

  const fields = useMemo(() => {
    try {
      const keys = Object.keys(JSON.parse(schema) as Record<string, string>);
      return keys.filter((k) => k in EXTRACTED);
    } catch {
      return Object.keys(EXTRACTED);
    }
  }, [schema]);

  const scope = useGsapContext((root) => {
    registerGsap();

    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(root.querySelectorAll("[data-doc-in]"), {
        y: 22,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "octoOut",
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    });

    const scrubber = scrubRef.current;
    if (scrubber) {
      Observer.create({
        target: scrubber,
        type: "touch,pointer",
        onChangeX(self) {
          if (Math.abs(self.deltaX) < 28) return;
          setStep((s) => {
            const next =
              self.deltaX > 0
                ? Math.min(PIPELINE.length - 1, s + 1)
                : Math.max(0, s - 1);
            return next;
          });
        },
        tolerance: 30,
      });
    }
  }, []);

  return (
    <section
      id="document-demo"
      ref={scope as React.RefObject<HTMLElement>}
      className="border-t border-hairline bg-paper"
    >
      <div className="section-pad measure py-20 md:py-28">
        <SectionEyebrow coord="03 / 11">DOCUMENT</SectionEyebrow>
        <div className="mb-10 max-w-2xl" data-doc-in>
          <h2 className="display text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[1.05]">
            From paper chaos to machine-ready truth.
          </h2>
          <p className="mt-4 text-body">
            A layout-aware extract playground. Edit the schema; fields highlight
            with confidence. One mid-confidence value is intentional — honest
            systems show uncertainty.
          </p>
        </div>

        <div
          ref={scrubRef}
          className="mb-8 flex gap-2 overflow-x-auto pb-2"
          data-pipeline-scrub
          data-doc-in
          role="listbox"
          aria-label="Document pipeline stage"
        >
          {PIPELINE.map((label, i) => (
            <button
              key={label}
              type="button"
              role="option"
              aria-selected={step === i}
              data-active={step === i}
              className="pipeline-step min-h-11 shrink-0 border border-hairline bg-surface px-4 text-left"
              onClick={() => setStep(i)}
            >
              <span className="step-label font-mono text-[0.7rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="ml-2 text-[0.875rem] font-medium text-ink">
                {label}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2" data-doc-in>
          <div className="border border-hairline bg-surface">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <p className="font-mono text-[0.75rem] text-muted">
                source · invoice_scan.pdf
              </p>
              <p className="font-mono text-[0.75rem] text-teal-700">
                page 1 / 2
              </p>
            </div>
            <div className="space-y-3 bg-paper-alt p-5 font-mono text-[0.8rem] leading-relaxed text-body">
              <p className="text-blot" aria-hidden="true">
                ▓▒░ MERIDIAN ░▒▓ SUPPLIES
              </p>
              <p>
                Invoice{" "}
                <mark className="source-hl px-0.5 text-ink">INV-2024-8841</mark>
              </p>
              <p>
                Bill to: Northwind Clinics
                <br />
                Total due:{" "}
                <mark className="source-hl px-0.5 text-ink">$12,480.00</mark>
              </p>
              <p>
                Due date:{" "}
                <mark className="bg-amber-100/80 px-0.5 text-ink">
                  15 Nov 2024
                </mark>{" "}
                <span className="text-muted">(stamp overlap)</span>
              </p>
              <p className="text-muted">
                Line items table · 4 rows detected ·{" "}
                {PIPELINE[step]} stage active
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="border border-hairline bg-surface">
              <span className="flex border-b border-hairline px-4 py-3 font-mono text-[0.75rem] text-muted">
                schema.json · editable
              </span>
              <textarea
                value={schema}
                onChange={(e) => setSchema(e.target.value)}
                rows={8}
                spellCheck={false}
                className="w-full resize-y bg-ink-deep px-4 py-3 font-mono text-[0.8rem] leading-relaxed text-[#e8eef1] outline-none"
              />
            </label>

            <ul className="border border-hairline bg-surface divide-y divide-hairline">
              {fields.map((key) => {
                const row = EXTRACTED[key];
                const mid = row.confidence < 0.85;
                return (
                  <li
                    key={key}
                    className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3"
                  >
                    <div>
                      <p className="font-mono text-[0.75rem] text-muted">
                        {key}
                      </p>
                      <p className="text-ink">{row.value}</p>
                      {row.note ? (
                        <p className="mt-1 text-[0.8rem] text-muted">
                          {row.note}
                        </p>
                      ) : null}
                    </div>
                    <p
                      className={cn(
                        "font-mono text-[0.8rem]",
                        mid ? "conf-mid" : "conf-high",
                      )}
                    >
                      {(row.confidence * 100).toFixed(0)}% conf
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
