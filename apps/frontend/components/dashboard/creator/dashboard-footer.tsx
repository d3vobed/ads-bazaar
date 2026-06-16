import Link from "next/link";

const resourceLinks = [
  { href: "/docs", label: "Documentation" },
  { href: "/brand", label: "Brand Kit" },
  { href: "/docs/stellar-guide", label: "Stellar Guide" },
];

const communityLinks = [
  { href: "https://discord.com", label: "Discord" },
  { href: "https://x.com", label: "Twitter/X" },
  { href: "/forum", label: "Forum" },
];

export function DashboardFooter() {
  return (
    <footer className="mt-20 flex flex-col gap-8 border-t border-[var(--dash-border)] pb-12 pt-12 md:flex-row md:items-start md:justify-between">
      <div className="max-w-xs">
        <p className="mb-2 text-lg font-bold text-[var(--dash-heading)]">
          AdsBazaar
        </p>
        <p className="text-sm leading-relaxed text-[var(--dash-muted)]">
          The authority for creator-led decentralized advertising. Built for
          transparency, speed, and trust.
        </p>
      </div>

      <div className="flex gap-16">
        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-heading)]">
            Resources
          </h2>
          <ul className="space-y-2 text-sm text-[var(--dash-muted)]">
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)] hover:text-[var(--dash-accent)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--dash-heading)]">
            Community
          </h2>
          <ul className="space-y-2 text-sm text-[var(--dash-muted)]">
            {communityLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dash-accent)] hover:text-[var(--dash-accent)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
