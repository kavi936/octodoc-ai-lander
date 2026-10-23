"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArmsMark } from "@/components/ui/ArmsMark";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/cn";

const links = [
  { href: "#two-futures", label: "Futures" },
  { href: "#document-demo", label: "Document" },
  { href: "#clinical-demo", label: "Clinical" },
  { href: "#acquire", label: "Acquire" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-hairline bg-paper/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
      style={{ paddingTop: "var(--safe-top)" }}
    >
      <div className="section-pad measure flex h-14 items-center justify-between gap-4 md:h-16">
        <Link
          href="#top"
          className="domain-mark flex items-center gap-2 text-[0.9375rem] text-ink no-underline"
          onClick={() => setOpen(false)}
        >
          <ArmsMark className="h-6 w-6" />
          <span>{siteConfig.domain}</span>
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Primary"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.875rem] text-body no-underline transition-colors hover:text-teal-700"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#acquire"
            className="inline-flex min-h-10 items-center rounded-sm bg-teal-700 px-3.5 text-[0.8125rem] font-medium text-white no-underline transition-colors hover:bg-teal-800"
          >
            Inquire
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-hairline bg-surface text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="font-mono text-sm">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-hairline bg-paper section-pad pb-[max(1.5rem,var(--safe-bottom))] pt-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="flex min-h-11 items-center text-ink no-underline"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
