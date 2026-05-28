const partners = ["Stellar", "Soroban", "SEP-24", "Anchors"];

const heroStats = [
  { value: "0.5%", label: "protocol fee" },
  { value: "6", label: "launch rails" },
  { value: "24/7", label: "escrow visibility" },
];

const howItWorks = [
  {
    title: "Create a campaign",
    text: "A business sets budget, creator slots, deadline, payout asset, and proof requirements.",
    stat: "01",
  },
  {
    title: "Lock funds in escrow",
    text: "Soroban holds the campaign budget so creators can verify funding before they work.",
    stat: "02",
  },
  {
    title: "Approve and settle",
    text: "Creators submit proof, brands approve delivery, and payouts move directly to wallets.",
    stat: "03",
  },
];

const whyAdsBazaar = [
  {
    title: "Local-currency commerce",
    text: "Campaigns can be priced for the market where the business operates, not forced through a USD-only workflow.",
  },
  {
    title: "Trust-minimized payouts",
    text: "Escrow turns creator payment from a promise into an auditable on-chain state.",
  },
  {
    title: "Emerging-market rails",
    text: "SEP-24 anchor flows create a path from bank transfer or mobile money to Stellar settlement and back.",
  },
];

const rails = [
  { market: "Nigeria", rail: "Bank transfer", asset: "NGN asset" },
  { market: "Kenya", rail: "Mobile money", asset: "KES asset" },
  { market: "Europe", rail: "SEPA", asset: "EURC" },
  { market: "Global", rail: "Wallet", asset: "USDC" },
];

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero" id="top">
        <div className="grid-overlay" aria-hidden="true" />

        <nav className="nav" aria-label="Main navigation">
          <a href="#top" className="logo" aria-label="AdsBazaar home">
            AdsBazaar
          </a>

          <div className="nav-pill">
            <a href="#how">How it works</a>
            <a href="#why">Why AdsBazaar</a>
            <a href="#rails">Rails</a>
            <a href="#build">Build</a>
          </div>

          <div className="nav-actions">
            <a href="#connect" className="lime-button">
              Connect wallet
            </a>
          </div>
        </nav>

        <div className="hero-inner">
          <div className="hero-copy">
            <p className="label">Stellar creator commerce</p>
            <h1>Campaign escrow for the next million creators.</h1>
            <p className="lead">
              AdsBazaar connects brands and creators through Soroban escrow,
              multi-asset settlement, and local payment rails built for markets
              where fees, trust, and payout speed actually matter.
            </p>

            <div className="cta-row">
              <a href="#how" className="lime-button large">
                Open campaign
              </a>
              <a href="#why" className="watch-link" aria-label="Watch product walkthrough">
                <span aria-hidden="true">▶</span>
                Watch flow
              </a>
            </div>

            <div className="trusted">
              <span>Infrastructure direction</span>
              <div>
                {partners.map((partner) => (
                  <strong key={partner}>{partner}</strong>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-label="AdsBazaar product preview">
            <div className="rating-tile glass-tile">
              <strong>4.9</strong>
              <span>Creator trust score</span>
              <small>2.6K verified campaign actions</small>
            </div>

            <div className="users-tile glass-tile">
              <span>Creators reachable</span>
              <strong>80K</strong>
              <small>Africa-first launch network</small>
            </div>

            <div className="creator-stage">
              <div className="creator-portrait" aria-hidden="true">
                <span className="head" />
                <span className="body" />
                <span className="phone-hand" />
              </div>

              <div className="mini-chart">
                <span />
                <strong>Escrow live</strong>
              </div>
            </div>

            <div className="experience-badge">
              <strong>$25+</strong>
              <span>viable micro-payouts</span>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Key platform metrics">
        {heroStats.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="light-section" id="how">
        <div className="section-head scroll-reveal">
          <p className="label dark">How it works</p>
          <h2>Move from brief to payout without payment chaos.</h2>
          <p>
            AdsBazaar is structured around the real campaign lifecycle: funding,
            selection, proof, approval, and settlement.
          </p>
        </div>

        <div className="process-grid">
          {howItWorks.map((item) => (
            <article className="process-card scroll-reveal" key={item.title}>
              <span>{item.stat}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dark-band" id="why">
        <div className="band-copy scroll-reveal">
          <p className="label">Why AdsBazaar</p>
          <h2>Built like payment infrastructure, not a campaign spreadsheet.</h2>
          <p>
            The product combines creator marketplace UX with the primitives that
            make Stellar useful: native assets, low-fee settlement, anchors, and
            Soroban-enforced custody.
          </p>
        </div>

        <div className="why-grid">
          {whyAdsBazaar.map((item) => (
            <article className="why-card scroll-reveal" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rails-section" id="rails">
        <div className="rails-copy scroll-reveal">
          <p className="label dark">Payment rails</p>
          <h2>Stablecoin-native, local-market aware.</h2>
        </div>

        <div className="rail-board scroll-reveal">
          {rails.map((rail) => (
            <div className="rail-row" key={rail.market}>
              <strong>{rail.market}</strong>
              <span>{rail.rail}</span>
              <em>{rail.asset}</em>
            </div>
          ))}
        </div>
      </section>

      <section className="final-cta" id="build">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="final-card scroll-reveal">
          <p className="label">Open-source Stellar dApp</p>
          <h2>Launch campaigns where creators already live.</h2>
          <p>
            AdsBazaar is being built as an open-source reference for creator
            commerce, Soroban escrow, and cross-border stablecoin settlement.
          </p>
          <a href="#connect" id="connect" className="lime-button large">
            Connect wallet
          </a>
        </div>
      </section>
    </main>
  );
}
