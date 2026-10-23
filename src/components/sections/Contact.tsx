"use client";

import { useState, type FormEvent } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { siteConfig, type IntendedUse } from "@/site.config";
import { gsap, registerGsap, useGsapContext } from "@/lib/gsap";

type Status = "idle" | "submitting" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const scope = useGsapContext((root) => {
    registerGsap();
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(root.querySelectorAll("[data-contact-in]"), {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "octoOut",
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    });
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      intendedUse: String(data.get("intendedUse") || "") as IntendedUse,
      budget: String(data.get("budget") || ""),
      message: String(data.get("message") || ""),
    };

    try {
      if (siteConfig.contactEndpoint) {
        const res = await fetch(siteConfig.contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = (await res.json()) as {
          ok: boolean;
          mailto?: string;
          error?: string;
        };
        if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
        if (json.mailto) {
          window.location.href = json.mailto;
        }
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const field =
    "mt-1.5 w-full min-h-11 rounded-sm border border-hairline bg-surface px-3 text-ink outline-none transition-colors focus:border-teal-700";

  return (
    <section
      id="contact"
      ref={scope as React.RefObject<HTMLElement>}
      className="border-t border-hairline bg-paper"
    >
      <div className="section-pad measure py-20 md:py-28">
        <SectionEyebrow coord="07 / 11">CONTACT</SectionEyebrow>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-contact-in>
            <h2 className="display text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[1.05]">
              Start a serious conversation.
            </h2>
            <p className="mt-4 text-body">
              Domain purchase, product partnership, or vision feedback — write
              with intent. Public contact:{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-teal-700"
              >
                {siteConfig.contactEmail}
              </a>
              .
            </p>
            {siteConfig.responseTimeExpectation ? (
              <p className="mt-3 text-sm text-muted">
                {siteConfig.responseTimeExpectation}
              </p>
            ) : null}
          </div>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-7 grid gap-4 sm:grid-cols-2"
            data-contact-in
          >
            <label className="text-sm text-muted">
              Name
              <input
                name="name"
                required
                autoComplete="name"
                className={field}
              />
            </label>
            <label className="text-sm text-muted">
              Email
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className={field}
              />
            </label>
            <label className="text-sm text-muted sm:col-span-2">
              Company
              <input name="company" autoComplete="organization" className={field} />
            </label>
            <label className="text-sm text-muted">
              Intended use
              <select name="intendedUse" required className={field} defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                <option value="document">Document product</option>
                <option value="clinical">Clinical product</option>
                <option value="domain">Domain purchase</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="text-sm text-muted">
              Budget range{" "}
              <span className="text-blot">(optional)</span>
              <input
                name="budget"
                placeholder="e.g. explore / make offer"
                className={field}
              />
            </label>
            <label className="text-sm text-muted sm:col-span-2">
              Message
              <textarea
                name="message"
                required
                rows={5}
                className={`${field} py-2`}
              />
            </label>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Send inquiry"}
              </Button>
              {status === "sent" ? (
                <p className="text-sm text-teal-700" role="status">
                  Inquiry prepared. If your mail client opened, send from there.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-sm text-red-700" role="alert">
                  {error}. You can also email {siteConfig.contactEmail} directly.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
