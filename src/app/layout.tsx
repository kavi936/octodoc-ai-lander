import type { Metadata } from "next";
import { syne, outfit, ibmPlexMono } from "@/lib/fonts";
import { siteConfig } from "@/site.config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s · ${siteConfig.domain}`,
  },
  description: siteConfig.seo.description,
  applicationName: siteConfig.domain,
  keywords: [
    "octodoc.ai",
    "premium ai domain",
    "document intelligence",
    "clinical AI",
    "domain for sale",
    "escrow",
  ],
  authors: [{ name: siteConfig.domain }],
  openGraph: {
    type: "website",
    url: siteConfig.seo.url,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.domain,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.seo.url,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.seo.url}/#website`,
      url: siteConfig.seo.url,
      name: siteConfig.domain,
      description: siteConfig.seo.description,
      publisher: {
        "@type": "Organization",
        name: siteConfig.brand,
        email: siteConfig.contactEmail,
        url: siteConfig.seo.url,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteConfig.seo.url}/#webpage`,
      url: siteConfig.seo.url,
      name: siteConfig.seo.title,
      isPartOf: { "@id": `${siteConfig.seo.url}/#website` },
      description: siteConfig.seo.description,
      about: {
        "@type": "Thing",
        name: siteConfig.domain,
        description:
          "Premium .ai domain with dual product vision: document intelligence and agentic clinical co-pilot.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-body">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
