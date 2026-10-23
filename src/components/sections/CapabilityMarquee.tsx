const LABELS = [
  "CAPTURE",
  "UNDERSTAND",
  "EXTRACT",
  "ACT",
  "INTAKE",
  "REASON",
  "DRAFT",
  "VERIFY",
  "schema-on-demand",
  "cite-first",
  "physician-in-the-loop",
  "page-aware ingest",
  "confidence marks",
  "guideline grounding",
  "RAG over docs",
  "SOAP draft",
  "escrow-ready transfer",
  "many arms · one truth",
];

export function CapabilityMarquee() {
  const doubled = [...LABELS, ...LABELS];
  return (
    <section
      id="capability-marquee"
      className="border-t border-hairline bg-paper overflow-hidden"
      aria-label="Capability labels"
    >
      <div className="section-pad measure py-6">
        <p className="eyebrow">[ CAPABILITY MARQUEE ]</p>
      </div>
      <div className="border-y border-hairline bg-paper-alt py-5 overflow-hidden">
        <div className="marquee-track" aria-hidden="true">
          {doubled.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="font-mono text-[0.85rem] tracking-wide text-muted whitespace-nowrap"
            >
              <span className="text-teal-700">◈</span> {label}
            </span>
          ))}
        </div>
        <ul className="sr-only">
          {LABELS.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
