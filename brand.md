# Brand — AdsBazaar

_Status: deferred_

The user provided an explicit, pixel-level color/typography spec (dark Material-You-inspired palette: `#121212` background, `#1A1A1A` surface, `#add500`/`#c8f232` lime-green accent, Sora + Geist fonts) directly in the GitHub issue for the Creator Dashboard. That spec is the source of truth for this dashboard's visual design — running `brand-design` would generate an unrelated palette and conflict with it.

The marketing site and other dashboards (e.g. `/dashboard/business`) continue to use the existing `--lime`/`--paper`/`--ink` tokens defined in `app/globals.css`. The creator dashboard introduces its own scoped `--dash-*` tokens for its dark theme — see `app/globals.css`.

To set up a project-wide brand palette at any time, run:

    /brand-design

or say: "pick brand colors"

_Deferred at: 2026-06-16_
