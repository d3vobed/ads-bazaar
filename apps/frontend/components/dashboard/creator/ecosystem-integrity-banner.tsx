export function EcosystemIntegrityBanner() {
  return (
    <section className="mt-12 lg:mt-20">
      <div className="relative flex h-80 w-full flex-col items-center justify-center rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface)] px-6 text-center sm:px-12">
        <h2 className="font-[family-name:var(--font-sora)] mb-4 text-2xl font-semibold text-[var(--dash-heading)]">
          Ecosystem Integrity
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-[var(--dash-muted)]">
          Our decentralized proof system ensures that every interaction is
          verifiable on the Stellar network, protecting your reputation and
          ensuring instant payouts.
        </p>
      </div>
    </section>
  );
}
