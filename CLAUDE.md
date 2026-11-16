# Kerf: project handoff for Claude Code

Read this whole file before doing anything. It is the complete state of the Kerf project as of 2026-11-04 (evening, Denver time), handed off from a Claude chat session.

## What Kerf is

Kerf is a new company: **the AI front office for tree care companies** (and, on a sub-page, general home-service trades). It answers every inbound call 24/7, texts back every missed call within 60 seconds, qualifies the job, books the estimate on the owner's calendar, pushes the lead into their CRM (Housecall Pro, Jobber, ServiceTitan, GoHighLevel) or a Kerf job board, chases every open quote with a 5-touch sequence, and asks for the review when the job closes.

Founder: Connor Grovenor, ISA Certified Arborist, owner-operator of a Front Range tree company. Kerf is a **completely separate brand**; never reference his tree company by name in any Kerf material. The anonymized phrase is "a Front Range tree care company."

Goal: **$25,000 collected by Dec 31, 2026** (7 clients: 4 Close, 2 Capture, 1 Grow), and more importantly 7 live clients paying ~$5k/month combined going into January.

## Repo layout (this folder)

```
kerf/
  CLAUDE.md                 this file
  Design References.md      design gallery links + distilled rules (also goes in Obsidian)
  brand/
    BRAND.md                brand spec: palette, type, voice, logo rules
    kerf-mark.svg           gradient mark (ring cross-section with a kerf cut)
    kerf-mark-mono.svg      currentColor mark
    kerf-wordmark.svg       mark + "kerf" for dark grounds
    kerf-wordmark-dark-on-light.svg
  images/                   16 WebP photos (Higgsfield-generated), see list below
    logos/                  EMPTY. Drop official partner logos here as <slug>.svg|png
  site/
    src/App.jsx             React components for both pages
    src/content.js          per-page copy (index = tree care, trades = other trades)
    src/styles.css          brand tokens as CSS variables, all motion
    src/main.jsx
    build.mjs               esbuild build, image- and logo-aware, writes dist/index.html + dist/trades.html
    shot.mjs, shot2.mjs     Playwright screenshot scripts (390x844 and 1440x900)
    dist/                   built output (index.html, trades.html, images/)
  ds/project/               Design System artifact source (tokens.json, README.md, cover)
  workbook/
    Kerf-Buildout-and-Agent-Setup.xlsx   8 sheets: Buildout, Agent Setup, Routines, Tool Stack, Pricing Model, 8-Week Sprint, Prospect List, Client Onboarding
    build_workbook.py       regenerates the workbook
```

## Published artifacts (claude.ai)

- Business plan (12 sections): https://claude.ai/artifact/FmDx5zX4zWmwhotkqD6jbS
- Brand kit / design system: https://claude.ai/artifact/Ea1C2ktNgpeajSd6NvUV8r
- Website (index + trades.html): https://claude.ai/artifact/3bm23QZzj4ycuyvkBW8Fm2 (artifact slug 150cb149-9f40-48c8-b8b8-c2b6f541e159, last version 1793845616-e831)
- Research that led here (why not trading bots): https://claude.ai/artifact/1ygSVaS9kouwSnrepP2D13

## Brand rules (short form; full spec in brand/BRAND.md)

- Name is `kerf` lowercase in the wordmark, `Kerf` in prose. A kerf is the cut a saw blade takes.
- Palette: ink #0A0F0D (ground), pine #0B2A1F (cards), canopy #0B5C44, kerf #1FB26A (brand green), sap #C8F24D (highlight), bark #F2A43A (the ONE primary CTA per screen), bone #F4F1EA (text), mist #B9CFC4 (secondary text). Gradient "kerf-cut": sap to kerf to canopy at 135deg, used only as a glow, on the mark, and on one headline word. **No blue, no purple, ever.**
- Type: Sora 600/700 display, Inter body, JetBrains Mono for eyebrows (uppercase +0.08em) and stats. Google Fonts.
- Voice: tradesman-plain, numbers over adjectives, no hype words, no emojis, **no em dashes**.
- Anti-slop (Impeccable): no icon tiles above headings, no cards nested in cards, no gray text on colored backgrounds.
- Imagery: real arborists, trucks, homeowners at golden hour/dusk. No stock office people, robots, circuit brains.
- **No fabricated testimonials, reviews, client names or metrics.** The site says "Client results published as they come in." The first real one replaces that line.
- Do not draw third-party logos. The integrations strip renders text wordmarks until official press-kit logos are placed in `images/logos/` (slugs: jobber, housecall-pro, servicetitan, gohighlevel, quickbooks, google-business-profile, calendly, stripe).

## The offer

| | Capture | Close (most popular) | Grow |
|---|---|---|---|
| Setup | $1,500 | $2,500 | $3,500 |
| Monthly | $497 | $797 | $1,197 |
| Includes | AI receptionist on their number, 60-second missed-call text-back, intake form + photo capture, booking into their calendar, lead push to CRM or Kerf job board, weekly report | Capture + 5-touch estimate follow-up (SMS + email), quote-aging alerts (3/7/14 days), review request on job done, monthly report call | Close + Google review responses (drafted for approval), seasonal reactivation campaigns, lead-source dashboard, quarterly strategy call |

12-month agreement, 60-day out after month three, setup due at signing, monthly billed by Stripe from go-live. Add-ons: Spanish receptionist +$150/mo, extra line +$75/mo, landing page $1,500, rush go-live +$500. Guarantee on the site: no estimate booked in the first 30 days, setup fee refunded (founder should confirm he wants to stand behind this).

## Onboarding lanes (one front office, three adapters)

Kerf never automates the client's software. The front office (phone, text-back, intake, booking, follow-up, reviews, reporting) lives in Kerf's stack, identical per client, and the last step maps a canonical lead record into whatever they use.

- **Lane A, no CRM** (QuickBooks + cell phone): Kerf provides the full front office plus the Kerf job board (shared sheet first, then the Kerf app).
- **Lane B, Housecall Pro / Jobber / ServiceTitan / GHL / FieldPulse:** native Make.com or Zapier app or API adapter: Create Client, Create Request/Job, Schedule Visit, Update Status. Build order: Housecall Pro, Jobber, GHL, ServiceTitan.
- **Lane C, other:** webhook paste, email-to-inbox, or CSV; quoted after a 30-minute audit.

Canonical lead record: contact, phone, email, address, service type (removal/pruning/stump/PHC/storm/other), tree count and size notes, urgency, photos, source, booked slot, estimator, quote amount/date/status, job status, review requested date.

## Operations stack and security rules

Per client: Quo number + inbox, hosted intake form, Calendly or their scheduler, Make.com scenario folder cloned from the kit, client CRM or Kerf job board, Stripe subscription, 1Password vault. Fixed Kerf costs ~$185 to $435/month; per-client variable ~$35 to $65/month.

Rules that go in the MSA and in every agent prompt:
1. Kerf never takes a password: limited user or scoped API key only.
2. One vault, one Make connection, one Quo inbox per client.
3. **Client credentials never go on the Grok Bot shared cloud computer** (all Bots on an account share one machine and its logins). Grok Bots do research, drafting, content, reporting from Kerf-owned data only. Anything that authenticates into a client system runs in Make.com or Claude Code with scoped secrets.
4. Money never moves without the founder: no invoice, refund, purchase, or campaign to a client's customers without approval.
5. A2P 10DLC registered per client in the client's name; STOP honored at carrier level; no cold SMS to consumers.
6. Offboarding: CSV export, number ported/released, keys revoked, vault deleted, written confirmation, 10 business days.

## Agent team (full prompts in workbook, sheet "Agent Setup")

Grok Bots (xAI, scheduled routines, no client creds): **Prospector** (6am daily, score 50 companies on missed-call signals), **Outreach** (drafts personalized email/text/DM under the founder's name; first 50 approved individually, cap 30/day, books into Calendly), **Content** (Kerf social, weekly newsletter, case-study drafts), **Reporter** (Monday 7am digest).

Claude Code (scheduled tasks, holds the kit and scoped secrets): **Onboarder** (clones kit per client from kickoff transcript), **QA** (Sunday 9pm scripted test calls/texts per client number), **Account Manager** (Friday 4pm per-client report, flags upsell/churn), **Builder** (site, calculator, job board, next CRM adapter).

Handoffs go through a shared "Pipeline" Google Sheet. Reverse-prompt every Grok Bot on day one ("interview me about Kerf before we set anything up"). One bot, one job. Acceptance criteria on every routine. Kill switch: any agent sending over its cap or to anyone not on the pipeline sheet is paused.

## Website: how to build and republish

```
cd site
node build.mjs          # esbuild (preinstalled 0.28) + React 19; npm registry was blocked in the chat sandbox, npm may work here
node shot2.mjs          # Playwright screenshots to shots2/
```
`build.mjs` copies any `images/<name>.webp` from the list it knows and any `images/logos/<slug>.svg|png` into `dist/`, and sets `__KERF_IMAGES__` / `__KERF_LOGOS__` flags so slots render photos/logos when present and gradient/text fallbacks otherwise. Both pages share components; per-page copy is in `src/content.js`.

Republish to the existing artifact (patch mode, same slug, base_version = last version above) with dist/index.html as index.html, dist/trades.html as trades.html, and every dist/images/** file at the same relative path. Artifact CSP: no remote images, no fetch to other hosts, no window.open; forms must preventDefault; Google Fonts allowed.

Open TODOs on the site:
- Swap the Calendly placeholder: search `Swap this href` in src/App.jsx.
- Wire the contact form to a Make.com webhook that writes to the Pipeline sheet and texts the founder.
- Drop official partner logos into images/logos/.
- The how-it-works phone mockup's 4th state (review) is sparse at desktop; add a second card.
- Privacy policy page (call recording notice, lead data) and terms.
- Deploy to a real domain (Vercel) once the domain is bought; dist/ is static and ready.

Images available in `images/` (all WebP): hero (arborist in canopy), hero-bg (tree-ring abstract), rings (glowing kerf log), foreman (truck cab with app), homeowner (porch, split cottonwood), homeowner-text (kitchen table, phone), crew (bucket truck), crane (crane pick at dawn), arborist-portrait (4:5), phone-dash, stump, hvac, plumber, landscaping, roofing, gradient-bg (unused). All generated in Higgsfield; originals are in Connor's Higgsfield library.

## 8-week sprint (Nov 4 to Dec 31)

| Week | Build | Sales target |
|---|---|---|
| 1 (Nov 4-10) | Entity, bank, Stripe, domain, hello@ email, 1Password. Site live. Extract product kit from founder's own stack. Spin up 8 agents. | 300-company list |
| 2 (Nov 11-17) | Kit tested on dummy client. MSA/SOW attorney review. | 150 contacted, 8 calls, 2 proposals |
| 3 (Nov 18-24) | First real onboardings | 2 signed |
| 4 (Nov 25-Dec 1) | 2 live, weekly report running | 4 signed; expand list to UT/AZ/TX |
| 5 (Dec 2-8) | 4 live, QA bot weekly | 5 signed |
| 6 (Dec 9-15) | Kerf job board hardened | 6 signed |
| 7 (Dec 16-22) | Offboarding SOP, support inbox | 7 signed, 6 live |
| 8 (Dec 23-31) | Year-end review, Q1 price increase plan | $25k collected, 7 live |

Founder does only: discovery calls (11:30 to 1:00 daily), approves first 50 outreach messages, 20-minute go-live call per client, Monday 7:30am report review.

## First five actions

1. Register LLC/DBA, bank, Stripe, domain (kerf.co or best available), Google Workspace hello@.
2. Replace the Calendly link on the site; wire the form to Make.com.
3. Spin up the 4 Grok Bots and 4 Claude Code routines from the Agent Setup sheet; run Prospector's first 50.
4. Export the founder's intake/estimate/follow-up automations into a `kit/` folder here, strip every reference to the tree company, test on a dummy client.
5. Send the first 30 outreach messages Monday Nov 10.

## Things decided and not to relitigate

- Trading bots (memecoin copy-trading, Kalshi 15-min BTC) are shelved; research showed negative expectancy after fees for retail agents. A paper-only Kalshi R&D bot is allowed at 10% effort, no real money until 500+ paper trades show positive after-fee edge.
- Real estate wholesaling: parked.
- Fake testimonials: never.
- Pricing floor is Capture at $497; raise prices after 10 clients.

## Kill criteria

300 contacts and under 5 discovery calls by Nov 30: stop outreach and fix the offer. A third client taking over 6 founder hours to onboard: the kit is broken, fix the kit. Fewer than 3 paying clients by Jan 15, 2027 after 500+ contacts and 20+ calls: stop and reassess before spending more.
