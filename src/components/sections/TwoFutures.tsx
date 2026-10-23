"use client";

import { useCallback, useRef, useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { siteConfig, type FutureMode } from "@/site.config";
import { blotResolve } from "@/lib/blotResolve";
import { Flip, gsap, registerGsap, useGsapContext } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const DOC = {
  eyebrow: "DOCUMENT",
  headline: "Eight arms. One document system.",
  support:
    "Ingest unstructured files, understand layout and handwriting, extract validated JSON, then act — search, cite, trigger workflows.",
  stages: [
    {
      id: "CAPTURE",
      body: "Drag-drop and connectors → page-aware ingest for PDFs, scans, and mixed packs.",
    },
    {
      id: "UNDERSTAND",
      body: "Layout, tables, stamps, and handwriting resolve into structured meaning.",
    },
    {
      id: "EXTRACT",
      body: "Schema-on-demand → validated JSON with per-field confidence.",
    },
    {
      id: "ACT",
      body: "Search, cite passages, export to tools, or fire downstream workflows.",
    },
  ],
  buyers:
    "Conceptual fit: legal ops, healthcare admin, finance/AP, research teams, and AI products that need RAG over real documents.",
  demoTitle: "schema.extract",
  demoBody: `{
  "party": "Northwind Health LLC",
  "effective": "2024-09-01",
  "term_months": 36,
  "governing_law": "Delaware",
  "auto_renew": true
}`,
};

const CLINICAL = {
  eyebrow: "CLINICAL",
  headline: "Clinical reasoning you can audit.",
  support:
    "An agentic clinical co-pilot that reads charts and labs, drafts notes, and surfaces differentials with citations — always assistive, never a replacement for the physician.",
  stages: [
    {
      id: "INTAKE",
      body: "Symptoms, history, and attached records → a structured encounter.",
    },
    {
      id: "REASON",
      body: "Multi-step clinical reasoning with tool use across labs and guidelines.",
    },
    {
      id: "DRAFT",
      body: "SOAP notes, referral letters, and patient summaries ready for review.",
    },
    {
      id: "VERIFY",
      body: "Every claim linked to a source passage or guideline section.",
    },
  ],
  buyers:
    "Assistive only. Human-supervised. Citation-backed. Designed for physician-in-the-loop workflows — not autonomous diagnosis.",
  demoTitle: "encounter.verify",
  demoBody: `{
  "draft": "SOAP · Assessment",
  "claim": "Consider ACS workup",
  "citation": "AHA/ACC 2021 §4.2",
  "status": "awaiting physician"
}`,
};

export function TwoFutures() {
  const [mode, setMode] = useState<FutureMode>(siteConfig.defaultFuture);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineEl = useRef<HTMLHeadingElement>(null);
  const switching = useRef(false);

  const data = mode === "document" ? DOC : CLINICAL;

  const scope = useGsapContext((root) => {
    registerGsap();
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(root.querySelectorAll("[data-tf-in]"), {
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.06,
        ease: "octoOut",
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    });
  }, []);

  const switchMode = useCallback(
    async (next: FutureMode) => {
      if (next === mode || switching.current) return;
      switching.current = true;
      registerGsap();
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const panel = panelRef.current;
      const state = panel ? Flip.getState(panel.querySelectorAll("[data-flip]")) : null;

      setMode(next);

      // wait a tick for React paint
      requestAnimationFrame(async () => {
        const nextData = next === "document" ? DOC : CLINICAL;
        if (headlineEl.current) {
          await blotResolve(headlineEl.current, nextData.headline, {
            duration: reduced ? 0 : 0.7,
            reducedMotion: reduced,
          });
        }
        if (state && panel && !reduced) {
          Flip.from(state, {
            duration: 0.65,
            ease: "octoOut",
            absolute: false,
            nested: true,
            onComplete: () => {
              switching.current = false;
            },
          });
        } else {
          switching.current = false;
        }
      });
    },
    [mode],
  );

  return (
    <section
      id="two-futures"
      ref={scope as React.RefObject<HTMLElement>}
      className="border-t border-hairline bg-paper-alt"
    >
      <div className="section-pad measure py-20 md:py-28">
        <SectionEyebrow coord="02 / 11">TWO FUTURES</SectionEyebrow>
        <div className="mb-10 max-w-3xl" data-tf-in>
          <h2 className="display text-[clamp(2rem,3.8vw,3.5rem)] leading-[1.05]">
            Same name. Two credible product theses.
          </h2>
          <p className="mt-4 text-body">
            Toggle the future. Shared chrome, different story — document
            intelligence or agentic clinical assistance. Either path can live on{" "}
            <span className="domain-mark text-ink">{siteConfig.domain}</span>.
          </p>
        </div>

        <div
          className="mb-8 inline-flex rounded-sm border border-hairline bg-surface p-1"
          role="tablist"
          aria-label="Product future"
          data-tf-in
        >
          {(
            [
              { id: "document", label: "Document Intelligence" },
              { id: "clinical", label: "Agentic Doctor AI" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={mode === t.id}
              className={cn(
                "min-h-11 rounded-sm px-4 text-[0.875rem] font-medium transition-colors",
                mode === t.id
                  ? "bg-teal-700 text-white"
                  : "text-body hover:text-ink",
              )}
              onClick={() => switchMode(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          ref={panelRef}
          className="grid gap-8 border border-hairline bg-surface p-6 md:grid-cols-12 md:gap-10 md:p-10"
          data-tf-in
        >
          <div className="md:col-span-5">
            <p className="eyebrow mb-4" data-flip>
              [ {data.eyebrow} ]
            </p>
            <h3
              ref={headlineEl}
              className="display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.1]"
              data-flip
            >
              {data.headline}
            </h3>
            <p className="mt-4 text-body" data-flip>
              {data.support}
            </p>
            <p className="mt-6 text-[0.9rem] text-muted" data-flip>
              {data.buyers}
            </p>
          </div>

          <div className="md:col-span-7">
            <ol className="grid gap-3 sm:grid-cols-2" data-flip>
              {data.stages.map((s, i) => (
                <li
                  key={s.id}
                  className="border border-hairline bg-paper p-4"
                >
                  <p className="font-mono text-[0.75rem] text-teal-700">
                    {String(i + 1).padStart(2, "0")} · {s.id}
                  </p>
                  <p className="mt-2 text-[0.95rem] text-body">{s.body}</p>
                </li>
              ))}
            </ol>

            <div
              className="mt-5 overflow-hidden border border-hairline bg-ink-deep p-4 font-mono text-[0.78rem] leading-relaxed text-[#c5d4dc]"
              data-flip
            >
              <p className="mb-3 text-teal-400">{data.demoTitle}</p>
              <pre className="overflow-x-auto whitespace-pre text-[#e8eef1]">
                {data.demoBody}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
