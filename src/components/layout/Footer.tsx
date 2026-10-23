import { ArmsMark } from "@/components/ui/ArmsMark";
import { siteConfig } from "@/site.config";

export function Footer() {
  const year = new Date().getFullYear();
  const escrow = [
    { label: "Escrow.com", href: siteConfig.escrowLinks.escrowCom },
    siteConfig.escrowLinks.afternic
      ? { label: "Afternic", href: siteConfig.escrowLinks.afternic }
      : null,
    siteConfig.escrowLinks.sedo
      ? { label: "Sedo", href: siteConfig.escrowLinks.sedo }
      : null,
    siteConfig.escrowLinks.dan
      ? { label: "Dan.com", href: siteConfig.escrowLinks.dan }
      : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-hairline bg-paper-alt">
      <div className="section-pad measure py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="domain-mark mb-4 flex items-center gap-2 text-lg text-ink">
              <ArmsMark className="h-7 w-7" />
              {siteConfig.domain}
            </div>
            <p className="max-w-sm text-[0.9375rem] text-body">
              {siteConfig.tagline} A premium .ai name with dual product
              potential — document intelligence or clinical co-pilot — and a
              clear path to acquire it safely.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-3">Contact</p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-ink underline-offset-4 hover:text-teal-700"
            >
              {siteConfig.contactEmail}
            </a>
            {siteConfig.owner.showOnSite ? (
              <p className="mt-4 text-[0.9375rem] text-body">
                Offered by{" "}
                {siteConfig.owner.linkedin ? (
                  <a
                    href={siteConfig.owner.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-teal-700"
                  >
                    {siteConfig.owner.displayName}
                  </a>
                ) : (
                  <span className="text-ink">{siteConfig.owner.displayName}</span>
                )}
              </p>
            ) : null}
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow mb-3">Escrow</p>
            <ul className="flex flex-col gap-2 text-[0.9375rem]">
              {escrow.map((e) => (
                <li key={e.label}>
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body hover:text-teal-700"
                  >
                    {e.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-[0.8125rem] text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.domain}. All rights reserved.
          </p>
          <p>{siteConfig.disclaimer}</p>
        </div>
        <p className="mt-3 text-[0.75rem] text-muted">
          Privacy: inquiries are used only to respond about this domain or
          product vision. No third-party marketing lists.
        </p>
      </div>
    </footer>
  );
}
