"use client";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/site.config";
import { gsap, registerGsap, useGsapContext } from "@/lib/gsap";

const POINTS = [
  {
    title: "Short, speakable .ai",
    body: "Memorable stems on the .ai TLD are scarce. octodoc.ai is compact enough to say once and remember — without invented valuation theater.",
  },
  {
    title: "Compound clarity",
    body: "Octo + Doc reads as capability plus subject. It works in conversation, in a browser bar, and on a product mark.",
  },
  {
    title: "Ambiguity as a feature",
    body: "Documents and doctor share the same stem. Category ambiguity lets a founder choose — or bridge — without renaming later.",
  },
  {
    title: "Brand spine already clear",
    body: "Many coordinated arms resolving messy human information into structure you can trust. That metaphor fits both futures.",
  },
];

export function WhyThisDomain() {
  const scope = useGsapContext((root) => {
    registerGsap();
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(root.querySelectorAll("[data-why-in]"), {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "octoOut",
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    });
  }, []);

  return (
    <section
      id="why-domain"
      ref={scope as React.RefObject<HTMLElement>}
      className="border-t border-hairline bg-paper"
    >
      <div className="section-pad measure py-20 md:py-28">
        <SectionEyebrow coord="05 / 11">WHY THIS DOMAIN</SectionEyebrow>
        <h2
          className="display mb-10 max-w-3xl text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[1.05]"
          data-why-in
        >
          Honest reasons {siteConfig.domain} is worth caring about.
        </h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {POINTS.map((p) => (
            <article key={p.title} className="border-t border-hairline pt-5" data-why-in>
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-body">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
