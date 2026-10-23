"use client";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { ArmsMark } from "@/components/ui/ArmsMark";
import { siteConfig } from "@/site.config";
import { formatPrice } from "@/lib/cn";
import { gsap, registerGsap, useGsapContext } from "@/lib/gsap";

const STEPS = [
  "Inquiry — share intended use and terms of interest",
  "Agree terms — price, timeline, and transfer details",
  "Buyer funds escrow — never wire the seller directly",
  "Seller pushes transfer at the registrar",
  "Buyer confirms receipt",
  "Escrow releases funds to the seller",
];

export function Acquire() {
  const scope = useGsapContext((root) => {
    registerGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(root.querySelectorAll("[data-acq-in]"), {
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.05,
        ease: "octoOut",
        scrollTrigger: { trigger: root, start: "top 78%" },
      });

      gsap.fromTo(
        root,
        { "--acq-lift": 0 } as gsap.TweenVars,
        {
          "--acq-lift": 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          },
        },
      );
    });
  }, []);

  const links = [
    { label: "Escrow.com", href: siteConfig.escrowLinks.escrowCom, note: "Industry standard domain escrow" },
    siteConfig.escrowLinks.afternic
      ? { label: "Afternic / GoDaddy", href: siteConfig.escrowLinks.afternic, note: "Aftermarket listing" }
      : null,
    siteConfig.escrowLinks.sedo
      ? { label: "Sedo", href: siteConfig.escrowLinks.sedo, note: "Marketplace" }
      : null,
    siteConfig.escrowLinks.dan
      ? { label: "Dan.com / Atom", href: siteConfig.escrowLinks.dan, note: "Listing" }
      : null,
  ].filter(Boolean) as { label: string; href: string; note: string }[];

  const priceLabel =
    siteConfig.askingPrice != null
      ? formatPrice(siteConfig.askingPrice)
      : "Make an offer";

  return (
    <section
      id="acquire"
      ref={scope as React.RefObject<HTMLElement>}
      className="acquire-section relative overflow-hidden border-t border-white/10"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      >
        <ArmsMark className="absolute -right-10 top-10 h-72 w-72 text-teal-600/40 md:h-96 md:w-96" />
        <div className="absolute bottom-8 left-6 font-mono text-[0.65rem] leading-loose text-teal-600/50">
          ░▒▓ ESCROW PERIMETER ▓▒░
          <br />
          ──┼── CONTAINED TRANSFER ──┼──
        </div>
      </div>

      <div className="section-pad measure relative py-20 md:py-28">
        <SectionEyebrow className="!text-[#8aa0ad]" coord="06 / 11">
          ACQUIRE
        </SectionEyebrow>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6" data-acq-in>
            <h2 className="display text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.05]">
              The domain is the asset.
              <br />
              Acquire it safely.
            </h2>
            <p className="mt-5 max-w-xl text-[#c5d4dc]">
              {siteConfig.domain} may be available for purchase or transfer.
              Preferred settlement is reputable escrow only — so neither party
              moves first in the dark.
            </p>
            {siteConfig.owner.showOnSite ? (
              <p className="mt-4 text-[0.9375rem] text-[#8aa0ad]">
                Offered by{" "}
                {siteConfig.owner.linkedin ? (
                  <a
                    href={siteConfig.owner.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-200 hover:underline"
                  >
                    {siteConfig.owner.displayName}
                  </a>
                ) : (
                  <span className="text-[#c5d4dc]">
                    {siteConfig.owner.displayName}
                  </span>
                )}
                . Serious inquiries welcome.
              </p>
            ) : null}
            <p className="mt-6 font-mono text-sm text-teal-300">
              Status · {priceLabel}
            </p>
            {siteConfig.enableLTO ? (
              <p className="mt-2 text-sm text-[#8aa0ad]">
                Lease-to-own / payment plans may be available on request.
              </p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#contact" variant="invert">
                Make an offer
              </Button>
              <Button
                href={siteConfig.escrowLinks.escrowCom}
                variant="ghost"
                className="!text-teal-200 hover:!bg-white/5"
              >
                Start escrow conversation
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div data-acq-in>
              <p className="eyebrow !text-[#8aa0ad] mb-4">Settlement paths</p>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-11 items-baseline justify-between gap-4 border-b border-white/10 py-2 no-underline"
                    >
                      <span className="text-[#f2f7f9] group-hover:text-teal-200">
                        {l.label}
                      </span>
                      <span className="font-mono text-[0.7rem] text-[#8aa0ad]">
                        {l.note}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div data-acq-in>
              <p className="eyebrow !text-[#8aa0ad] mb-4">Process</p>
              <ol className="space-y-3">
                {STEPS.map((s, i) => (
                  <li
                    key={s}
                    className="flex gap-3 text-[0.95rem] text-[#c5d4dc]"
                  >
                    <span className="font-mono text-teal-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-[0.875rem] text-[#8aa0ad]">
                Never wire the seller directly. Never transfer the domain before
                escrow shows funds. Serious buyers use the inquiry form or email{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-teal-200"
                >
                  {siteConfig.contactEmail}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
