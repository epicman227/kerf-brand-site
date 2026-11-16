from datetime import date, timedelta
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.utils import get_column_letter
from openpyxl.comments import Comment

FONT = "Calibri"
PINE = "0B2A1F"
BONE = "F4F1EA"
SAP = "C8F24D"
MIST = "E8F1EC"
INK = "0A0F0D"
ASH = "5E6F68"

hdr_font = Font(name=FONT, bold=True, color=BONE, size=11)
hdr_fill = PatternFill("solid", fgColor=PINE)
key_fill = PatternFill("solid", fgColor=SAP)
band_fill = PatternFill("solid", fgColor=MIST)
body = Font(name=FONT, size=10)
bold = Font(name=FONT, size=10, bold=True)
title_font = Font(name=FONT, size=16, bold=True, color=PINE)
sub_font = Font(name=FONT, size=10, italic=True, color=ASH)
input_font = Font(name=FONT, size=10, color="0000FF")
thin = Side(style="thin", color="C9D6CF")
border = Border(left=thin, right=thin, top=thin, bottom=thin)
wrap = Alignment(wrap_text=True, vertical="top")
center = Alignment(horizontal="center", vertical="top", wrap_text=True)

STATUS = '"Not started,In progress,Blocked,Done"'
OWNER = '"Connor,Grok Bot,Claude Code,Make.com,Client"'

wb = Workbook()


def style_header(ws, row, ncols):
    for c in range(1, ncols + 1):
        cell = ws.cell(row=row, column=c)
        cell.font = hdr_font
        cell.fill = hdr_fill
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        cell.border = border


def style_body(ws, r1, r2, ncols, align=None):
    for r in range(r1, r2 + 1):
        for c in range(1, ncols + 1):
            cell = ws.cell(row=r, column=c)
            if cell.font == Font():
                cell.font = body
            cell.border = border
            cell.alignment = align or wrap


def widths(ws, ws_widths):
    for i, w in enumerate(ws_widths, start=1):
        ws.column_dimensions[get_column_letter(i)].width = w


def title(ws, text, subtitle=None):
    ws["A1"] = text
    ws["A1"].font = title_font
    if subtitle:
        ws["A2"] = subtitle
        ws["A2"].font = sub_font


START = date(2026, 11, 4)


def wk(n, offset=6):
    """Due date = end of sprint week n (1-based)."""
    return START + timedelta(days=(n - 1) * 7 + offset)


# =====================================================================
# 1. BUILDOUT
# =====================================================================
ws = wb.active
ws.title = "Buildout"
title(ws, "Kerf Buildout Sheet",
      "Every task to take Kerf from zero to live. Edit Owner/Status with the dropdowns. Due dates are end of sprint week (sprint starts Nov 4, 2026).")
ws["A3"] = "Legend: blue text = inputs you edit. Phase 0 is foundation; Phases 1-3 must finish by end of Week 2."
ws["A3"].font = sub_font
HEAD = 5
cols = ["Phase", "#", "Task", "Detail", "Owner", "Tool", "Est. cost ($)", "Est. hours", "Due", "Status", "Notes"]
for i, h in enumerate(cols, 1):
    ws.cell(row=HEAD, column=i, value=h)
style_header(ws, HEAD, len(cols))

# (phase, task, detail, owner, tool, cost, hours, week, notes)
tasks = [
    # Phase 0 Foundation
    ("0 Foundation", "Form entity: Kerf LLC (or DBA under an existing LLC)", "Colorado SOS filing. Keep it a separate entity from the tree company for liability and clean books.", "Connor", "CO Secretary of State", 50, 1, 1, "Check 'Kerf' name availability on SOS and USPTO first."),
    ("0 Foundation", "EIN + business bank account", "Apply for EIN online (free). Open a dedicated checking account; all Stripe payouts land here.", "Connor", "IRS / bank", 0, 1, 1, ""),
    ("0 Foundation", "Register kerf domain + Google Workspace", "Buy best available kerf domain (.co, .ai, .app or kerf-hq style). One Workspace seat for hello@ and connor@.", "Connor", "Registrar, Google Workspace", 27, 1, 1, "$20 domain + $7/mo Workspace."),
    ("0 Foundation", "Stripe account", "Products: 3 tiers (setup one-time + monthly subscription), add-ons. Enable invoicing + ACH.", "Connor", "Stripe", 0, 1, 1, "Stripe fees ~2.9% + 30c; ACH 0.8% capped."),
    ("0 Foundation", "1Password Teams vault structure", "One vault per client. Shared 'Kerf Ops' vault for Kerf's own tools. No client creds ever on Grok Bot computer.", "Connor", "1Password", 20, 1, 1, ""),
    ("0 Foundation", "Insurance quotes: E&O + cyber liability", "You will hold client phone numbers and customer data. Get 2 quotes (Hiscox, Next, Thimble).", "Connor", "Insurer", 0, 1, 2, "Typically $40-90/mo for a solo tech services firm."),
    ("0 Foundation", "Bookkeeping setup", "QuickBooks Simple Start or Wave; Stripe connected; separate from tree company books.", "Connor", "QuickBooks / Wave", 0, 1, 2, ""),
    ("0 Foundation", "Kerf Calendly: 'Kerf Discovery Call (20 min)'", "Separate Calendly event under the kerf Workspace account. Weekday evening + Saturday slots.", "Connor", "Calendly", 0, 1, 1, "Zoom or phone. Reminders at 24h and 1h."),
    # Phase 1 Brand & site
    ("1 Brand & site", "Finalize brand kit", "Palette, type, logo (mark + wordmark), voice rules. Design System artifact is the source of truth.", "Claude Code", "Design System artifact", 0, 2, 1, "Done in build session Nov 4."),
    ("1 Brand & site", "Logo exports", "SVG + PNG (512, 1024), favicon, social avatar (1:1), OG image (1200x630).", "Claude Code", "SVG / sharp", 0, 1, 1, ""),
    ("1 Brand & site", "Landing page live on kerf domain", "React single page: hero, how it works, tiers, founder case study, FAQ, lead form -> Calendly. Deploy on Vercel.", "Claude Code", "React, Vercel", 0, 6, 1, "Artifact built Nov 4; move to Vercel with custom domain."),
    ("1 Brand & site", "Lead form -> Make.com -> Kerf pipeline", "Form posts to webhook; creates deal in pipeline sheet/Kerf app; notifies Connor by text; auto-reply email with Calendly link.", "Make.com", "Make.com, Resend", 0, 2, 1, ""),
    ("1 Brand & site", "Anonymize founder case study", "Refer to 'a Front Range tree care company'. Real numbers: calls captured, after-hours bookings, quote close rate. No company names.", "Connor", "Doc", 0, 1, 1, "Pull numbers from your own Quo/QuoteIQ history."),
    ("1 Brand & site", "Google Business Profile for Kerf", "Category: Software company / Marketing agency. Service area: Denver metro + CO. Photos, hours, booking link.", "Grok Bot", "Google Business Profile", 0, 1, 2, ""),
    ("1 Brand & site", "Social handles: X, Instagram, LinkedIn, YouTube", "Claim @kerfhq (or similar) everywhere. Bio + link. Content Bot takes over after week 2.", "Grok Bot", "Social platforms", 0, 1, 1, ""),
    ("1 Brand & site", "Email domain auth (SPF, DKIM, DMARC)", "Required before any outreach or client notifications; protects deliverability.", "Claude Code", "DNS", 0, 1, 1, ""),
    # Phase 2 Product kit
    ("2 Product kit", "Receptionist script template v1", "Greeting, intake questions (address, service, urgency, photos), after-hours flow, emergency escalation, Spanish variant. Variables for company name, service area, pricing stance.", "Claude Code", "Quo / Sona", 0, 4, 1, "Base it on the flow that already works for you, with brand variables stripped."),
    ("2 Product kit", "Missed-call text-back template", "Fires within 60s of a missed call: apology, intake link, booking link, 'reply STOP to opt out'. 3 variants by time of day.", "Claude Code", "Quo, Make.com", 0, 1, 1, ""),
    ("2 Product kit", "Intake form template", "Service type, address, tree count/size, access, photo upload, preferred times, how they found you. Redirect to booking page on submit.", "Claude Code", "QuoteIQ forms / Tally / Kerf app", 0, 2, 1, "Lane A uses Kerf form; lane B maps to CRM request form where available."),
    ("2 Product kit", "Make.com scenario template: Lane A (no CRM)", "Call/text events -> Kerf job board (Supabase or Sheet) -> owner notifications -> nurture triggers.", "Claude Code", "Make.com", 11, 6, 2, "Export blueprint JSON to kit folder."),
    ("2 Product kit", "Make.com scenario template: Lane B (Housecall Pro)", "Create Customer + Job Request + optional Appointment via HCP API; map canonical lead payload.", "Claude Code", "Make.com, HCP API", 0, 5, 2, ""),
    ("2 Product kit", "Make.com scenario template: Lane B (Jobber)", "Jobber GraphQL: create client, request, assessment. Reuse what you already wrote for Jobber in 2025.", "Claude Code", "Make.com, Jobber API", 0, 4, 2, ""),
    ("2 Product kit", "Make.com scenario template: Lane B (ServiceTitan / GHL)", "ServiceTitan via API partner app or Zapier; GHL via native Make app. Document limits.", "Claude Code", "Make.com, Zapier", 0, 4, 3, "ServiceTitan API access requires their developer program; may fall to Lane C."),
    ("2 Product kit", "Canonical lead payload spec", "One JSON schema: name, phone, email, address, service, urgency, source, notes, photos. Every adapter maps from it.", "Claude Code", "Doc / JSON", 0, 1, 1, ""),
    ("2 Product kit", "Nurture copy bank", "5-touch estimate follow-up (day 1, 3, 7, 14, 30) SMS + email; quote-aging owner nudges; review request; seasonal reactivation (spring pruning, storm prep, PHC, fall removals).", "Claude Code", "Doc", 0, 4, 2, "Write once in tradesman voice; variables for company/owner/service."),
    ("2 Product kit", "Review request flow", "Trigger on job marked done (CRM webhook or owner text 'DONE 1234'). Sends review link; 1 reminder at 3 days.", "Claude Code", "Make.com", 0, 2, 2, ""),
    ("2 Product kit", "GBP review response drafts (Grow tier)", "Daily check of new reviews; draft reply in owner's voice; owner approves by text reply 'OK'.", "Claude Code", "Make.com, GBP API", 0, 3, 4, ""),
    ("2 Product kit", "Weekly client report template", "Calls answered, missed, texted back, intake forms, bookings, quotes chased, reviews requested, est. revenue captured. One page, branded.", "Claude Code", "Google Docs / HTML", 0, 3, 2, ""),
    ("2 Product kit", "Kerf job board (Lane A product)", "Lightweight pipeline: New -> Estimate booked -> Quoted -> Won -> Done. Web + mobile. Supabase backend; owner logs in with magic link.", "Claude Code", "Expo/React, Supabase", 0, 20, 4, "Phase this: Google Sheet fallback for the first Lane A clients, app by week 4-6."),
    ("2 Product kit", "Demo environment", "A fake 'Demo Tree Co' number + job board you can call live on a discovery call.", "Claude Code", "Quo, Make.com", 25, 3, 2, "The live demo closes deals. Keep it flawless."),
    ("2 Product kit", "Kit folder + README", "All templates, blueprints, scripts, prompts in one versioned folder. Onboarder bot reads this.", "Claude Code", "Git repo", 0, 2, 2, ""),
    # Phase 3 Sales engine
    ("3 Sales engine", "Prospect list v1: 200 companies", "Tree, landscape, excavation, snow companies along the Front Range outside Denver proper, then CO Springs, Fort Collins, Grand Junction.", "Grok Bot", "Origami / Apollo / GBP", 29, 4, 1, "Score by missed-call signals; see Prospect List sheet."),
    ("3 Sales engine", "After-hours call audit", "Bot calls each prospect at 6:30pm; logs answered / voicemail / no answer. This is the opener for outreach.", "Grok Bot", "Grok Bot computer-use + phone", 0, 3, 1, "Do not leave messages. Log only."),
    ("3 Sales engine", "Outreach sequence: email (4 touches)", "Touch 1: 'I called you at 6:30 Tuesday and got voicemail' + stat. Touch 2: founder story. Touch 3: case study. Touch 4: breakup.", "Grok Bot", "Instantly / Workspace", 47, 3, 2, "Cap 30 sends/day. Unsubscribe honored instantly."),
    ("3 Sales engine", "Outreach sequence: Instagram/Facebook DM", "Short, peer-to-peer, from Connor's personal account, not a brand account.", "Grok Bot", "IG / FB", 0, 2, 2, "Drafts only; Connor sends the first 50 personally."),
    ("3 Sales engine", "Outreach sequence: phone + text", "Call during 10-11am or 2-3pm; text if no answer with the Calendly link.", "Connor", "Quo", 0, 0, 2, "Connor's own calls. 10/day minimum."),
    ("3 Sales engine", "Discovery call script (20 min)", "5 min their phone situation, 5 min live demo (call the demo number), 5 min tier fit, 5 min close + contract link.", "Claude Code", "Doc", 0, 2, 1, ""),
    ("3 Sales engine", "Proposal template", "One-page PDF: their missed-call math, chosen tier, setup + monthly, timeline, what you need from them.", "Claude Code", "Google Docs / PDF", 0, 2, 1, ""),
    ("3 Sales engine", "Contract: MSA + SOW", "12-month term, setup at signing, 60-day out after month 3, SLA, data access clause, TCPA/A2P clause, limitation of liability, auto-renew.", "Connor", "Attorney + template", 750, 2, 2, "One attorney review, then reuse."),
    ("3 Sales engine", "E-signature + payment link flow", "Proposal accepted -> DocuSign/PandaDoc -> Stripe setup invoice -> onboarding questionnaire auto-sent.", "Make.com", "PandaDoc, Stripe, Make.com", 19, 2, 2, ""),
    ("3 Sales engine", "Onboarding questionnaire", "Company info, phone provider, CRM, calendar, service list + price ranges, service area, hours, who gets notified, voice/tone, Spanish?", "Claude Code", "Tally / Kerf app", 0, 1, 2, ""),
    ("3 Sales engine", "Pipeline tracker", "Prospect -> Contacted -> Call booked -> Proposal -> Signed -> Onboarding -> Live. Feeds Reporter bot.", "Claude Code", "Sheet / Kerf app", 0, 1, 1, ""),
    ("3 Sales engine", "Referral offer", "$500 credit per referred client that signs. Mention at go-live and at 30-day review.", "Connor", "Doc", 0, 1, 3, ""),
    # Phase 4 Agent team
    ("4 Agent team", "Grok Bot account + usage plan", "Start on X Premium ($30) or Cursor Pro ($20). Upgrade only when the weekly pool is the bottleneck.", "Connor", "Grok Bot", 30, 1, 1, "All Bots share one cloud computer. No client creds on it."),
    ("4 Agent team", "Prospector Bot setup", "Role, routine (daily 5am list refresh), tools (browser, sheets), output format. Paste system prompt from Agent Setup sheet.", "Connor", "Grok Bot", 0, 1, 1, ""),
    ("4 Agent team", "Outreach Bot setup", "Role, 30/day cap, approval mode for first 50, Calendly link, suppression list.", "Connor", "Grok Bot", 0, 1, 2, ""),
    ("4 Agent team", "Content Bot setup", "Weekly cadence: 3 X posts, 2 IG posts, 1 LinkedIn, 1 blog. Founder-voice pieces flagged for Connor.", "Connor", "Grok Bot", 0, 1, 2, ""),
    ("4 Agent team", "Reporter Bot setup", "Monday 7am: pipeline + client summary from Kerf-owned dashboards only.", "Connor", "Grok Bot", 0, 1, 2, ""),
    ("4 Agent team", "Claude Code: Onboarder scheduled task", "Reads kit, clones scenarios per client from questionnaire, outputs a go-live checklist for Connor.", "Claude Code", "Claude Code scheduled tasks", 100, 4, 3, "Claude Max plan."),
    ("4 Agent team", "Claude Code: QA scheduled task", "Weekly: test call + test text to every client number; checks scenario run logs; flags failures to Connor.", "Claude Code", "Claude Code, Make.com API", 0, 3, 3, ""),
    ("4 Agent team", "Claude Code: Account Manager scheduled task", "Friday 4pm: compiles each client's weekly report from Make.com data store; drafts upsell note where metrics justify it.", "Claude Code", "Claude Code, Make.com data stores", 0, 3, 3, ""),
    ("4 Agent team", "Claude Code: Builder sessions", "Ongoing: Kerf app, website, kit improvements. Human-prompted, not scheduled.", "Claude Code", "Claude Code", 0, 0, 2, ""),
    ("4 Agent team", "Approval gate wiring", "Every money or outbound-campaign action routes to Connor via text for 'OK' before executing. Log every approval.", "Make.com", "Make.com, Quo", 0, 2, 2, "Non-negotiable."),
    # Phase 5 Operations
    ("5 Operations", "Support inbox + SLA", "hello@kerf domain; auto-ack within 5 min; Connor responds within 1 business day; emergencies (number down) within 2 hours.", "Make.com", "Workspace, Make.com", 0, 1, 3, ""),
    ("5 Operations", "Status page / health check", "Make.com scenario that pings every client scenario daily and posts status to a simple page.", "Claude Code", "Make.com, Vercel", 0, 2, 4, ""),
    ("5 Operations", "Monday review ritual", "20 min: Reporter summary, pipeline, QA flags, client reports. Adjust one thing.", "Connor", "Calendar", 0, 0, 2, ""),
    ("5 Operations", "Offboarding SOP", "Revoke API keys, remove Kerf user, port or release number, export client data (CSV), delete vault after 30 days, final invoice.", "Claude Code", "Doc", 0, 1, 3, ""),
    ("5 Operations", "Incident runbook", "Number down, scenario failing, SMS carrier filtering, client CRM API change. Who does what, in what order.", "Claude Code", "Doc", 0, 2, 4, ""),
    ("5 Operations", "Monthly cost review", "Make.com ops, Quo minutes, token usage per bot. Kill or resize anything not earning.", "Connor", "Sheet", 0, 0, 4, ""),
    # Phase 6 Growth
    ("6 Growth", "Client case study #1", "After 30 days live: calls captured, bookings, revenue estimate. Written with client approval; anonymized if they prefer.", "Grok Bot", "Doc", 0, 2, 7, ""),
    ("6 Growth", "Video walkthrough of a live Kerf account", "3-minute screen recording for the site and outreach.", "Connor", "Loom", 0, 1, 6, ""),
    ("6 Growth", "ISA Rocky Mountain Chapter + CTCA presence", "Sponsor a chapter email or event; speak on 'the front office problem'. Peer credibility is the moat.", "Connor", "ISA RMC, CTCA", 250, 4, 8, ""),
    ("6 Growth", "Equipment dealer partnerships", "Vermeer, Bandit, Stihl dealers in CO: referral card at the parts counter; co-branded flyer.", "Connor", "In person", 100, 3, 8, ""),
    ("6 Growth", "Expand lists: UT, AZ, TX, Southeast", "Year-round tree markets. Prospector Bot refreshes 200/week once CO list is worked.", "Grok Bot", "Origami / Apollo", 0, 2, 6, ""),
    ("6 Growth", "Seasonal campaign kit for clients (Grow tier)", "Spring pruning, storm prep (May-June), fall removals, winter PHC. Pre-written and scheduled per client.", "Claude Code", "Make.com", 0, 4, 8, ""),
    ("6 Growth", "Pricing review at 10 clients", "Raise setup fees 20% once there is a waitlist. Grandfather existing clients.", "Connor", "Sheet", 0, 1, 8, ""),
]

r = HEAD + 1
for i, (ph, t, d, o, tool, cost, hrs, w, notes) in enumerate(tasks, 1):
    ws.cell(row=r, column=1, value=ph)
    ws.cell(row=r, column=2, value=i)
    ws.cell(row=r, column=3, value=t).font = bold
    ws.cell(row=r, column=4, value=d)
    ws.cell(row=r, column=5, value=o).font = input_font
    ws.cell(row=r, column=6, value=tool)
    ws.cell(row=r, column=7, value=cost).number_format = '$#,##0;($#,##0);-'
    ws.cell(row=r, column=8, value=hrs)
    ws.cell(row=r, column=9, value=wk(w)).number_format = "mmm d"
    ws.cell(row=r, column=10, value="Not started").font = input_font
    ws.cell(row=r, column=11, value=notes)
    r += 1
last = r - 1
style_body(ws, HEAD + 1, last, len(cols))
ws.cell(row=last + 1, column=3, value="Totals").font = bold
ws.cell(row=last + 1, column=7, value=f"=SUM(G{HEAD+1}:G{last})").number_format = '$#,##0'
ws.cell(row=last + 1, column=7).font = bold
ws.cell(row=last + 1, column=8, value=f"=SUM(H{HEAD+1}:H{last})").font = bold
ws.cell(row=last + 2, column=3, value="Done count").font = bold
ws.cell(row=last + 2, column=10, value=f'=COUNTIF(J{HEAD+1}:J{last},"Done")&" / "&COUNTA(J{HEAD+1}:J{last})')
for rr in range(last + 1, last + 3):
    for c in range(1, len(cols) + 1):
        ws.cell(row=rr, column=c).fill = key_fill
        ws.cell(row=rr, column=c).border = border
dv_s = DataValidation(type="list", formula1=STATUS, allow_blank=True)
dv_o = DataValidation(type="list", formula1=OWNER, allow_blank=True)
ws.add_data_validation(dv_s)
ws.add_data_validation(dv_o)
dv_s.add(f"J{HEAD+1}:J{last}")
dv_o.add(f"E{HEAD+1}:E{last}")
ws.freeze_panes = f"A{HEAD+1}"
ws.auto_filter.ref = f"A{HEAD}:K{last}"
widths(ws, [15, 5, 36, 60, 13, 24, 11, 9, 10, 13, 40])

# =====================================================================
# 2. AGENT SETUP
# =====================================================================
ws = wb.create_sheet("Agent Setup")
title(ws, "Kerf Agent Setup Sheet",
      "One row per agent. Paste the System prompt column into the bot verbatim. Grok Bots never hold client credentials; client work runs in Make.com with per-client connections.")
HEAD = 4
cols = ["Agent", "Platform", "Job", "Inputs", "Outputs", "Routine schedule", "Tools / connections", "Approval gate", "Kill / alert condition", "System prompt"]
for i, h in enumerate(cols, 1):
    ws.cell(row=HEAD, column=i, value=h)
style_header(ws, HEAD, len(cols))

agents = [
    ("Prospector", "Grok Bot",
     "Builds and scores a list of tree, landscape, excavation and snow companies that are most likely to be missing calls.",
     "Target regions; Prospect List sheet; Google Business Profile pages; company websites; Origami/Apollo exports",
     "Prospect List rows (company, contact, signals, score); daily 'top 20 to contact' list",
     "Daily 5:00am MT: refresh 25 new prospects + rescore. Weekly Sunday: dedupe and archive dead rows.",
     "Browser; Google Sheets (Kerf prospect sheet, read/write); Origami or Apollo (Kerf login only); no client systems",
     "None for list building. Must never call or message a prospect; that is Outreach's job.",
     "Alert Connor if fewer than 15 valid new rows/day for 3 days, or if any row contains a residential (non-business) number.",
     "Before anything else, interview me about Kerf, our offer, the exact kind of company we sell to, and what you must never do. Ask one question at a time until you can repeat the ideal customer back to me.\n\nYour name is Prospector. You have one job: build and maintain the Kerf prospect list of tree care, landscape, excavation and snow removal companies, starting with the Colorado Front Range outside the City of Denver, then Colorado Springs, Fort Collins, Grand Junction, then UT, AZ and TX.\n\nFor each company capture: name, city, state, phone, email, owner name if public, website, CRM or booking tool if visible on the site, Google Business Profile review count and owner response rate, whether they offer online booking, and whether an after-hours line is advertised. Score each row using the Score formula in the sheet; do not override it.\n\nRules: business numbers only, never personal cell numbers scraped from forums. Never call, text or email anyone. Never log in to any system except Kerf's own prospect sheet and the Kerf Origami/Apollo account. Write 25 new rows per day, dedupe by phone number, and flag rows older than 90 days with no touch for archive.\n\nEvery morning post a short summary to the Kerf ops channel: rows added, top 20 by score, anything that looked off. If you are unsure whether a company fits, add it with a note rather than guessing.\n\nDone looks like: a clean, scored, deduped sheet that Outreach can work top-down without checking your work."),
    ("Outreach", "Grok Bot",
     "Turns the scored prospect list into booked discovery calls on Connor's Calendly, in Connor's voice.",
     "Top-20 list from Prospector; after-hours call audit results; email/DM templates; suppression list; Calendly link",
     "Personalized drafts (email, IG/FB DM, SMS); sent sequences after approval; replies triaged; calls booked; pipeline sheet updated",
     "Daily 7:30am MT: draft the day's 30 touches. 9:00am: send approved. 1:00pm and 5:00pm: triage replies. Never on Sundays.",
     "Instantly or Workspace (Kerf sending domain); Kerf pipeline sheet; Calendly (Kerf event); draft access to Connor's IG/FB DMs only via approved queue",
     "First 50 messages approved individually by Connor. After that, template-approved sends only; any off-template message goes to the approval queue. Hard cap 30 sends/day.",
     "Stop and alert if bounce rate > 5%, any spam complaint, any reply asking to stop (honor it instantly), or if a message would mention pricing not in the approved tier table.",
     "Before anything else, interview me about how I talk to other tree guys, what I will and will not say in a cold message, and which words I never use. Ask one question at a time.\n\nYour name is Outreach. You write and send first-touch messages from Connor, a certified arborist who runs Kerf, to owners of tree care and land clearing companies. Your only goal is a booked 20-minute discovery call on the Kerf Calendly link.\n\nEvery message names the company, references one specific thing about them (the after-hours call we logged, a review they didn't answer, no booking link on the site), and offers one concrete fact: roughly half of home-services calls go unanswered and most callers never call back. Peer to peer, plain language, under 90 words, no emojis, no hype words, no em dashes. Sign as Connor.\n\nSequence: email touch 1 (the missed call), touch 2 three days later (why I built this, 60 feet up missing a removal), touch 3 four days later (case study numbers), touch 4 breakup after a week. DMs are one message, then one follow-up. Never more than 30 sends per day total. Never invent pricing; the only numbers you may quote are in the approved tier table.\n\nFor the first 50 messages, put every draft in the approval queue and wait. After that, send only messages that match an approved template word for word except for the personalized sentence. Anything else goes to the queue.\n\nWhen someone replies: if interested, send the Calendly link and update the pipeline sheet to 'Call booked' once they book. If they say stop, add them to the suppression list and never contact them again. If they ask a question you cannot answer from the FAQ, forward to Connor and say you will have him reply.\n\nReport at 5pm: sent, replies, calls booked, anything that needs Connor."),
    ("Content", "Grok Bot",
     "Runs Kerf's public presence: social posts, blog, newsletter, case-study drafts, in the Kerf brand voice.",
     "Brand spec; weekly wins from Reporter; industry stats; Connor voice notes; client case-study approvals",
     "3 X posts, 2 Instagram posts, 1 LinkedIn post, 1 blog draft per week; monthly newsletter; drafts flagged 'founder voice' for Connor",
     "Mon 6:00am: week's content plan. Daily 8:00am: post the day's approved items. Thu: blog draft. First of month: newsletter draft.",
     "Kerf X / IG / LinkedIn accounts (Kerf logins only); Kerf blog (Vercel repo or CMS); newsletter tool; Higgsfield for images",
     "Anything in Connor's first-person voice, any client name, and any number about a client requires Connor's OK. Brand-voice educational posts auto-publish.",
     "Alert if engagement drops to zero for 7 days, if any post would reference Saw and Order or a client without approval, or if a comment thread turns into a support issue (hand to Connor).",
     "Before anything else, interview me about what I want Kerf to sound like in public, which topics are off limits, and which posts I want to write myself. Ask one question at a time.\n\nYour name is Content. You run Kerf's public channels. Kerf is the AI front office for tree care companies: it answers every call, texts back every missed one, books the estimate, chases the quote and asks for the review.\n\nVoice: direct, tradesman-plain, numbers over adjectives, short sentences, no emojis, no hype words, no em dashes. Write like someone who has climbed. Topics that work: the missed-call problem, what a $3,000 removal costs when voicemail answers, after-hours math, how a tree company should answer the phone, seasonal demand, owner time. Never mention other companies by name, never mention Saw and Order Tree Care, never publish client names or numbers without written approval in the approval queue.\n\nWeekly cadence: 3 posts on X, 2 on Instagram (image + caption; generate images with Higgsfield in the brand palette: deep greens, amber, real crews, no robots), 1 on LinkedIn, 1 blog draft of 600 to 900 words. Educational posts in brand voice can auto-publish. Anything written as Connor in first person goes to the approval queue with 'FOUNDER VOICE' in the subject.\n\nEvery Monday post a one-paragraph content plan to the ops channel. Every Friday report reach, follows, and link clicks to the Kerf site. If a comment or DM is a sales lead, hand it to Outreach with the context. If it is a support issue from a client, hand it to Connor immediately."),
    ("Reporter", "Grok Bot",
     "Produces the Monday 7am Kerf pipeline and client summary from Kerf-owned dashboards so Connor's review takes 20 minutes.",
     "Pipeline sheet; Make.com data store summaries (written by Account Manager); QA flags; Stripe summary (read-only export); Content metrics",
     "One-page Monday summary: pipeline by stage, calls booked this week, signed, MRR, per-client health (green/yellow/red), top 3 actions",
     "Monday 7:00am MT. Friday 5:30pm: short end-of-week numbers.",
     "Kerf pipeline sheet (read); Kerf metrics sheet (read); Stripe export sheet (read); ops channel (write)",
     "None; read-only. Never modifies any source data.",
     "Alert if any data source is older than 7 days, or if any client shows zero calls captured for 5 consecutive days (likely a broken number).",
     "Before anything else, interview me about what I want to see first on Monday morning, what 'red' means for a client, and how long I want the report to be. Ask one question at a time.\n\nYour name is Reporter. Every Monday at 7:00am Mountain you compile one page for Connor, owner of Kerf, from the Kerf pipeline sheet, the Kerf metrics sheet, and the Stripe export sheet. You read only; you never change a number anywhere.\n\nFormat, in this order: (1) Money: MRR, setup fees collected this month, cumulative toward the current goal, with the goal and the gap stated plainly. (2) Pipeline: counts by stage (contacted, call booked, proposal, signed, onboarding, live) and the change since last Monday. (3) Clients: one line each, green/yellow/red. Red means zero calls captured for 5 days, a failed QA test, or an unanswered support request older than 1 business day. (4) Top 3 actions for Connor this week, each one sentence. (5) Anything the other bots flagged.\n\nKeep it under 300 words. Use numbers, not adjectives. If a source sheet has not been updated in 7 days, say so at the top instead of reporting stale figures. On Friday at 5:30pm post a three-line version: signed this week, MRR, calls captured across all clients."),
    ("Onboarder", "Claude Code",
     "Clones the Kerf product kit into a new client's stack (lane A, B or C) from the onboarding questionnaire and produces the go-live checklist.",
     "Signed SOW; onboarding questionnaire; kit repo (scenario blueprints, scripts, copy bank); client API key or limited-user access stored in 1Password",
     "Per-client Make.com scenarios (imported, connections set), Quo number + receptionist script configured, intake form, nurture sequences loaded, go-live checklist with test results",
     "Triggered per signed client (scheduled task checks the pipeline sheet every 4 hours for 'Signed' with no onboarding started). Target: client-ready in 3 business days.",
     "Make.com API (Kerf org, per-client team/folder); Quo admin; 1Password CLI (client vault); kit repo; client CRM API (lane B) with the scoped key only",
     "Cannot send anything to the client's customers. Cannot go live: Connor runs the go-live test call and flips the number. Any step that needs a client password stops and asks the client to grant access themselves.",
     "Stop and alert if the questionnaire is incomplete, if the CRM API rejects the scoped key, if A2P registration is not approved, or if any kit template fails validation.",
     "You are Onboarder, a Claude Code scheduled task for Kerf. When the pipeline sheet shows a client at 'Signed' with no onboarding record, read their onboarding questionnaire and SOW, determine the lane (A: no CRM, B: Housecall Pro / Jobber / ServiceTitan / GHL, C: other), and build their front office from the kit repo.\n\nSteps: create the client folder in the Kerf Make.com org and import the lane's scenario blueprints; create their Quo number and inbox and load the receptionist script with their variables (company name, service area, hours, services, price stance, notify list, Spanish yes/no); create the intake form; load the nurture sequences with their variables; wire the CRM adapter using only the scoped key or limited user stored in their 1Password vault; register A2P 10DLC with their business details; run the automated tests (inbound call to voicemail path, missed-call text-back timing, form submit to CRM, review request trigger); write the go-live checklist with every test result and anything you could not complete.\n\nRules: never ask for or store a password; if access is missing, generate the exact instructions for the client to add Kerf as a limited user or issue a key, and stop. Never send a message to the client's customers. Never flip the client's main number; Connor does the go-live call. Log every action in the client's onboarding record. If anything in the kit fails validation, do not improvise; alert Connor with the error and the file."),
    ("QA", "Claude Code",
     "Tests every live client front office weekly and after any change, and flags failures before the client notices.",
     "Client registry (numbers, scenario IDs, expected behaviors); Make.com execution logs; Quo call logs",
     "QA log per client (pass/fail per test, timing); red flags to Connor and Reporter; auto-created fix tasks",
     "Weekly Tue 6:00am MT full run. Daily 6:30am: scenario error scan. Within 30 min of any Onboarder change.",
     "Quo (Kerf test line); Make.com API (execution history); client registry sheet; ops channel",
     "Can pause a scenario that is spamming (more than 3 messages to one number in an hour). Cannot change scenario logic; opens a fix task instead.",
     "Alert immediately on: text-back not received within 90s, receptionist not answering, form-to-CRM failure, any scenario error rate above 10%, any outbound message loop.",
     "You are QA, a Claude Code scheduled task for Kerf. Every Tuesday at 6:00am Mountain, and daily at 6:30am for a lighter scan, you test each live client front office listed in the client registry and record pass/fail.\n\nFull run per client: place a test call from the Kerf test line and confirm the receptionist answers within 2 rings and follows the script; hang up before intake and confirm the missed-call text-back arrives within 60 seconds with the correct links; submit the intake form with 'KERF TEST' in the name and confirm it reaches the client's CRM or job board and that the client notification fires; trigger the review-request flow with a test job and confirm it sends to the Kerf test number, not a real customer; check the last 7 days of Make.com execution history for errors and rate.\n\nDaily scan: execution errors, scenario off/on state, Quo number status, any scenario sending more than 3 messages to the same number within an hour (pause it immediately and alert).\n\nWrite results to the QA log with timestamps. Anything failing goes to Connor and Reporter the same minute with: client, test, what happened, scenario ID. Clean up every test record you created. Never change scenario logic yourself; open a fix task with the diagnosis."),
    ("Account Manager", "Claude Code",
     "Compiles each client's weekly report from Kerf data, drafts the monthly report call notes, and spots upsell and churn signals.",
     "Make.com data stores (calls, texts, forms, bookings, quotes, reviews per client); QA log; client tier; Stripe status",
     "Weekly branded report per client (PDF/HTML) ready to send Friday; metrics sheet update for Reporter; upsell/churn notes to Connor",
     "Friday 4:00pm MT weekly. First business day of month: monthly report call prep.",
     "Make.com data stores (read); report template; metrics sheet (write); email draft via Workspace (draft only); Stripe (read)",
     "Reports send only after Connor approves the batch (one 'OK' for all green clients). Upsell emails are drafts; Connor sends. Never contacts a client's customers.",
     "Alert if a client's captured calls drop more than 40% week over week, if a payment fails, if a report has missing data, or if a client has not opened reports for 3 weeks.",
     "You are Account Manager, a Claude Code scheduled task for Kerf. Every Friday at 4:00pm Mountain you build a one-page report for each live client from the Kerf Make.com data stores: calls answered, calls missed, text-backs sent, intake forms, estimates booked, quotes chased (touches sent, replies), reviews requested and received, and an estimated revenue captured figure using the client's stated average job value and close rate from their questionnaire. State the assumptions on the page.\n\nUse the report template; fill it with numbers, not adjectives; one short line of plain-language context at the top ('11 after-hours calls this week, 4 booked'). Write the figures to the metrics sheet so Reporter can read them Monday.\n\nPut the batch in the approval queue. When Connor replies OK, send each report from hello@ to the client contact with a two-sentence note. If a client is red (QA failure, payment failed, 40% drop in calls, no report opens for 3 weeks) do not send; alert Connor with the detail. If a Capture client had more than 10 quotes go unanswered or a Close client has 15+ past customers with no reactivation touch, draft an upsell note for Connor to send, in his voice, with the numbers. On the first business day of each month prepare notes for the monthly report call: wins, issues, one recommendation. Never contact a client's customers."),
    ("Builder", "Claude Code",
     "Keeps the Kerf product shipping: the job board app, the website, the kit templates, and integrations for new CRMs.",
     "Connor's prompts; kit repo; app repo; site repo; QA fix tasks; client feature requests",
     "Merged code, deployed site/app, updated kit blueprints and docs, changelog",
     "Human-prompted sessions, not scheduled. Suggested blocks: Tue and Thu evenings. Pulls QA fix tasks first.",
     "GitHub repos (site, app, kit); Vercel; Supabase; Make.com API (templates only, never client folders); Expo",
     "Deploys to production only after Connor says ship. No access to client folders in Make.com or client vaults. Never touches live client scenarios; writes fixes to the kit and hands Onboarder the update.",
     "Alert if a deploy fails, if a dependency has a critical vulnerability, or if a kit change would break an existing client scenario.",
     "You are Builder, the Claude Code engineering seat for Kerf. You own three repos: the Kerf website, the Kerf job board app (Expo React Native + Supabase, magic-link login, pipeline New > Estimate booked > Quoted > Won > Done, a simple mobile view for owners), and the product kit (Make.com blueprints for lanes A/B/C, Quo scripts, copy bank, report template, onboarding questionnaire).\n\nWhen a session starts, read the open QA fix tasks and client feature requests first. Fix kit templates rather than live client scenarios; Onboarder applies kit updates to clients. Keep the brand spec (deep green and sap gradient, Sora and Inter, plain voice) on every surface. Write a one-line changelog entry for every change.\n\nRules: production deploys only after Connor says ship. Never read or write a client's Make.com folder, Quo inbox or 1Password vault. Pin dependencies; run tests before asking to ship. When adding a CRM adapter, write it against the canonical lead payload and document the exact permissions the client must grant. If a request would take more than a day, write a short plan with the tradeoffs and stop for Connor's call."),
]
r = HEAD + 1
for a in agents:
    for c, v in enumerate(a, 1):
        cell = ws.cell(row=r, column=c, value=v)
        cell.alignment = wrap
    ws.cell(row=r, column=1).font = bold
    ws.cell(row=r, column=1).fill = key_fill
    r += 1
style_body(ws, HEAD + 1, r - 1, len(cols))
for rr in range(HEAD + 1, r):
    ws.row_dimensions[rr].height = 330
ws.freeze_panes = f"B{HEAD+1}"
ws.auto_filter.ref = f"A{HEAD}:J{r-1}"
widths(ws, [16, 12, 34, 34, 34, 30, 34, 34, 34, 90])

# =====================================================================
# 3. ROUTINES
# =====================================================================
ws = wb.create_sheet("Routines")
title(ws, "Weekly Routines", "Who runs when. Bots are scheduled; Connor's blocks are the human seats (sales, approvals, go-live). Times are Mountain.")
HEAD = 4
days = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
for i, h in enumerate(days, 1):
    ws.cell(row=HEAD, column=i, value=h)
style_header(ws, HEAD, len(days))
slots = [
    ("5:00am", "Prospector: list refresh", "Prospector: list refresh", "Prospector: list refresh", "Prospector: list refresh", "Prospector: list refresh", "Prospector: list refresh", "Prospector: dedupe + archive"),
    ("6:00am", "Content: week plan", "QA: full weekly run", "", "", "", "", ""),
    ("6:30am", "QA: error scan", "QA: error scan", "QA: error scan", "QA: error scan", "QA: error scan", "QA: error scan", "QA: error scan"),
    ("7:00am", "Reporter: Monday summary", "", "", "", "", "", ""),
    ("7:30am", "Outreach: draft 30", "Outreach: draft 30", "Outreach: draft 30", "Outreach: draft 30", "Outreach: draft 30", "Outreach: draft 15", ""),
    ("8:00am", "Content: post", "Content: post", "Content: post", "Content: post", "Content: post", "Content: post", ""),
    ("8:30am", "CONNOR: Monday review (20 min), approve Outreach drafts", "CONNOR: approve drafts (10 min)", "CONNOR: approve drafts", "CONNOR: approve drafts", "CONNOR: approve drafts", "CONNOR: approve drafts", ""),
    ("9:00am", "Outreach: send approved", "Outreach: send approved", "Outreach: send approved", "Outreach: send approved", "Outreach: send approved", "Outreach: send approved", ""),
    ("10:00-11:00am", "CONNOR: 10 prospect calls", "CONNOR: 10 prospect calls", "CONNOR: 10 prospect calls", "CONNOR: 10 prospect calls", "CONNOR: 10 prospect calls", "", ""),
    ("1:00pm", "Outreach: triage replies", "Outreach: triage replies", "Outreach: triage replies", "Outreach: triage replies", "Outreach: triage replies", "Outreach: triage replies", ""),
    ("Every 4 hours", "Onboarder: check for new signed clients", "Onboarder", "Onboarder", "Onboarder", "Onboarder", "Onboarder", "Onboarder"),
    ("4:00pm", "", "", "", "", "Account Manager: weekly client reports to approval queue", "", ""),
    ("4:30-6:30pm", "CONNOR: discovery calls (Calendly block)", "CONNOR: discovery calls", "CONNOR: discovery calls", "CONNOR: discovery calls", "CONNOR: approve reports, send", "CONNOR: discovery calls 9-11am instead", ""),
    ("5:00pm", "Outreach: daily report", "Outreach: daily report", "Outreach: daily report", "Outreach: daily report", "Outreach: daily report + Reporter: Friday numbers", "", ""),
    ("6:30pm", "Prospector: after-hours call audit (new rows)", "Prospector: after-hours audit", "Prospector: after-hours audit", "Prospector: after-hours audit", "", "", ""),
    ("Evenings (Tue/Thu)", "", "CONNOR + Builder: product session", "", "CONNOR + Builder: product session", "", "", ""),
    ("As needed", "CONNOR: go-live calls for new clients (30 min each, within 3 business days of signing)", "", "", "", "", "", ""),
]
r = HEAD + 1
for s in slots:
    for c, v in enumerate(s, 1):
        cell = ws.cell(row=r, column=c, value=v)
        if v.startswith("CONNOR"):
            cell.fill = key_fill
            cell.font = bold
    ws.cell(row=r, column=1).font = bold
    r += 1
style_body(ws, HEAD + 1, r - 1, len(days))
ws.freeze_panes = f"B{HEAD+1}"
widths(ws, [16, 26, 26, 26, 26, 30, 26, 22])

# =====================================================================
# 4. TOOL STACK
# =====================================================================
ws = wb.create_sheet("Tool Stack")
title(ws, "Tool Stack", "Monthly cost of running Kerf. Blue = edit as plans change. Per-client tools are multiplied by client count on the Pricing Model sheet.")
HEAD = 4
cols = ["Tool", "Purpose", "Plan", "Monthly cost ($)", "Per-client?", "Owner of login", "Notes"]
for i, h in enumerate(cols, 1):
    ws.cell(row=HEAD, column=i, value=h)
style_header(ws, HEAD, len(cols))
tools = [
    ("Grok Bot", "Prospector, Outreach, Content, Reporter bots", "X Premium ($30) or Cursor Pro ($20)", 30, "No", "Kerf", "All Bots share one cloud computer and one weekly usage pool. No client credentials on it. Upgrade to Pro+ $60 only if usage is the bottleneck."),
    ("Claude Max", "Onboarder, QA, Account Manager, Builder (Claude Code scheduled tasks + sessions)", "Max 5x", 100, "No", "Kerf", "Move to Max 20x ($200) if scheduled tasks hit limits."),
    ("Make.com", "All client automations, approval gates, lead routing", "Core", 10.59, "No", "Kerf", "Ops scale with clients; expect Pro ($18.82) by 5 clients. Per-client folders and connections."),
    ("Quo (phone + AI receptionist)", "Per-client number, inbox, receptionist", "Per number", 30, "Yes", "Kerf (client is a user)", "~$20-35 per number depending on plan and minutes. Billed to Kerf; included in client's monthly fee."),
    ("Calendly", "Kerf discovery calls; client booking pages where they have none", "Free / Standard", 12, "No", "Kerf", "Clients with their own calendar keep it."),
    ("Stripe", "Setup invoices, monthly subscriptions", "Pay as you go", 0, "No", "Kerf", "2.9% + 30c card; ACH 0.8% capped at $5. Use ACH for monthly where possible."),
    ("1Password Teams", "Per-client credential vaults", "Teams Starter", 20, "No", "Kerf", "One vault per client; delete 30 days after offboarding."),
    ("Origami (or Apollo)", "Prospect list building", "Free -> $29", 29, "No", "Kerf", "Origami is built for local business prospecting; Apollo Basic $49 if you need B2B emails."),
    ("Instantly (or Smartlead)", "Cold email sending, warmup, sequences", "Growth", 47, "No", "Kerf", "Optional in week 1; required once Outreach exceeds Workspace sending limits. Separate sending domain."),
    ("Google Workspace", "hello@, connor@ on kerf domain; Docs; Sheets", "Business Starter", 7, "No", "Kerf", ""),
    ("Domain + Vercel", "Website hosting", "Hobby/Pro", 20, "No", "Kerf", "Vercel Hobby is free for non-commercial; use Pro ($20) for a business site."),
    ("Supabase", "Kerf job board backend (lane A clients)", "Free -> Pro", 0, "No", "Kerf", "Pro ($25) once there are 3+ lane A clients."),
    ("PandaDoc or DocuSign", "MSA/SOW e-signature", "Essentials", 19, "No", "Kerf", "Or use Stripe + a signed PDF for the first 3 clients."),
    ("Higgsfield", "Brand and social imagery", "Plus", 0, "No", "Kerf", "Already on the Plus plan; shared with other projects, so $0 incremental here."),
    ("Insurance (E&O + cyber)", "Liability for client data and phone systems", "Solo tech services", 65, "No", "Kerf", "Estimate; get quotes."),
]
r = HEAD + 1
for t in tools:
    for c, v in enumerate(t, 1):
        cell = ws.cell(row=r, column=c, value=v)
        if c == 4:
            cell.number_format = '$#,##0.00;($#,##0.00);-'
            cell.font = input_font
    r += 1
last = r - 1
style_body(ws, HEAD + 1, last, len(cols))
for rr in range(HEAD + 1, last + 1):
    ws.cell(row=rr, column=4).font = input_font
ws.cell(row=last + 1, column=1, value="Fixed monthly total (not per-client)").font = bold
ws.cell(row=last + 1, column=4, value=f'=SUMIF(E{HEAD+1}:E{last},"No",D{HEAD+1}:D{last})').number_format = '$#,##0.00'
ws.cell(row=last + 2, column=1, value="Per-client monthly cost (each client)").font = bold
ws.cell(row=last + 2, column=4, value=f'=SUMIF(E{HEAD+1}:E{last},"Yes",D{HEAD+1}:D{last})').number_format = '$#,##0.00'
for rr in (last + 1, last + 2):
    for c in range(1, len(cols) + 1):
        ws.cell(row=rr, column=c).fill = key_fill
        ws.cell(row=rr, column=c).border = border
    ws.cell(row=rr, column=4).font = bold
TOOL_FIXED = f"'Tool Stack'!$D${last+1}"
TOOL_PERCLIENT = f"'Tool Stack'!$D${last+2}"
ws.freeze_panes = f"A{HEAD+1}"
ws.auto_filter.ref = f"A{HEAD}:G{last}"
widths(ws, [26, 40, 20, 14, 11, 18, 60])

# =====================================================================
# 5. PRICING MODEL
# =====================================================================
ws = wb.create_sheet("Pricing Model")
title(ws, "Pricing Model", "Tiers are fixed. Scenario inputs (blue) drive every total below; nothing is hardcoded. Goal: $25,000 by Dec 31, 2026.")
HEAD = 4
cols = ["Tier", "Setup fee ($)", "Monthly ($)", "What's included", "Term"]
for i, h in enumerate(cols, 1):
    ws.cell(row=HEAD, column=i, value=h)
style_header(ws, HEAD, len(cols))
tiers = [
    ("Capture", 1500, 497, "AI phone receptionist on a dedicated number, missed-call text-back within 60s, intake form, booking link into their calendar, lead pushed to their CRM or the Kerf job board, weekly report.", "12 months; setup due at signing; 60-day out after month 3"),
    ("Close", 2500, 797, "Everything in Capture + 5-touch estimate follow-up (SMS + email), quote-aging reminders to the owner, review request when a job is marked done, monthly report call.", "12 months; setup due at signing; 60-day out after month 3"),
    ("Grow", 3500, 1197, "Everything in Close + Google Business Profile review responses (drafted, owner-approved), seasonal reactivation campaigns to past customers (pruning, PHC, storm prep), lead-source dashboard, quarterly strategy call.", "12 months; setup due at signing; 60-day out after month 3"),
]
r = HEAD + 1
for t in tiers:
    for c, v in enumerate(t, 1):
        cell = ws.cell(row=r, column=c, value=v)
        if c in (2, 3):
            cell.number_format = '$#,##0'
            cell.font = input_font
    ws.cell(row=r, column=1).font = bold
    r += 1
TIER_FIRST = HEAD + 1
TIER_LAST = r - 1
style_body(ws, HEAD + 1, r - 1, len(cols))
r += 1
ws.cell(row=r, column=1, value="Add-ons").font = bold
r += 1
addons = [("Spanish receptionist", 0, 150, "Second script + voice, same number", "Monthly"),
          ("Extra line / location", 0, 75, "Additional number and inbox", "Monthly"),
          ("Landing page build", 1500, 0, "One-page lead-gen site on the client's domain", "One-time")]
ah = r
for i, h in enumerate(["Add-on", "One-time ($)", "Monthly ($)", "Detail", "Billing"], 1):
    ws.cell(row=r, column=i, value=h)
style_header(ws, r, 5)
r += 1
for t in addons:
    for c, v in enumerate(t, 1):
        cell = ws.cell(row=r, column=c, value=v)
        if c in (2, 3):
            cell.number_format = '$#,##0;($#,##0);-'
            cell.font = input_font
    r += 1
style_body(ws, ah + 1, r - 1, 5)

# Scenario block
r += 2
sc = r
ws.cell(row=r, column=1, value="Scenario A: 7 clients by Dec 31 (the $25k plan)").font = Font(name=FONT, size=12, bold=True, color=PINE)
ws.cell(row=r, column=4, value="Scenario B: conservative, 4 clients").font = Font(name=FONT, size=12, bold=True, color=PINE)
r += 1
for i, h in enumerate(["Input", "Value", "", "Input", "Value"], 1):
    ws.cell(row=r, column=i, value=h)
style_header(ws, r, 2)
style_header(ws, r, 5)
ws.cell(row=r, column=3).fill = PatternFill()
ws.cell(row=r, column=3).font = body
r += 1
inputs_a = [("Capture clients", 2), ("Close clients", 4), ("Grow clients", 1), ("Avg months of MRR billed by Dec 31", 1.5), ("Months of fixed tool cost", 2)]
inputs_b = [("Capture clients", 2), ("Close clients", 2), ("Grow clients", 0), ("Avg months of MRR billed by Dec 31", 1.0), ("Months of fixed tool cost", 2)]
in_start = r
for (la, va), (lb, vb) in zip(inputs_a, inputs_b):
    ws.cell(row=r, column=1, value=la)
    ca = ws.cell(row=r, column=2, value=va)
    ca.font = input_font
    ca.fill = PatternFill("solid", fgColor="FFFF00")
    ws.cell(row=r, column=4, value=lb)
    cb = ws.cell(row=r, column=5, value=vb)
    cb.font = input_font
    cb.fill = PatternFill("solid", fgColor="FFFF00")
    r += 1
ws.cell(row=in_start + 3, column=2).number_format = '0.0'
ws.cell(row=in_start + 3, column=5).number_format = '0.0'
ws.cell(row=in_start + 3, column=2).comment = Comment("Clients signed mid-sprint bill less than 2 full months. 1.5 assumes most sign in weeks 3-5. Your assumption; adjust.", "Kerf")
cap_a, clo_a, gro_a, mo_a, tc_a = [f"$B${in_start+i}" for i in range(5)]
cap_b, clo_b, gro_b, mo_b, tc_b = [f"$E${in_start+i}" for i in range(5)]
setup_cap, setup_clo, setup_gro = [f"$B${TIER_FIRST+i}" for i in range(3)]
mon_cap, mon_clo, mon_gro = [f"$C${TIER_FIRST+i}" for i in range(3)]
r += 1
for i, h in enumerate(["Output", "Value", "", "Output", "Value"], 1):
    ws.cell(row=r, column=i, value=h)
style_header(ws, r, 2)
style_header(ws, r, 5)
ws.cell(row=r, column=3).fill = PatternFill()
r += 1
out_start = r


def outputs(col_in, col_out, cap, clo, gro, mo, tc, rstart):
    rows = [
        ("Total clients", f"={cap}+{clo}+{gro}"),
        ("Setup fee revenue", f"={cap}*{setup_cap}+{clo}*{setup_clo}+{gro}*{setup_gro}"),
        ("MRR at full count", f"={cap}*{mon_cap}+{clo}*{mon_clo}+{gro}*{mon_gro}"),
        ("MRR billed by Dec 31", f"=B{rstart+2}*{mo}" if col_out == 2 else f"=E{rstart+2}*{mo}"),
        ("Gross revenue by Dec 31", f"=B{rstart+1}+B{rstart+3}" if col_out == 2 else f"=E{rstart+1}+E{rstart+3}"),
        ("Fixed tool costs", f"={TOOL_FIXED}*{tc}"),
        ("Per-client tool costs", f"=B{rstart}*{TOOL_PERCLIENT}*{mo}" if col_out == 2 else f"=E{rstart}*{TOOL_PERCLIENT}*{mo}"),
        ("Stripe fees (2.9% + est.)", f"=B{rstart+4}*0.03" if col_out == 2 else f"=E{rstart+4}*0.03"),
        ("Net by Dec 31", f"=B{rstart+4}-B{rstart+5}-B{rstart+6}-B{rstart+7}" if col_out == 2 else f"=E{rstart+4}-E{rstart+5}-E{rstart+6}-E{rstart+7}"),
        ("Goal", 25000),
        ("Gap to goal (negative = goal beaten)", f"=B{rstart+9}-B{rstart+8}" if col_out == 2 else f"=E{rstart+9}-E{rstart+8}"),
        ("Annualized MRR (run rate)", f"=B{rstart+2}*12" if col_out == 2 else f"=E{rstart+2}*12"),
    ]
    rr = rstart
    for label, f in rows:
        ws.cell(row=rr, column=col_in, value=label)
        c = ws.cell(row=rr, column=col_out, value=f)
        c.number_format = '$#,##0;($#,##0);-' if label != "Total clients" else '0'
        if label == "Goal":
            c.font = input_font
        if label in ("Gross revenue by Dec 31", "Net by Dec 31"):
            c.font = bold
            c.fill = key_fill
            ws.cell(row=rr, column=col_in).font = bold
        rr += 1
    return rr


r_end_a = outputs(1, 2, cap_a, clo_a, gro_a, mo_a, tc_a, out_start)
r_end_b = outputs(4, 5, cap_b, clo_b, gro_b, mo_b, tc_b, out_start)
style_body(ws, sc + 1, r_end_a - 1, 5)
for rr in range(sc + 1, r_end_a):
    ws.cell(row=rr, column=3).border = Border()
ws.cell(row=r_end_a + 1, column=1, value="Assumptions: Stripe fees estimated at 3% of gross (card). Per-client tool cost = Quo number from Tool Stack. Months of MRR is your estimate of how much subscription revenue actually bills before Dec 31 given when clients sign. Raise setup fees 20% once there is a waitlist.").font = sub_font
widths(ws, [38, 16, 4, 38, 16])
ws.column_dimensions["D"].width = 60

# =====================================================================
# 6. 8-WEEK SPRINT
# =====================================================================
ws = wb.create_sheet("8-Week Sprint")
title(ws, "8-Week Sprint to $25,000", "Nov 4 to Dec 31, 2026. Targets are cumulative. Fill the Actual columns weekly; Reporter reads this sheet Monday.")
HEAD = 4
cols = ["Week", "Dates", "Goals", "Contacts (target)", "Contacts (actual)", "Calls booked (target)", "Calls booked (actual)", "Signed (target)", "Signed (actual)", "Live (target)", "Live (actual)", "Revenue (target $)", "Revenue (actual $)", "Done"]
for i, h in enumerate(cols, 1):
    ws.cell(row=HEAD, column=i, value=h)
style_header(ws, HEAD, len(cols))
weeks = [
    ("Wk 1", "Brand kit, site, offer and product kit live. Entity, Stripe, domain, 1Password done. 200-prospect list built and scored. After-hours audit started. Contract drafted.", 40, 2, 0, 0, 0),
    ("Wk 2", "Outreach live (30/day). Connor: 10 calls/day. Demo environment flawless. 10 discovery calls booked. Attorney review of MSA/SOW.", 190, 10, 0, 0, 0),
    ("Wk 3", "First 2 clients signed (setup fees in). Onboarder runs first real build. Referral offer written.", 340, 18, 2, 0, 5000),
    ("Wk 4", "First 2 live (go-live calls done). 2 more signed. First weekly client reports sent. Lane A job board MVP usable.", 490, 26, 4, 2, 10800),
    ("Wk 5", "2 more signed; 4 live. QA weekly run green. Content: first case-study draft.", 640, 34, 6, 4, 16100),
    ("Wk 6", "1 more signed (7 total); 6 live. Case study #1 approved. Lists expand to UT/AZ/TX.", 790, 42, 7, 6, 20500),
    ("Wk 7", "7 live. Referral asks at every go-live and 30-day review. Upsell drafts where metrics justify. ISA/CTCA outreach.", 940, 48, 7, 7, 23000),
    ("Wk 8", "Close the year: MRR billing current, reviews collected, January pipeline of 10 booked calls. Pricing review scheduled for 10 clients.", 1090, 54, 8, 7, 25000),
]
r = HEAD + 1
for i, (w, g, ct, cb, sg, lv, rev) in enumerate(weeks):
    start = START + timedelta(days=i * 7)
    end = start + timedelta(days=6) if i < 7 else date(2026, 12, 31)
    ws.cell(row=r, column=1, value=w).font = bold
    ws.cell(row=r, column=2, value=f"{start.strftime('%b %d')} - {end.strftime('%b %d')}")
    ws.cell(row=r, column=3, value=g)
    ws.cell(row=r, column=4, value=ct)
    ws.cell(row=r, column=6, value=cb)
    ws.cell(row=r, column=8, value=sg)
    ws.cell(row=r, column=10, value=lv)
    ws.cell(row=r, column=12, value=rev).number_format = '$#,##0'
    for c in (5, 7, 9, 11, 13):
        ws.cell(row=r, column=c).font = input_font
        ws.cell(row=r, column=c).fill = PatternFill("solid", fgColor="FFFF00")
    ws.cell(row=r, column=13).number_format = '$#,##0'
    ws.cell(row=r, column=14, value="No").font = input_font
    r += 1
last = r - 1
style_body(ws, HEAD + 1, last, len(cols))
ws.cell(row=last + 1, column=3, value="Latest actual vs target (fills from the last week with an actual entered)").font = bold
for tcol, acol in ((4, 5), (6, 7), (8, 9), (10, 11), (12, 13)):
    L = get_column_letter(acol)
    T = get_column_letter(tcol)
    ws.cell(row=last + 1, column=acol, value=f'=IF(COUNT({L}{HEAD+1}:{L}{last})=0,"-",INDEX({L}{HEAD+1}:{L}{last},COUNT({L}{HEAD+1}:{L}{last}))-INDEX({T}{HEAD+1}:{T}{last},COUNT({L}{HEAD+1}:{L}{last})))')
    ws.cell(row=last + 1, column=acol).font = bold
    ws.cell(row=last + 1, column=acol).fill = key_fill
ws.cell(row=last + 1, column=13).number_format = '$#,##0;($#,##0);-'
dv_d = DataValidation(type="list", formula1='"Yes,No"', allow_blank=True)
ws.add_data_validation(dv_d)
dv_d.add(f"N{HEAD+1}:N{last}")
ws.cell(row=last + 3, column=1, value="Note: 'Contacts' = first-touch outreach sent (email, DM, call). Targets assume 30 bot sends + 10 Connor calls per weekday from week 2. Revenue target = setup fees + MRR billed, cumulative.").font = sub_font
ws.freeze_panes = f"C{HEAD+1}"
widths(ws, [8, 16, 60, 10, 10, 10, 10, 9, 9, 8, 8, 12, 12, 7])

# =====================================================================
# 7. PROSPECT LIST
# =====================================================================
ws = wb.create_sheet("Prospect List")
title(ws, "Prospect List (template)", "Prospector Bot writes here; Outreach works it top-down by Score. The 5 rows below are EXAMPLE placeholders only; delete them before use.")
HEAD = 4
cols = ["Company", "City", "State", "Phone", "Email", "Owner", "Website", "CRM (if known)", "After-hours answered? (Y/N)", "GBP reviews", "GBP response rate", "Online booking? (Y/N)", "Score", "Status", "Last touch", "Next step"]
for i, h in enumerate(cols, 1):
    ws.cell(row=HEAD, column=i, value=h)
style_header(ws, HEAD, len(cols))
examples = [
    ("EXAMPLE Tree Co", "Littleton", "CO", "(303) 555-0101", "owner@example.com", "Example Owner", "example-tree.com", "None", "N", 48, 0.10, "N"),
    ("EXAMPLE Land Clearing LLC", "Castle Rock", "CO", "(720) 555-0102", "info@example.com", "", "example-clearing.com", "Jobber", "N", 12, 0.00, "N"),
    ("EXAMPLE Arbor Care", "Arvada", "CO", "(303) 555-0103", "hello@example.com", "Example Owner", "example-arbor.com", "Housecall Pro", "Y", 210, 0.85, "Y"),
    ("EXAMPLE Snow & Tree", "Broomfield", "CO", "(303) 555-0104", "", "", "", "None", "N", 5, 0.00, "N"),
    ("EXAMPLE Excavation", "Parker", "CO", "(720) 555-0105", "office@example.com", "Example Owner", "example-excavation.com", "QuickBooks only", "N", 31, 0.25, "N"),
]
r = HEAD + 1
for e in examples:
    for c, v in enumerate(e, 1):
        cell = ws.cell(row=r, column=c, value=v)
        if c == 11:
            cell.number_format = '0%'
    # Score: +40 if after-hours not answered, +20 if no online booking, +20 if response rate < 50%, +10 if reviews < 50, +10 if no CRM
    ws.cell(row=r, column=13, value=f'=IF(I{r}="N",40,0)+IF(L{r}="N",20,0)+IF(K{r}<0.5,20,0)+IF(J{r}<50,10,0)+IF(OR(H{r}="None",H{r}="QuickBooks only",H{r}=""),10,0)')
    ws.cell(row=r, column=13).font = bold
    ws.cell(row=r, column=14, value="New").font = input_font
    ws.cell(row=r, column=16, value="Outreach touch 1")
    r += 1
last = r - 1
style_body(ws, HEAD + 1, last, len(cols))
# blank template rows with the score formula pre-filled
for rr in range(last + 1, last + 51):
    ws.cell(row=rr, column=13, value=f'=IF(A{rr}="","",IF(I{rr}="N",40,0)+IF(L{rr}="N",20,0)+IF(K{rr}<0.5,20,0)+IF(J{rr}<50,10,0)+IF(OR(H{rr}="None",H{rr}="QuickBooks only",H{rr}=""),10,0))')
    for c in range(1, len(cols) + 1):
        ws.cell(row=rr, column=c).border = border
        ws.cell(row=rr, column=c).font = body
    ws.cell(row=rr, column=11).number_format = '0%'
dv_yn = DataValidation(type="list", formula1='"Y,N"', allow_blank=True)
dv_st = DataValidation(type="list", formula1='"New,Contacted,Replied,Call booked,Proposal,Signed,Not now,Do not contact"', allow_blank=True)
ws.add_data_validation(dv_yn)
ws.add_data_validation(dv_st)
dv_yn.add(f"I{HEAD+1}:I{last+50}")
dv_yn.add(f"L{HEAD+1}:L{last+50}")
dv_st.add(f"N{HEAD+1}:N{last+50}")
ws.cell(row=last + 52, column=1, value="Score = 40 if after-hours call not answered + 20 if no online booking + 20 if GBP response rate under 50% + 10 if under 50 reviews + 10 if no real CRM. Max 100. Work 60+ first. Kerf weighting; adjust in the formula.").font = sub_font
ws.freeze_panes = f"B{HEAD+1}"
ws.auto_filter.ref = f"A{HEAD}:P{last+50}"
widths(ws, [26, 14, 6, 15, 24, 16, 22, 16, 12, 9, 10, 10, 8, 14, 11, 22])

# =====================================================================
# 8. CLIENT ONBOARDING CHECKLIST
# =====================================================================
ws = wb.create_sheet("Client Onboarding")
title(ws, "Client Onboarding Checklist", "Copy this sheet per client. Lane column says which steps apply (A = no CRM, B = HCP/Jobber/ServiceTitan/GHL, C = custom). Target: live within 3 business days of signing.")
ws["A3"] = "Client: ____________    Tier: ________    Lane: ___    Signed: ________    Go-live target: ________"
ws["A3"].font = bold
HEAD = 5
cols = ["Stage", "#", "Step", "Lane", "Owner", "Done", "Date", "Notes"]
for i, h in enumerate(cols, 1):
    ws.cell(row=HEAD, column=i, value=h)
style_header(ws, HEAD, len(cols))
steps = [
    ("Kickoff", "Setup invoice paid (Stripe) and SOW countersigned", "A/B/C", "Connor"),
    ("Kickoff", "Onboarding questionnaire completed by client", "A/B/C", "Client"),
    ("Kickoff", "Kickoff call (15 min): confirm hours, services, service area, notify list, voice, Spanish", "A/B/C", "Connor"),
    ("Kickoff", "Create client folder in Make.com org; create 1Password vault", "A/B/C", "Claude Code"),
    ("Access", "Lane B: client adds Kerf as limited user OR issues scoped API key (instructions sent by Onboarder); key stored in vault", "B", "Client"),
    ("Access", "Lane C: webhook URL or email-to-inbox fallback agreed; document field mapping", "C", "Claude Code"),
    ("Access", "Lane A: provision Kerf job board (magic-link login for owner) or Sheet fallback", "A", "Claude Code"),
    ("Access", "Calendar access: Google/Outlook/CRM calendar connected read/write for booking", "A/B/C", "Client"),
    ("Number", "Provision Quo number (local area code) and inbox; add client as inbox user", "A/B/C", "Claude Code"),
    ("Number", "Decide: forward main line after N rings to Kerf number, or Kerf number becomes primary with call forwarding", "A/B/C", "Connor"),
    ("Number", "A2P 10DLC brand + campaign registration with client's business details (EIN, address, sample messages)", "A/B/C", "Claude Code"),
    ("Number", "A2P approved (can take 1-7 days; start day 1)", "A/B/C", "Make.com"),
    ("Scripts", "Receptionist script loaded with client variables; emergency escalation path confirmed", "A/B/C", "Claude Code"),
    ("Scripts", "Missed-call text-back loaded; links verified", "A/B/C", "Claude Code"),
    ("Scripts", "Intake form built; redirect to booking page", "A/B/C", "Claude Code"),
    ("Scripts", "Nurture sequences loaded (Close/Grow); review request flow wired (Close/Grow)", "A/B/C", "Claude Code"),
    ("Scripts", "CRM adapter configured: Client, Request/Job, Visit mapped from canonical payload", "B", "Claude Code"),
    ("Scripts", "GBP review response flow + seasonal campaigns scheduled (Grow)", "A/B/C", "Claude Code"),
    ("Test", "Automated test suite passed (call, text-back timing, form to CRM, notifications, review trigger)", "A/B/C", "Claude Code"),
    ("Test", "Client places a test call and submits a test form; confirms notifications", "A/B/C", "Client"),
    ("Go-live", "Go-live call (30 min): walk the owner through the inbox, reports, how to mark a job done, how to pause", "A/B/C", "Connor"),
    ("Go-live", "Flip forwarding / publish number; monitor first 24h", "A/B/C", "Connor"),
    ("Go-live", "Add client to QA registry, Account Manager report list, Stripe subscription start date", "A/B/C", "Claude Code"),
    ("Review", "7-day review: calls captured, issues, script tweaks; ask for referral", "A/B/C", "Connor"),
    ("Review", "30-day review: metrics vs. promise; case-study permission; upsell if justified", "A/B/C", "Connor"),
]
r = HEAD + 1
for i, (st, step, lane, owner) in enumerate(steps, 1):
    ws.cell(row=r, column=1, value=st).font = bold
    ws.cell(row=r, column=2, value=i)
    ws.cell(row=r, column=3, value=step)
    ws.cell(row=r, column=4, value=lane)
    ws.cell(row=r, column=5, value=owner).font = input_font
    ws.cell(row=r, column=6, value="No").font = input_font
    r += 1
last = r - 1
style_body(ws, HEAD + 1, last, len(cols))
ws.cell(row=last + 1, column=3, value="Progress").font = bold
ws.cell(row=last + 1, column=6, value=f'=COUNTIF(F{HEAD+1}:F{last},"Yes")/COUNTA(F{HEAD+1}:F{last})').number_format = '0%'
ws.cell(row=last + 1, column=6).font = bold
ws.cell(row=last + 1, column=6).fill = key_fill
dv_yes = DataValidation(type="list", formula1='"Yes,No,N/A"', allow_blank=True)
ws.add_data_validation(dv_yes)
dv_yes.add(f"F{HEAD+1}:F{last}")
dv_o2 = DataValidation(type="list", formula1=OWNER, allow_blank=True)
ws.add_data_validation(dv_o2)
dv_o2.add(f"E{HEAD+1}:E{last}")
ws.freeze_panes = f"A{HEAD+1}"
widths(ws, [12, 5, 80, 8, 13, 8, 11, 30])

# Set default font on title cells etc. done. Save.
out = "/home/claude/kerf/workbook/Kerf-Buildout-and-Agent-Setup.xlsx"
wb.save(out)
print("saved", out)
