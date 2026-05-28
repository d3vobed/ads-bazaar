# AdsBazaar Soroban Contracts

Soroban contract package for AdsBazaar campaign escrow.

## Commands

```bash
cargo fmt --all
cargo test
cargo build --target wasm32-unknown-unknown --release
```

Or from the repository root:

```bash
pnpm contracts:build
pnpm contracts:test
```

## Contract

`src/lib.rs` contains the initial `AdsBazaarEscrow` contract scaffold:

- campaign creation and escrow funding;
- creator applications;
- business selection;
- proof submission;
- submission approval;
- creator payout claims;
- dispute flagging.

This package is pre-audit and not ready for mainnet value.
