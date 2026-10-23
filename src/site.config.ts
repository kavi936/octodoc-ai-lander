export type FutureMode = "document" | "clinical";

export type IntendedUse =
  | "document"
  | "clinical"
  | "domain"
  | "other";

/**
 * Owner-editable site configuration.
 * Set askingPrice to a number to display it; leave null for "Make an offer".
 * Toggle escrow marketplace links with real listing URLs when available.
 */
export const siteConfig = {
  domain: "octodoc.ai",
  brand: "OctoDoc",
  tagline: "Many arms. One truth.",
  contactEmail: "kavi.cf412@gmail.com",
  /**
   * Public owner attribution — builds trust for a first-time domain sale.
   * Keep phone/address off the site; LinkedIn optional.
   */
  owner: {
    displayName: "Kavi Choudhary",
    showOnSite: true,
    linkedin: "https://www.linkedin.com/in/kavi-choudhary-636539339/",
  },
  /** Set a number to show publicly; null keeps premium "Make an offer" posture */
  askingPrice: null as number | null,
  enableLTO: false,
  defaultFuture: "document" as FutureMode,
  /** Optional — omit from FAQ/UI when unset */
  responseTimeExpectation: null as string | null,
  /** Optional form POST target; falls back to mailto */
  contactEndpoint: null as string | null,
  escrowLinks: {
    escrowCom: "https://www.escrow.com/",
    afternic: null as string | null,
    sedo: null as string | null,
    dan: null as string | null,
  },
  socials: {
    twitter: null as string | null,
    linkedin: "https://www.linkedin.com/in/kavi-choudhary-636539339/",
  },
  seo: {
    title: "octodoc.ai — Premium .ai domain for document intelligence or clinical AI",
    description:
      "octodoc.ai is a premium .ai name with dual potential: AI document intelligence or an agentic clinical co-pilot. Explore the vision — or acquire the domain via reputable escrow.",
    url: "https://octodoc.ai",
  },
  disclaimer:
    "Not affiliated with Octodoc (octodoc.ro) or any telehealth service operating under that name.",
} as const;

export type SiteConfig = typeof siteConfig;
