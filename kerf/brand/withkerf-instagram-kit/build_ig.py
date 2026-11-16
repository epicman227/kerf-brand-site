#!/usr/bin/env python3
"""Kerf Instagram launch kit: profile picture, highlight covers, 9-post launch grid."""
import os, subprocess, sys
sys.path.insert(0, os.path.dirname(__file__))
from kerfmark import mark

OUT = "/home/claude/kerf-ig/out"
for d in ("posts", "highlights"):
    os.makedirs(os.path.join(OUT, d), exist_ok=True)

INK, PINE, CANOPY, KERF, SAP, BARK = "#0A0F0D", "#0B2A1F", "#0B5C44", "#1FB26A", "#C8F24D", "#F2A43A"
BONE, MIST, ASH = "#F4F1EA", "#B9CFC4", "#5E6F68"
HAIR = "rgba(201,242,77,0.14)"
SORA = "Sora, Inter, sans-serif"
MONO = "'JetBrains Mono', monospace"
INTER = "Inter, sans-serif"
W, H = 1080, 1350
HANDLE = "@withkerf"

def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def svg(w, h, body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">{body}</svg>'

def render(name, content, w=W, h=H, sub="posts"):
    p = os.path.join(OUT, sub, name)
    open(p + ".svg", "w").write(content)
    subprocess.run(["rsvg-convert", "-w", str(w), "-h", str(h), "-o", p + ".png", p + ".svg"], check=True)
    os.remove(p + ".svg")

# ---- shared pieces ---------------------------------------------------------------
def glow(x, y, r, color=KERF, op=0.28, uid="gl"):
    return (f'<defs><radialGradient id="{uid}" cx="{x}" cy="{y}" r="{r}" gradientUnits="userSpaceOnUse">'
            f'<stop offset="0" stop-color="{color}" stop-opacity="{op}"/>'
            f'<stop offset="1" stop-color="{color}" stop-opacity="0"/></radialGradient></defs>'
            f'<rect width="{W}" height="{H}" fill="url(#{uid})"/>')

def text_gradient(uid="tg"):
    return (f'<defs><linearGradient id="{uid}" x1="0" y1="1" x2="1" y2="0">'
            f'<stop offset="0" stop-color="{SAP}"/><stop offset="0.45" stop-color="{KERF}"/>'
            f'<stop offset="1" stop-color="{CANOPY}"/></linearGradient></defs>')

def bg():
    return f'<rect width="{W}" height="{H}" fill="{INK}"/>'

def eyebrow(x, y, s, fill=MIST, anchor="start"):
    return (f'<text x="{x}" y="{y}" font-family="{MONO}" font-weight="500" font-size="22" '
            f'letter-spacing="1.8" fill="{fill}" text-anchor="{anchor}">{esc(s.upper())}</text>')

def display(x, y, lines, size=104, fill=BONE, lh=1.04, anchor="start", weight=700, track=-0.035):
    out = ""
    for i, ln in enumerate(lines):
        # ln may be a list of (text, fill) runs
        runs = ln if isinstance(ln, list) else [(ln, fill)]
        inner = "".join(f'<tspan fill="{f}">{esc(t)}</tspan>' for t, f in runs)
        out += (f'<text x="{x}" y="{y + i*size*lh:.1f}" font-family="{SORA}" font-weight="{weight}" '
                f'font-size="{size}" letter-spacing="{track*size:.1f}" text-anchor="{anchor}">{inner}</text>')
    return out

def body(x, y, lines, size=30, fill=MIST, lh=1.45, anchor="start", weight=400):
    return "".join(
        f'<text x="{x}" y="{y + i*size*lh:.1f}" font-family="{INTER}" font-weight="{weight}" font-size="{size}" '
        f'fill="{fill}" text-anchor="{anchor}">{esc(ln)}</text>' for i, ln in enumerate(lines))

def footer(uid, dark=True):
    """Small lockup bottom-left, handle bottom-right, hairline above."""
    fill = BONE if dark else INK
    y = H - 96
    return (f'<line x1="72" y1="{y-52}" x2="{W-72}" y2="{y-52}" stroke="{HAIR}" stroke-width="1"/>'
            f'<g transform="translate(72 {y-24})">{mark(24, 24, 22, uid)}'
            f'<text x="60" y="36" font-family="{SORA}" font-weight="700" font-size="32" letter-spacing="-1.4" fill="{fill}">kerf</text></g>'
            f'<text x="{W-72}" y="{y+12}" font-family="{MONO}" font-weight="500" font-size="22" letter-spacing="1.8" '
            f'fill="{MIST if dark else ASH}" text-anchor="end">{HANDLE.upper()}</text>')

def chip(x, y, label, value, uid):
    """Stat chip: pine ground, hairline, mono value, mono label."""
    w = 40 + 18*len(value) + 30 + 13*len(label) + 40
    return (f'<rect x="{x}" y="{y}" width="{w}" height="64" rx="32" fill="{PINE}" stroke="{HAIR}"/>'
            f'<text x="{x+40}" y="{y+42}" font-family="{MONO}" font-weight="500" font-size="30" fill="{SAP}">{esc(value)}</text>'
            f'<text x="{x+40+18*len(value)+30}" y="{y+41}" font-family="{MONO}" font-weight="500" font-size="20" letter-spacing="1.6" fill="{MIST}">{esc(label.upper())}</text>')

def button(x, y, label, w=320):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="84" rx="14" fill="{BARK}"/>'
            f'<text x="{x+w/2}" y="{y+53}" font-family="{INTER}" font-weight="600" font-size="28" fill="{INK}" text-anchor="middle">{esc(label)}</text>')

# ---- posts (grid position 1 = top-left of the profile = posted LAST) ------------------
posts = {}

# 1. Brand reveal
posts["01-brand"] = svg(W, H, bg() + glow(540, 560, 520, uid="g1")
    + f'<g transform="translate(300 300)">{mark(240, 240, 230, "p1")}</g>'
    + f'<text x="540" y="930" font-family="{SORA}" font-weight="700" font-size="160" letter-spacing="-7.2" fill="{BONE}" text-anchor="middle">kerf</text>'
    + eyebrow(540, 1010, "Your business runs with kerf", anchor="middle")
    + footer("f1"))

# 2. Tagline, one gradient word per brand rule
posts["02-tagline"] = svg(W, H, bg() + glow(140, 200, 560, uid="g2") + text_gradient("tg2")
    + eyebrow(72, 300, "What Kerf does")
    + display(72, 430, ["Every call", [("answered.", "url(#tg2)")], "Every quote", "chased."], size=112)
    + body(72, 960, ["It answers the phone, texts back every missed call,", "books the estimate, follows up on the quote", "and asks for the review. You stay in the tree."], size=32)
    + footer("f2"))

# 3. Founder
posts["03-founder"] = svg(W, H, bg() + glow(960, 1100, 520, uid="g3")
    + eyebrow(72, 300, "Founder")
    + display(72, 440, ["I got tired of", "missing $3,000", "removals while", "60 feet up.", "So I built the", [("office that answers.", BARK)]], size=84)
    + body(72, 1010, ["ISA Certified Arborist. Owner-operator. Still climbs."], size=28)
    + footer("f3"))

# 4. The problem
posts["04-problem"] = svg(W, H, bg() + glow(540, 1400, 600, uid="g4")
    + eyebrow(72, 300, "The problem")
    + display(72, 440, ["You’re 60 feet up.", "Your phone rings", "four times and", "goes to voicemail."], size=96)
    + display(72, 900, [[("That was the job.", BARK)]], size=96)
    + body(72, 1050, ["Homeowners call the next company on the list.", "They do not leave a voicemail."], size=30)
    + footer("f4"))

# 5. Product: missed call -> text back (abstract dark-mode phone block)
def bubble(x, y, w, lines, mine):
    h = 36 + 40*len(lines)
    fill = CANOPY if mine else PINE
    r = (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="24" fill="{fill}" stroke="{HAIR}"/>'
         + "".join(f'<text x="{x+28}" y="{y+52+i*40}" font-family="{INTER}" font-size="27" fill="{BONE}">{esc(l)}</text>' for i, l in enumerate(lines)))
    return r, h
phone = f'<rect x="150" y="300" width="780" height="820" rx="48" fill="{PINE}" stroke="{HAIR}" stroke-width="1.5"/>'
phone += f'<rect x="150" y="300" width="780" height="820" rx="48" fill="{INK}" fill-opacity="0.55"/>'
phone += f'<text x="540" y="372" font-family="{MONO}" font-weight="500" font-size="21" letter-spacing="1.6" fill="{MIST}" text-anchor="middle">TODAY 2:14 PM</text>'
phone += f'<rect x="300" y="410" width="480" height="56" rx="28" fill="{INK}" stroke="{HAIR}"/>'
phone += f'<circle cx="332" cy="438" r="8" fill="{BARK}"/>'
phone += f'<text x="352" y="447" font-family="{MONO}" font-weight="500" font-size="21" letter-spacing="1.2" fill="{MIST}">MISSED CALL  ·  (303) 555–0142</text>'
b, h = bubble(190, 510, 620, ["Hey, sorry we missed you. This is the", "office for Northline Tree Co. Need an", "estimate? Reply with your address and", "we’ll get you on the calendar."], True)
phone += b
b2, h2 = bubble(400, 510 + h + 24, 410, ["Yeah, 1842 Elm St. Big cottonwood", "over the garage."], False)
phone += b2
b3, h3 = bubble(190, 510 + h + 24 + h2 + 24, 620, ["Got it. Tuesday 9:00 or Thursday 1:30?"], True)
phone += b3
phone += f'<text x="540" y="1095" font-family="{MONO}" font-weight="500" font-size="20" letter-spacing="1.6" fill="{SAP}" text-anchor="middle">TEXTED BACK IN 8 SECONDS</text>'
posts["05-product"] = svg(W, H, bg() + glow(540, 300, 560, uid="g5")
    + eyebrow(72, 240, "Missed call, handled")
    + phone
    + footer("f5"))

# 6. How it works
steps = [("01", "Answers the call", "Or texts back within seconds if you can’t pick up."),
         ("02", "Books the estimate", "Finds the slot on your calendar and confirms it."),
         ("03", "Chases the quote", "Follows up until the homeowner says yes or no.")]
rows = ""
for i, (n, t, s) in enumerate(steps):
    y = 560 + i*215
    rows += (f'<text x="72" y="{y}" font-family="{MONO}" font-weight="500" font-size="30" fill="{SAP}">{n}</text>'
             f'<text x="170" y="{y}" font-family="{SORA}" font-weight="700" font-size="58" letter-spacing="-2" fill="{BONE}">{esc(t)}</text>'
             f'<text x="170" y="{y+54}" font-family="{INTER}" font-size="28" fill="{MIST}">{esc(s)}</text>'
             f'<line x1="72" y1="{y+110}" x2="{W-72}" y2="{y+110}" stroke="{HAIR}"/>')
posts["06-how"] = svg(W, H, bg() + glow(1000, 200, 520, uid="g6")
    + eyebrow(72, 300, "How it works")
    + display(72, 400, ["Three jobs. Zero hires."], size=72)
    + rows
    + footer("f6"))

# 7. Quote chasing
posts["07-followup"] = svg(W, H, bg() + glow(100, 1300, 560, uid="g7")
    + eyebrow(72, 300, "Follow-up")
    + display(72, 440, ["Sent estimates", "don’t close", "themselves."], size=108)
    + body(72, 830, ["Kerf follows up on day 2, day 5 and day 9,", "then hands the answer back to you.", "No spreadsheet. No sticky notes on the dash."], size=30)
    + chip(72, 990, "follow-ups per estimate, automatic", "3", "c7")
    + footer("f7"))

# 8. Reviews
posts["08-reviews"] = svg(W, H, bg() + glow(900, 400, 520, uid="g8")
    + eyebrow(72, 300, "Reviews")
    + display(72, 440, ["Every finished job", "asks for the", "review."], size=104)
    + body(72, 820, ["Sent the evening the job closes, with your", "Google link. One tap for the homeowner.", "Nothing for you to remember."], size=30)
    + f'<g transform="translate(72 980)"><rect width="560" height="72" rx="36" fill="{PINE}" stroke="{HAIR}"/>'
    + "".join(f'<path transform="translate({36+i*44} 20) scale(1.3)" fill="{BARK}" d="M12 .9l3.4 6.9 7.6 1.1-5.5 5.4 1.3 7.6L12 18.3l-6.8 3.6 1.3-7.6L1 8.9l7.6-1.1z"/>' for i in range(5))
    + f'<text x="280" y="46" font-family="{INTER}" font-size="26" fill="{BONE}">“Showed up when they said.”</text></g>'
    + footer("f8"))

# 9. CTA
posts["09-demo"] = svg(W, H, bg() + glow(540, 700, 620, uid="g9")
    + eyebrow(540, 360, "15 minute demo", anchor="middle")
    + display(540, 500, ["Watch it answer", "your own phone."], size=100, anchor="middle")
    + body(540, 740, ["We call your business number on the demo.", "You watch Kerf pick up, text back and book."], size=30, anchor="middle")
    + button(380, 880, "Book a demo")
    + eyebrow(540, 1030, "Link in bio", fill=MIST, anchor="middle")
    + footer("f9"))

# ---- "with kerf" series ----------------------------------------------------------------
def withkerf(verb, sub_lines, uid, extra=""):
    """Your business <verb> with kerf. Gradient on 'with kerf.'"""
    return (bg() + glow(160, 260, 600, uid="g"+uid) + text_gradient("tg"+uid)
        + eyebrow(72, 300, "with kerf")
        + display(72, 430, ["Your business", verb, [("with kerf.", "url(#tg"+uid+")")]], size=112)
        + body(72, 790, sub_lines, size=30)
        + extra + footer("f"+uid))

# 10. runs with kerf (umbrella)
posts["10-runs"] = svg(W, H, withkerf("runs", ["Leads found. Calls answered. Quotes chased.", "Reviews asked for. Ads running. One system,", "in your brand colors, that you log into once."], "10",
    extra=f'<g transform="translate(72 960)">'
        + "".join(f'<rect x="{i*196}" y="0" width="180" height="64" rx="32" fill="{PINE}" stroke="{HAIR}"/>'
                  f'<text x="{i*196+90}" y="41" font-family="{MONO}" font-weight="500" font-size="20" letter-spacing="1.6" fill="{MIST}" text-anchor="middle">{t}</text>'
                  for i, t in enumerate(["LEADS", "INTAKE", "NURTURE", "REVIEWS", "ADS"]))
        + '</g>'))

# 11. scouts with kerf (neighborhood radar)
radar_rows = [("Cottonwood over the garage", "1.2 mi", "NEW"), ("Stump grinding, two stumps", "0.8 mi", "NEW"), ("Storm damage, limb on fence", "2.4 mi", "12 MIN")]
radar = f'<rect x="72" y="935" width="936" height="240" rx="24" fill="{PINE}" stroke="{HAIR}"/>'
radar += f'<text x="104" y="979" font-family="{MONO}" font-weight="500" font-size="20" letter-spacing="1.6" fill="{SAP}">NEIGHBORHOOD RADAR  ·  3 REQUESTS THIS MORNING</text>'
for i, (t, d, tag) in enumerate(radar_rows):
    y = 1026 + i*54
    radar += (f'<circle cx="116" cy="{y-9}" r="6" fill="{BARK if tag=="NEW" else ASH}"/>'
              f'<text x="140" y="{y}" font-family="{INTER}" font-size="26" fill="{BONE}">{esc(t)}</text>'
              f'<text x="860" y="{y}" font-family="{MONO}" font-weight="500" font-size="20" fill="{MIST}" text-anchor="end">{d}</text>'
              f'<text x="976" y="{y}" font-family="{MONO}" font-weight="500" font-size="18" letter-spacing="1.2" fill="{SAP if tag=="NEW" else MIST}" text-anchor="end">{tag}</text>')
posts["11-scouts"] = svg(W, H, withkerf("scouts", ["Neighbors asking for tree work get found", "the morning they post, with a draft reply", "ready for you to send. Before they Google."], "11", extra=radar))

# 12. closes with kerf (pipeline scores)
deals = [("Elm St removal", "$3,400", "82%", BARK), ("Maple crown reduction", "$1,150", "61%", KERF), ("Spruce row trim", "$2,600", "24%", ASH)]
pipe = f'<rect x="72" y="935" width="936" height="240" rx="24" fill="{PINE}" stroke="{HAIR}"/>'
pipe += f'<text x="104" y="979" font-family="{MONO}" font-weight="500" font-size="20" letter-spacing="1.6" fill="{SAP}">OPEN ESTIMATES  ·  $7,150  ·  CLOSE PROBABILITY</text>'
for i, (t, p, pct, c) in enumerate(deals):
    y = 1026 + i*54
    pipe += (f'<circle cx="116" cy="{y-9}" r="9" fill="none" stroke="{c}" stroke-width="3"/>'
             f'<text x="140" y="{y}" font-family="{INTER}" font-size="26" fill="{BONE}">{esc(t)}</text>'
             f'<text x="860" y="{y}" font-family="{MONO}" font-weight="500" font-size="20" fill="{MIST}" text-anchor="end">{p}</text>'
             f'<text x="976" y="{y}" font-family="{MONO}" font-weight="500" font-size="20" fill="{c}" text-anchor="end">{pct}</text>')
posts["12-closes"] = svg(W, H, withkerf("closes", ["Every open estimate gets a close score from", "how it was viewed, how long it has sat and", "what it is worth. Warm ones get chased first."], "12", extra=pipe))

for name, content in posts.items():
    render(name, content)

# ---- profile picture (1080x1080, circle-safe) --------------------------------------
S = 1080
pp = svg(S, S, f'<rect width="{S}" height="{S}" fill="{INK}"/>' + mark(540, 540, 300, "pp"))
render("profile-1080", pp, S, S, sub="")

# ---- highlight covers --------------------------------------------------------------
for label in ["DEMO", "HOW IT WORKS", "FOUNDER", "RESULTS", "PRICING"]:
    fs = 64 if len(label) <= 7 else 50
    hc = svg(S, S, f'<rect width="{S}" height="{S}" fill="{PINE}"/>'
             f'<circle cx="540" cy="430" r="14" fill="{BARK}"/>'
             f'<text x="540" y="590" font-family="{MONO}" font-weight="500" font-size="{fs}" letter-spacing="{fs*0.08:.1f}" fill="{BONE}" text-anchor="middle">{label}</text>')
    render("hl-" + label.lower().replace(" ", "-"), hc, S, S, sub="highlights")
# one more highlight cover with the mono mark, for a "Kerf" or "Start here" highlight
render("hl-mark", svg(S, S, f'<rect width="{S}" height="{S}" fill="{PINE}"/><g style="color:{BONE}">{mark(540, 540, 230, "hm", "currentColor")}</g>'), S, S, sub="highlights")

# ---- grid preview (Instagram 4:5 grid, 3 columns, newest top-left) -----------------
from PIL import Image
cell_w, cell_h, gap = 360, 450, 6
names = ["01-brand","10-runs","02-tagline","03-founder","04-problem","11-scouts","05-product","06-how","07-followup","12-closes","08-reviews","09-demo"]
rows_n = (len(names)+2)//3
grid = Image.new("RGB", (3*cell_w + 2*gap, rows_n*cell_h + (rows_n-1)*gap), (20, 20, 20))
for i, n in enumerate(names):
    im = Image.open(os.path.join(OUT, "posts", n + ".png")).resize((cell_w, cell_h), Image.LANCZOS)
    grid.paste(im, ((i % 3)*(cell_w+gap), (i//3)*(cell_h+gap)))
grid.save(os.path.join(OUT, "grid-preview.png"))
print("done:", names)
