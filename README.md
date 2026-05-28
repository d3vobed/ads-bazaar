# AdsBazaar

**A decentralized marketplace for multi-currency creator campaigns on Stellar.**

AdsBazaar helps businesses fund influencer marketing campaigns in the currency they already use, while creators receive escrow-protected payouts through Stellar assets and local payment rails.

The initial focus is emerging-market creator commerce: Nigerian businesses paying in Naira-denominated assets, Kenyan creators withdrawing through mobile-money-connected anchors, and global teams settling campaigns in stablecoins without rebuilding the same trust and FX workflow for every country.

> [!NOTE]
> AdsBazaar is under active development. The repository now contains the Next.js frontend workspace, a Soroban escrow contract scaffold, and a lightweight backend service scaffold. Production integrations such as SEP-24 anchor orchestration, dispute resolution, identity verification, and indexed campaign feeds are documented as part of the project architecture and roadmap.

---

## Why AdsBazaar

Influencer marketing works poorly outside USD-first markets.

Businesses in Africa, Latin America, and other high-growth regions often pay creators through manual transfers, informal agreements, or centralized platforms that require USD conversion. The result is predictable: high fees, delayed payouts, limited recourse for creators, and operational overhead for brands trying to run cross-border campaigns.

AdsBazaar is designed around a simpler primitive:

1. A business funds a campaign in a Stellar-supported asset.
2. Funds move into a Soroban escrow contract.
3. Creators apply, are selected, submit proof of work, and claim payment when approved.
4. Local deposit and withdrawal providers handle fiat entry and exit through standardized Stellar anchor flows.

The goal is not to add crypto complexity to marketing. The goal is to remove the payment and trust overhead that prevents small businesses and independent creators from working across borders.

---

## What AdsBazaar Enables

| Participant | Current pain | AdsBazaar approach |
| --- | --- | --- |
| Businesses | Manual creator payments, FX friction, limited delivery guarantees | Fund campaigns once, hold funds in escrow, release payouts only after campaign conditions are met |
| Creators | Late payments, platform lock-in, expensive withdrawals | Apply globally, verify campaign funding on-chain, claim payment directly to a wallet |
| Anchors and wallets | Need credible payment use cases for local stablecoins | Provide deposit and withdrawal rails for real commercial activity |
| Stellar ecosystem | Needs applications that use native assets, anchors, and Soroban together | Combines multi-asset settlement, smart contract escrow, and SEP-24 flows in one open-source product |

---

## Why Stellar

AdsBazaar is built for multi-currency payments first. Stellar is a strong fit because its core network, ecosystem standards, and Soroban contracts are designed around asset movement rather than speculative execution.

### Native Multi-Asset Infrastructure

Stellar accounts can hold XLM, USDC, EURC, and anchored local-currency assets as first-class network assets. AdsBazaar campaigns can therefore be denominated in the asset that makes sense for the business, without wrapping every payment path in a new token contract.

### Low-Fee Settlement

Creator campaigns often involve many small payouts. Stellar's low transaction costs make campaign-level and creator-level payments practical even when a business is paying ten or one hundred creators.

### Soroban Smart Contracts

Soroban gives AdsBazaar deterministic, Rust-based escrow logic for campaign funding, creator selection, proof submission, approval, and payout claiming. The contract layer is intentionally small: custody and state transitions are enforced on-chain, while discovery, notifications, identity, and anchor sessions live off-chain.

### Stellar DEX and Asset Liquidity

The Stellar DEX provides a native path for asset exchange and price discovery. AdsBazaar can show campaign values across currencies and support future conversion flows without depending on a separate bridge-first architecture.

### SEP-24 Anchor Standard

SEP-24 defines a standardized interactive deposit and withdrawal flow for Stellar anchors. This matters for emerging markets because businesses and creators should be able to enter and exit through familiar rails such as bank transfer, mobile money, or regional payment providers.

### Emerging-Market Reach

Stellar has a meaningful history of anchor-led payment infrastructure in Africa and other cross-border corridors. AdsBazaar is designed to use that infrastructure for commercial workflows: local business funding, stablecoin settlement, and creator withdrawals.

---

## Core Features

| Area | Capability |
| --- | --- |
| Campaign funding | Businesses create campaigns funded in a supported Stellar asset |
| Escrow | Soroban contract locks campaign budgets and enforces payout conditions |
| Creator applications | Creators apply with wallet identity, profile metadata, and social proof |
| Selection workflow | Businesses select creators up to the campaign limit |
| Proof submission | Creators submit proof URIs for posts, videos, or campaign deliverables |
| Payment release | Businesses approve submissions; creators claim escrowed payouts |
| Auto-approval path | Contract supports deadline-aware payout logic for submitted work |
| Dispute flagging | Campaign participants can place a campaign into a disputed state |
| Multi-currency UX | Frontend is designed around local-currency campaign discovery |
| Anchor integration path | Backend scaffold is prepared for SEP-24 session initiation and callbacks |

---

## System Architecture

```text
ads-bazaar/
├── apps/
│   ├── frontend/          # Next.js campaign interface
│   └── backend/           # API service scaffold for indexing, callbacks, SEP-24 orchestration
└── packages/
    └── contracts/         # Soroban escrow contract package
```

### High-Level Flow

```text
Business
  -> deposits through wallet or SEP-24 anchor
  -> receives Stellar asset
  -> creates campaign
  -> funds Soroban escrow

Creator
  -> connects wallet
  -> applies to campaign
  -> submits proof URI
  -> claims approved payout
  -> withdraws through local anchor
```

### Responsibility Boundaries

| Layer | Responsibilities |
| --- | --- |
| Soroban contract | Escrow custody, campaign state, creator selection, proof status, payout claims, dispute flagging |
| Frontend | Campaign creation, wallet connection, creator workflow, localized campaign browsing, user-facing payment state |
| Backend | Campaign indexing, notification delivery, SEP-24 session relay, anchor callback validation, analytics |
| Stellar network | Asset issuance, trustlines, token movement, settlement, DEX liquidity |
| Anchors | Fiat deposit, withdrawal, KYC, payment method integration |

---

## Smart Contract Architecture

The Soroban contract is located in [`packages/contracts`](./packages/contracts). It currently implements the core escrow model as a Rust contract scaffold.

### Campaign Lifecycle

```rust
pub enum CampaignStatus {
    Open,
    Active,
    Completed,
    Disputed,
    Cancelled,
}
```

| Status | Meaning |
| --- | --- |
| `Open` | Campaign is accepting creator applications |
| `Active` | One or more creators have been selected and can submit proof |
| `Completed` | Campaign obligations have been fulfilled |
| `Disputed` | A campaign participant has flagged the campaign for review |
| `Cancelled` | Reserved for future cancellation and refund flows |

### Contract Capabilities

| Function | Purpose |
| --- | --- |
| `initialize` | Sets contract admin, treasury, and protocol fee basis points |
| `create_campaign` | Transfers campaign budget from business wallet into escrow |
| `apply` | Records a creator application and profile metadata |
| `select_creator` | Allows the business to select an applicant |
| `submit_proof` | Stores creator proof URI for campaign deliverables |
| `approve_submission` | Marks a submission as approved by the business |
| `claim_payment` | Transfers approved payout to the creator and protocol fee to treasury |
| `flag_dispute` | Moves a participant campaign into disputed status |

### Escrow Design

AdsBazaar keeps swaps and anchor operations outside the contract. The contract only escrows and releases the asset selected by the business.

This keeps the on-chain logic easier to audit:

- no embedded exchange routing;
- no oracle dependency for payout execution;
- no custody by the application backend;
- no hidden admin release path;
- event emissions for indexers and campaign activity feeds.

Future contract modules may add milestone payments, cancellation windows, bond-based dispute resolution, and configurable approval policies.

---

## Multi-Currency Payment Flow

```text
Local currency
  -> SEP-24 deposit flow
  -> Stellar anchored asset
  -> Soroban campaign escrow
  -> Creator wallet payout
  -> SEP-24 withdrawal flow
  -> Local currency
```

AdsBazaar is stablecoin-native and local-currency-aware. A campaign can be funded in a supported Stellar asset while the interface presents equivalent values for creators in their preferred currency.

The production payment design separates three concerns:

| Concern | System of record |
| --- | --- |
| Campaign obligations | Soroban escrow contract |
| Fiat deposit and withdrawal status | Anchor SEP-24 transaction state |
| Exchange rate display and optional conversion | Stellar DEX and off-chain quote services |

---

## SEP-24 Integration Model

The backend service is expected to mediate SEP-24 flows without taking custody of user funds.

Planned backend responsibilities:

- discover supported anchors and assets;
- initiate SEP-24 interactive deposit and withdrawal sessions;
- validate anchor callbacks and webhook signatures;
- map anchor transaction IDs to AdsBazaar campaign funding events;
- surface deposit and withdrawal status to the frontend;
- keep an indexed view of contract events for fast campaign discovery.

This architecture allows wallets and anchors to handle KYC, fiat collection, and local payment compliance while AdsBazaar focuses on campaign workflow and escrow enforcement.

---

## Supported Assets

The asset list below represents the product direction for launch markets. Final production support depends on anchor availability, liquidity, compliance requirements, and testnet/mainnet verification.

| Asset | Region | Expected rail |
| --- | --- | --- |
| XLM | Global | Native Stellar account funding and fees |
| USDC | Global | Circle-issued Stellar USDC |
| EURC | Europe | Euro stablecoin and SEPA-oriented flows |
| NGN-denominated asset | Nigeria | Bank-transfer-connected Stellar anchor |
| KES-denominated asset | Kenya | Mobile-money-connected anchor |
| BRL-denominated asset | Brazil | Regional Stellar anchor |
| West African CFA-denominated asset | West Africa | Regional anchor support where available |

> [!IMPORTANT]
> Asset symbols, issuers, trustline requirements, and anchor availability should be configured from verified network metadata before production deployment. Do not hardcode issuer assumptions in client code.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Smart contracts | Soroban, Rust, `soroban-sdk` |
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| Backend | Node.js service scaffold; planned Express/TypeScript API |
| Payments | Stellar assets, Stellar token interface, SEP-24 anchors |
| Exchange and quotes | Stellar DEX, Horizon/Soroban RPC, off-chain quote adapters |
| Identity direction | Wallet identity, social profile links, optional ZK/KYC integrations |
| Monorepo | pnpm workspaces |

---

## Repository Structure

```text
.
├── apps
│   ├── backend
│   │   ├── src/index.js
│   │   └── .env.example
│   └── frontend
│       ├── app/
│       ├── public/
│       └── .env.example
├── packages
│   └── contracts
│       ├── src/lib.rs
│       ├── Cargo.toml
│       └── package.json
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## Local Development

### Prerequisites

- Node.js 18 or newer
- pnpm
- Rust stable toolchain
- `wasm32-unknown-unknown` Rust target
- Stellar CLI for contract deployment

Install the Rust WASM target:

```bash
rustup target add wasm32-unknown-unknown
```

### Install Dependencies

```bash
pnpm install
```

### Configure Environment

```bash
cp apps/frontend/.env.example apps/frontend/.env.local
cp apps/backend/.env.example apps/backend/.env
```

### Run the App

```bash
pnpm dev
```

Default local services:

| Service | URL |
| --- | --- |
| Frontend | `http://localhost:3000` |
| Backend health check | `http://localhost:4000/health` |

You can also run workspaces independently:

```bash
pnpm frontend
pnpm backend
```

---

## Smart Contract Commands

From the repository root:

```bash
pnpm contracts:build
pnpm contracts:test
```

From the contract package:

```bash
cd packages/contracts
cargo fmt --all
cargo test
cargo build --target wasm32-unknown-unknown --release
```

Deploy with Stellar CLI once your network profile, account, and RPC settings are configured:

```bash
pnpm --filter "@ads-bazaar/contracts" deploy:testnet
```

---

## Testing

Current test coverage is concentrated on the Soroban contract scaffold.

```bash
pnpm test
```

Recommended production test coverage:

| Area | Tests to add |
| --- | --- |
| Contract escrow | Funding, payout, fee accounting, duplicate claims, deadline behavior |
| Campaign workflow | Application limits, selection permissions, proof submission rules |
| Disputes | Participant authorization, status transitions, moderator/resolution flow |
| SEP-24 | Anchor session creation, callback validation, failed deposit recovery |
| Frontend | Wallet states, campaign creation form, creator application flow |
| Indexer | Event ingestion, replay safety, idempotent updates |

---

## Security Considerations

AdsBazaar handles payment workflows and should be treated as financial infrastructure.

Current and planned security principles:

- minimize contract surface area and keep escrow logic auditable;
- require wallet authorization for business and creator actions;
- avoid backend custody of campaign funds;
- emit contract events for independent indexing and reconciliation;
- validate SEP-24 callbacks server-side before updating application state;
- keep issuer addresses, anchor metadata, and network configuration explicit;
- add contract tests for all payout and dispute edge cases before mainnet deployment;
- complete external review before handling production campaign value.

Known areas requiring additional work before production:

- formal dispute resolution design;
- campaign cancellation and refund rules;
- anchor compliance review per region;
- treasury and fee governance policy;
- rate-limit and abuse protection for campaign creation and applications;
- independent contract audit.

---

## Roadmap

| Phase | Focus | Status |
| --- | --- | --- |
| 0 | Monorepo, frontend scaffold, Soroban contract scaffold | In progress |
| 1 | Campaign creation UI, wallet connection, contract deployment to Stellar testnet | Planned |
| 2 | Creator application and proof submission flows | Planned |
| 3 | Backend event indexer and notification service | Planned |
| 4 | SEP-24 deposit and withdrawal integration with initial anchors | Planned |
| 5 | Dispute resolution, localization, analytics, production hardening | Planned |
| 6 | Mainnet launch with audited contracts and verified asset registry | Planned |

---

## Open-Source Vision

AdsBazaar is intended to become reusable infrastructure for stablecoin-native creator commerce.

The open-source priorities are:

- publish auditable Soroban escrow contracts;
- document real anchor integration patterns for emerging-market payment flows;
- provide reusable campaign, payout, and creator workflow components;
- make multi-asset UX patterns easier for Stellar builders to copy;
- create a reference application that combines Stellar assets, Soroban, and SEP standards in one coherent product.

---

## Ecosystem Impact

AdsBazaar contributes to the Stellar ecosystem by turning payment primitives into a concrete commercial workflow.

The project is designed to:

- increase useful demand for Stellar stablecoins and anchored local assets;
- create repeatable payment volume across small creator payouts;
- demonstrate SEP-24 in a consumer-facing marketplace;
- provide an open-source Soroban escrow reference for services marketplaces;
- support African payment infrastructure through real business and creator use cases.

---

## Contributing

Contributions are welcome, especially in areas where Stellar infrastructure, emerging-market payments, and creator tools intersect.

### Workflow

1. Fork the repository.
2. Create a branch from `dev` or the active integration branch.
3. Keep changes scoped and documented.
4. Add or update tests for contract and payment behavior.
5. Open a pull request with a clear summary, screenshots for UI changes, and notes on any security-sensitive logic.

### Commit Style

Use conventional commits:

```text
feat: add creator proof submission flow
fix: prevent duplicate escrow payout claims
docs: document SEP-24 callback validation
test: cover campaign selection limits
```

### Good First Contribution Areas

- contract tests for deadline and payout edge cases;
- frontend campaign creation form;
- Stellar wallet connection flow;
- SEP-24 integration documentation;
- localization groundwork for English, Swahili, Hausa, Yoruba, and French;
- diagrams for campaign lifecycle and payment settlement.

Open an issue before starting large protocol, contract, or payment-flow changes.

---

## Current Status

AdsBazaar is pre-mainnet and under active development.

Current repository state:

- Next.js frontend workspace is present.
- Backend service scaffold is present.
- Soroban escrow contract scaffold is present.
- Foundry/EVM placeholder contract has been removed.
- Production Stellar testnet deployment is pending.
- SEP-24 anchor integrations are planned but not yet production-connected.

This README describes both the current implementation and the intended production architecture so contributors, reviewers, and ecosystem partners can evaluate the direction clearly.

---

## Team

- X/Twitter: [@AdsBazaar5](https://twitter.com/AdsBazaar5)
- GitHub: [JamesVictor-O](https://github.com/JamesVictor-O)

---

## License

License information should be added before production release. Until a license is committed, all rights are reserved by the project owner.
