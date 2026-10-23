import { NextResponse } from "next/server";
import { siteConfig } from "@/site.config";

type Body = {
  name?: string;
  email?: string;
  company?: string;
  intendedUse?: string;
  budget?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const intendedUse = (body.intendedUse || "").trim();

  if (!name || !email || !message || !intendedUse) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  if (siteConfig.contactEndpoint) {
    try {
      const upstream = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!upstream.ok) {
        return NextResponse.json(
          { ok: false, error: "Upstream contact endpoint failed" },
          { status: 502 },
        );
      }
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json(
        { ok: false, error: "Upstream contact endpoint unreachable" },
        { status: 502 },
      );
    }
  }

  const subject = encodeURIComponent(
    `[octodoc.ai] Inquiry — ${intendedUse} — ${name}`,
  );
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${(body.company || "").trim() || "—"}`,
    `Intended use: ${intendedUse}`,
    `Budget: ${(body.budget || "").trim() || "—"}`,
    "",
    message,
  ];
  const mailto = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;

  return NextResponse.json({ ok: true, mailto });
}
