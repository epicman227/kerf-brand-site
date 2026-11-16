---
tags: [design, landing-pages, motion, references, kerf]
created: 2026-11-04
---

# Design references (landing pages and motion)

Galleries and tools to study before building or revising any Kerf page.

## Galleries

- [Land-book](https://land-book.com/) - large curated landing page gallery; filter by industry and style. Use for hero and section structure.
- [Landdding](https://landdding.com/) - daily-updated gallery of landing pages across ~40 categories (SaaS, AI, Agency, Service). Use for comparing competitors in the Service and Agency tags.
- [60fps.design](https://60fps.design/) - ~2,100 UI animation shots from real apps. Motion vocabulary: spring physics, stagger, shimmer, morph, parallax, pulse, reveal, sequence, ticker, particles, glow. Gesture tags: drag, swipe, scroll, scrub, hold.
- [MotionSites AI](https://motionsites.ai/) - animated hero, feature, pricing, CTA and background previews, organized by section type. Use for ideas on animated backgrounds and hero motion; treat as inspiration, not a template source.

## Tools

- [Impeccable (GitHub)](https://github.com/pbakaus/impeccable) - design vocabulary and slop detector for AI coding agents (Claude Code, Cursor, Codex). Commands: bolder, quieter, distill, colorize, typeset, layout, animate, delight, critique, audit, polish, harden.

## Rules distilled (apply to every Kerf page)

Anti-slop (from Impeccable):
- Not Inter for everything. Kerf: Sora display, Inter body, JetBrains Mono numbers.
- No purple-to-blue gradients. Kerf gradient is sap green to canopy only, used as glow and on one headline word.
- No cards nested in cards. No icon tile above every heading.
- No gray text on colored backgrounds. Secondary text is mist on ink.
- No skipped heading levels, no cramped padding.

Motion (from 60fps):
- One ambient motion per screen (hero glow drift). Everything else is triggered: scroll reveal with stagger, count-up on stats, hover lift 2px, accordion morph.
- Durations 200 to 600ms, ease-out for entrances, spring only on small elements.
- Respect prefers-reduced-motion: remove drift and parallax, keep opacity reveals.

Landing page structure that converts (service SaaS):
1. Hero: outcome headline, one amber CTA, proof row with sources.
2. Pain in the prospect's own numbers (calculator).
3. How it works as a scroll-pinned sequence.
4. Proof: real results, credentials, security, comparison vs alternatives.
5. Pricing with one highlighted tier.
6. FAQ that answers objections.
7. One final CTA.

## Kerf pages

- Main: tree care / arborist focus (index).
- Sub: general service trades (trades), same system, different imagery and copy.
