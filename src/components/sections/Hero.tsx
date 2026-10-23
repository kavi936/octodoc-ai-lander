"use client";

import dynamic from "next/dynamic";
import { ArmsMark } from "@/components/ui/ArmsMark";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/site.config";
import { gsap, registerGsap, ScrollTrigger, SplitText, useGsapContext } from "@/lib/gsap";

const HeroCanvas = dynamic(
  () =>
    import("@/components/three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false, loading: () => null },
);

export function Hero() {
  const scope = useGsapContext((root) => {
    registerGsap();
    const mm = gsap.matchMedia();
    let split: SplitText | null = null;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const headline = root.querySelector<HTMLElement>("[data-hero-line]");
      if (headline) {
        split = SplitText.create(headline, {
          type: "lines",
          linesClass: "hero-line-mask",
          mask: "lines",
        });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.05,
          stagger: 0.06,
          ease: "octoOut",
          delay: 0.15,
        });
      }

      gsap.from(root.querySelectorAll("[data-hero-fade]"), {
        opacity: 0,
        y: 18,
        duration: 0.9,
        stagger: 0.06,
        ease: "octoSoft",
        delay: 0.45,
      });

      gsap.to(root.querySelector("[data-hero-canvas]"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    const onResize = () => {
      split?.revert();
      const headline = root.querySelector<HTMLElement>("[data-hero-line]");
      if (
        headline &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        split = SplitText.create(headline, {
          type: "lines",
          linesClass: "hero-line-mask",
          mask: "lines",
        });
      }
      ScrollTrigger.refresh();
    };
    let resizeTimer = 0;
    const onResizeDebounced = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(onResize, 150);
    };
    window.addEventListener("resize", onResizeDebounced);

    document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResizeDebounced);
      window.clearTimeout(resizeTimer);
      split?.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={scope as React.RefObject<HTMLElement>}
      className="relative isolate min-h-[100dvh] overflow-hidden bg-paper pt-[calc(3.5rem+var(--safe-top))] md:pt-[calc(4rem+var(--safe-top))]"
    >
      {/* Full-bleed atmosphere */}
      <div
        data-hero-canvas
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(14,116,144,0.08),transparent_55%),linear-gradient(180deg,var(--paper)_0%,var(--paper-alt)_100%)]" />
        <HeroCanvas className="absolute inset-0 h-full w-full" />
        {/* SVG fallback / reinforcement arms — kept off text measure */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] opacity-[0.1] lg:block">
          <ArmsMark className="absolute right-[-6%] top-[16%] h-[min(48vw,26rem)] w-[min(48vw,26rem)] text-ink" />
        </div>
        <div
          className="pointer-events-none absolute bottom-[max(1.5rem,var(--safe-bottom))] right-[max(1rem,var(--safe-right))] hidden max-w-[12rem] font-mono text-[0.65rem] leading-relaxed text-blot select-none sm:block md:text-[0.7rem]"
          aria-hidden="true"
        >
          ▓▒░▙▚▞█▓▒░
          <br />
          ▒░▙▚▞█▓▒░▙
          <br />
          ░▙▚▞█▓▒░▙▚
        </div>
      </div>

      <div className="section-pad measure relative flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center pb-16 pt-10 md:min-h-[calc(100dvh-4rem)] md:pb-24 md:pt-16">
        <p
          data-hero-fade
          className="eyebrow mb-6"
        >
          [ THE DOMAIN ]
        </p>

        <p
          data-hero-fade
          className="domain-mark mb-6 text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.9] tracking-[-0.04em] text-ink"
        >
          {siteConfig.domain}
        </p>

        <div className="overflow-hidden">
          <h1
            data-hero-line
            className="display max-w-[18ch] text-[clamp(1.85rem,4.6vw,3.75rem)] leading-[1.05]"
          >
            This domain matters — and you already know that, because you&apos;re
            here.
          </h1>
        </div>

        <p
          data-hero-fade
          className="mt-6 max-w-[38rem] text-[clamp(1rem,1.1vw+0.85rem,1.2rem)] leading-relaxed text-body"
        >
          A short .ai name with two credible futures: document intelligence with
          many coordinated arms — or an agentic clinical co-pilot that stays
          physician-supervised. Build on it, or acquire it safely.
        </p>

        <div
          data-hero-fade
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
        >
          <Button href="#two-futures" variant="primary">
            Explore the futures
          </Button>
          <Button href="#acquire" variant="secondary">
            Inquire about this domain
          </Button>
        </div>

        <p
          data-hero-fade
          className="mt-10 font-mono text-[0.75rem] text-muted"
        >
          {siteConfig.tagline}
        </p>
      </div>
    </section>
  );
}
