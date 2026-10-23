"use client";

import { useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { gsap, registerGsap, useGsapContext } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const MESSAGES = [
  {
    role: "physician" as const,
    text: "Summarize overnight labs and flag anything that changes the plan. Cite sources.",
  },
  {
    role: "assistant" as const,
    text: "Troponin I rose from 0.02 → 0.18 ng/mL overnight. Combined with ongoing chest pressure, this supports prioritizing an ACS pathway pending your review.",
    citeId: "src-1",
  },
  {
    role: "assistant" as const,
    text: "Draft assessment language is ready. No autonomous order recommendations — awaiting physician confirmation.",
    citeId: "src-2",
  },
];

const SOURCES = [
  {
    id: "src-1",
    label: "Chart · Labs 04:12",
    passage:
      "Troponin I 0.18 ng/mL (prior 0.02). ECG: nonspecific ST changes. Patient reports intermittent pressure.",
  },
  {
    id: "src-2",
    label: "Guideline · AHA/ACC 2021 §4.2",
    passage:
      "In patients with suspected ACS and rising troponin, early risk stratification and cardiology consultation are recommended.",
  },
];

export function ClinicalDemo() {
  const [activeCite, setActiveCite] = useState("src-1");

  const scope = useGsapContext((root) => {
    registerGsap();
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(root.querySelectorAll("[data-clin-in]"), {
        y: 22,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "octoOut",
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    });
  }, []);

  return (
    <section
      id="clinical-demo"
      ref={scope as React.RefObject<HTMLElement>}
      className="border-t border-hairline bg-paper-alt"
    >
      <div className="section-pad measure py-20 md:py-28">
        <SectionEyebrow coord="04 / 11">CLINICAL</SectionEyebrow>
        <div className="mb-10 max-w-2xl" data-clin-in>
          <h2 className="display text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[1.05]">
            An AI that reads the chart before you do.
          </h2>
          <p className="mt-4 text-body">
            Cite-first assistant mock: every claim lights a source passage.
            Physician stays in the loop — the system drafts and verifies; you
            decide.
          </p>
          <p className="mt-3 text-[0.875rem] text-muted">
            Assistive only. Not a medical device claim. Does not diagnose,
            prescribe, or replace clinical judgment.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2" data-clin-in>
          <div className="flex min-h-[22rem] flex-col border border-hairline bg-surface">
            <div className="border-b border-hairline px-4 py-3">
              <p className="font-mono text-[0.75rem] text-muted">
                co-pilot · encounter #A-2041 · supervised
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              {MESSAGES.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[92%] rounded-sm px-3 py-2 text-[0.9375rem]",
                    m.role === "physician"
                      ? "self-end bg-surface-sunk text-ink"
                      : "self-start border border-hairline bg-paper text-body",
                  )}
                >
                  <p>{m.text}</p>
                  {m.citeId ? (
                    <button
                      type="button"
                      className="mt-2 font-mono text-[0.7rem] text-teal-700 underline-offset-2 hover:underline"
                      onClick={() => setActiveCite(m.citeId!)}
                    >
                      [{m.citeId}] view source
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="border-t border-hairline px-4 py-3 text-[0.8rem] text-muted">
              Human approval required before any note is committed to the chart.
            </div>
          </div>

          <div className="border border-hairline bg-surface">
            <div className="border-b border-hairline px-4 py-3">
              <p className="font-mono text-[0.75rem] text-muted">
                sources · cite-first
              </p>
            </div>
            <ul className="divide-y divide-hairline">
              {SOURCES.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={cn(
                      "w-full px-4 py-4 text-left transition-colors",
                      activeCite === s.id
                        ? "bg-teal-050"
                        : "hover:bg-paper-alt",
                    )}
                    onClick={() => setActiveCite(s.id)}
                    aria-pressed={activeCite === s.id}
                  >
                    <p className="font-mono text-[0.75rem] text-teal-700">
                      {s.id} · {s.label}
                    </p>
                    <p
                      className={cn(
                        "mt-2 text-[0.95rem] leading-relaxed text-body",
                        activeCite === s.id && "source-hl",
                      )}
                    >
                      {s.passage}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
