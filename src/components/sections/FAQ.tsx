"use client";

import { useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/cn";

type Item = { q: string; a: string };

function buildFaq(): Item[] {
  const items: Item[] = [
    {
      q: "Can I buy this domain?",
      a: `${siteConfig.domain} may be available for purchase or transfer. Use the contact form or email ${siteConfig.contactEmail} with your intended use. Serious inquiries are welcome.`,
    },
    {
      q: "Do you use escrow?",
      a: "Yes. Preferred settlement is reputable escrow only — Escrow.com is the default path. Never wire the seller directly; never transfer before escrow shows funds.",
    },
    {
      q: "Is OctoDoc a live product or a vision?",
      a: "This site is a product vision canvas for what could be built on the name — document intelligence and/or an agentic clinical co-pilot. It does not claim a live customer product, benchmarks, or trademarks beyond the domain itself.",
    },
    {
      q: "Are you affiliated with octodoc.ro?",
      a: siteConfig.disclaimer,
    },
    {
      q: 'Document vs clinical — which is "the" product?',
      a: "Neither is locked in. Both futures are presented with equal craft because the name can carry either. A buyer or founder chooses the path — or bridges them under one brand spine: structure from messy human information.",
    },
  ];

  if (siteConfig.enableLTO) {
    items.push({
      q: "Can I lease-to-own / use a payment plan?",
      a: "Lease-to-own or staged payment may be available for qualified buyers. Mention it in your inquiry and we will discuss terms.",
    });
  }

  return items;
}

export function FAQ() {
  const items = buildFaq();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-hairline bg-paper-alt">
      <div className="section-pad measure py-20 md:py-28">
        <SectionEyebrow coord="08 / 11">FAQ</SectionEyebrow>
        <h2 className="display mb-10 max-w-2xl text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[1.05]">
          Straight answers for founders and buyers.
        </h2>
        <ul className="divide-y divide-hairline border-y border-hairline">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  className="flex w-full min-h-14 items-start justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-[1.05rem] font-medium tracking-tight text-ink">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "mt-1 font-mono text-sm text-teal-700 transition-transform",
                      isOpen && "rotate-45",
                    )}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen ? (
                  <p className="pb-5 max-w-3xl text-body">{item.a}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
