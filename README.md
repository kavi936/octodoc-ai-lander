# octodoc.ai

**[Live site →](https://octodoc.ai)**

Premium marketing lander for the short `.ai` domain **octodoc.ai** — a dual product vision (document intelligence × agentic clinical co-pilot) with an escrow-first acquisition path.

Built as a production-ready Next.js storefront: motion-led storytelling, interactive demos, SEO/social metadata, and a config-driven sale surface. Not a live SaaS — an honest vision canvas + domain for sale.

---

## What’s in this repo

| Area | What shipped |
| --- | --- |
| **Brand-first hero** | Full-bleed composition, custom typography, lazy Three.js particle canvas with reduced-motion fallback |
| **Dual futures** | Document vs clinical product stories with GSAP Flip / blot-resolve transitions |
| **Interactive demos** | Schema extraction playground + clinical cite-to-source chat (vision demos, fake data) |
| **Acquire flow** | Make-an-offer posture, escrow steps, marketplace hooks, owner attribution |
| **Contact** | Inquiry form → `/api/contact` (mailto fallback or optional form endpoint) |
| **SEO** | Metadata, JSON-LD, sitemap, robots, dynamic favicon + Open Graph image |
| **A11y / polish** | Skip link, contrast-aware palette, `prefers-reduced-motion` respected in CSS + GSAP + WebGL |

**Owner knobs** live in a single file: [`src/site.config.ts`](src/site.config.ts) (contact, price, escrow links, SEO, disclaimer).

---

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — paper / teal / ink design tokens
- **GSAP 3** — ScrollTrigger, Flip, Observer, SplitText, CustomEase
- **Three.js** — lazy client-only hero canvas
- **Fonts** — Syne, Outfit, IBM Plex Mono (`next/font`)
- **Deploy** — Vercel · custom domain `octodoc.ai`

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start   # production
npm run lint
```

---

## Configure

Edit [`src/site.config.ts`](src/site.config.ts):

| Key | Purpose |
| --- | --- |
| `contactEmail` | Public contact |
| `owner` | Name / LinkedIn attribution on Acquire + Footer |
| `askingPrice` | `number` to show a price, or `null` for “Make an offer” |
| `enableLTO` | Lease-to-own FAQ copy |
| `escrowLinks` | Escrow.com + optional Afternic / Sedo / Dan listing URLs |
| `contactEndpoint` | Optional form POST target; otherwise `/api/contact` → mailto |
| `defaultFuture` | Initial TwoFutures tab: `'document'` \| `'clinical'` |
| `seo` | Title, description, canonical URL |

---

## Project layout

```
src/
├── site.config.ts          # Owner-editable config
├── app/                    # Routes, layout, SEO, /api/contact
├── components/
│   ├── layout/             # Nav, Footer
│   ├── sections/           # Hero → FAQ page sections
│   ├── ui/                 # Button, ArmsMark, BlotText, …
│   └── three/              # HeroCanvas
└── lib/                    # fonts, gsap helpers, blotResolve, cn
```

---

## Design intent

- One composition on first viewport — brand as the hero signal, not a dashboard
- Light paper atmosphere with teal accent (not generic purple/dark AI defaults)
- Motion for hierarchy and presence; demos prove the *idea*, not fake traction
- Clear escrow-only sale hygiene; not affiliated with octodoc.ro

---

## Author

**Kavi Choudhary** — [LinkedIn](https://www.linkedin.com/in/kavi-choudhary-636539339/) · inquiries via the [live site](https://octodoc.ai) or email in `site.config.ts`

Domain acquisition: reputable escrow only (Escrow.com preferred).

---

## License

Source in this repository is available under the [MIT License](LICENSE). The **octodoc.ai** domain name is a separate asset and is not included in that license.
