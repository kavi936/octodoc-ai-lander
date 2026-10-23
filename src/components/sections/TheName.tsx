"use client";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/site.config";
import { gsap, registerGsap, useGsapContext } from "@/lib/gsap";

export function TheName() {
  const scope = useGsapContext((root) => {
    registerGsap();
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(root.querySelectorAll("[data-name-reveal]"), {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.07,
        ease: "octoOut",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
        },
      });
    });
  }, []);

  return (
    <section
      id="the-name"
      ref={scope as React.RefObject<HTMLElement>}
      className="border-t border-hairline bg-paper"
    >
      <div className="section-pad measure py-20 md:py-28">
        <SectionEyebrow coord="01 / 11">THE NAME</SectionEyebrow>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <h2
            data-name-reveal
            className="display md:col-span-5 text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.05]"
          >
            Why {siteConfig.domain} works.
          </h2>
          <div className="md:col-span-7 space-y-6 text-[1.05rem] leading-relaxed text-body">
            <p data-name-reveal>
              <span className="font-medium text-ink">Octo</span> signals
              multi-arm capability — many coordinated agents reaching into messy
              information at once.{" "}
              <span className="font-medium text-ink">Doc</span> holds a useful
              double meaning: documents and doctor. The compound is short,
              speakable, and category-clear without locking you into one product
              line.
            </p>
            <p data-name-reveal>
              The <span className="font-mono text-ink">.ai</span> TLD is a
              category signal for machine intelligence. Pair it with a memorable
              stem and you get a name that can carry either a document system or
              a clinical co-pilot — or the infrastructure between them.
            </p>
            <p data-name-reveal className="text-muted text-[0.95rem]">
              This page presents a product vision canvas for what could be built
              here. It is not a claim of an existing product, customer base, or
              affiliation with any other Octodoc brand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
