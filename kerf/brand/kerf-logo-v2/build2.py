#!/usr/bin/env python3
"""Kerf logo v2: vector rebuild traced from the chosen Higgsfield render.
All geometry below is measured from the render's alpha channel, in units of R
(outer ring radius). Nothing is eyeballed."""
import math, os, subprocess

OUT = "/home/claude/kerf-logo/out2"
os.makedirs(OUT, exist_ok=True)

INK, BONE, BARK = "#0A0F0D", "#F4F1EA", "#F2A43A"
HEART = "#F7B348"            # measured heart colour (bark + render's slight lift)

# ---- measured geometry (R = 1) -------------------------------------------------
HEART_R = 0.196
RINGS = [(0.268, 0.436), (0.528, 0.714), (0.810, 1.000)]   # (inner, outer)
CUT_W = 0.086
CUT_OFF = -0.0103        # centreline sits 1% of R off the ring centre (measured)
CUT_ANGLE = 133.6            # degrees from +x, y down: line runs upper-right -> lower-left
CUT_T0, CUT_T1 = -1.15, 0.76 # along that line: exits upper-right, stops inside the last gap
# tail: outer-edge radius by angle (deg -> r/R), measured at 2 deg steps
TAIL = {106:1.000,108:1.003,110:1.003,112:1.006,114:1.012,116:1.020,118:1.031,
        120:1.051,122:1.074,124:1.105,126:1.153,128:1.221,130:1.311,132:1.365,
        134:1.370,136:1.325,138:1.212,140:1.136,142:1.088,144:1.054,146:1.031,
        148:1.012,150:1.000}
# gradient axis: lime at lower-left -> teal at upper-right
G_DIR = (0.82, -0.57)
G_T0, G_T1 = -1.38, 1.0
G_STOPS = [(0.00,"#D2F35A"),(0.16,"#C2EF5A"),(0.33,"#8CE15D"),(0.54,"#45C663"),
           (0.62,"#2FB464"),(0.79,"#1D8956"),(1.00,"#0E6644")]

def polar(cx, cy, R, deg, r):
    a = math.radians(deg)
    return (cx + R*r*math.cos(a), cy + R*r*math.sin(a))

def outline(cx, cy, R):
    """Circle with the measured tail. Arc the long way from 150deg to 106deg,
    then Catmull-Rom -> cubic Beziers through the measured tail points."""
    degs = sorted(TAIL)
    pts = [polar(cx, cy, R, d, TAIL[d]*1.0067) for d in degs]  # tail was measured against R=177; true R=175.8
    start, end = pts[-1], pts[0]       # 150deg, 106deg
    d = f"M {start[0]:.3f} {start[1]:.3f} A {R} {R} 0 1 1 {end[0]:.3f} {end[1]:.3f} "
    # Catmull-Rom through pts (106 -> 150), with phantom endpoints on the circle
    P = [polar(cx, cy, R, 104, 1.0)] + pts + [polar(cx, cy, R, 152, 1.0)]
    for i in range(1, len(P)-2):
        p0, p1, p2, p3 = P[i-1], P[i], P[i+1], P[i+2]
        c1 = (p1[0] + (p2[0]-p0[0])/6, p1[1] + (p2[1]-p0[1])/6)
        c2 = (p2[0] - (p3[0]-p1[0])/6, p2[1] - (p3[1]-p1[1])/6)
        d += f"C {c1[0]:.3f} {c1[1]:.3f} {c2[0]:.3f} {c2[1]:.3f} {p2[0]:.3f} {p2[1]:.3f} "
    return d + "Z"

def cut_rect(cx, cy, R):
    L = (CUT_T1 - CUT_T0) * R
    return (f'<rect x="{cx + CUT_T0*R:.3f}" y="{cy - CUT_W*R/2 + CUT_OFF*R:.3f}" width="{L:.3f}" '
            f'height="{CUT_W*R:.3f}" transform="rotate({CUT_ANGLE} {cx} {cy})"/>')

def ring_mask_shapes(cx, cy, R, fill):
    """Shapes that ARE the mark (heart + rings), expressed as the outline
    minus the gaps, so the tail belongs to the outer ring."""
    gaps = ""
    gaps += f'<circle cx="{cx}" cy="{cy}" r="{RINGS[0][0]*R:.3f}" fill="#000"/>'
    gaps += f'<circle cx="{cx}" cy="{cy}" r="{HEART_R*R:.3f}" fill="#fff"/>'
    for (i, o), (ni, no) in zip(RINGS[:-1], RINGS[1:]):
        gaps += (f'<circle cx="{cx}" cy="{cy}" r="{ni*R:.3f}" fill="none" stroke="#000" '
                 f'stroke-width="{(ni-o)*R:.3f}" transform="translate(0 0)"/>')
    return gaps

def mark(cx, cy, R, uid, fill=None):
    """fill=None -> gradient; otherwise a flat colour (currentColor for mono)."""
    g0 = (cx + G_DIR[0]*G_T0*R, cy + G_DIR[1]*G_T0*R)
    g1 = (cx + G_DIR[0]*G_T1*R, cy + G_DIR[1]*G_T1*R)
    defs = ""
    if fill is None:
        defs += (f'<linearGradient id="{uid}g" gradientUnits="userSpaceOnUse" '
                 f'x1="{g0[0]:.3f}" y1="{g0[1]:.3f}" x2="{g1[0]:.3f}" y2="{g1[1]:.3f}">'
                 + "".join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in G_STOPS)
                 + '</linearGradient>')
        paint, heart = f"url(#{uid}g)", HEART
    else:
        paint, heart = fill, fill
    # mask: white = keep. Start with the outline, knock out gaps and the cut.
    m = f'<path d="{outline(cx, cy, R)}" fill="#fff"/>'
    m += f'<circle cx="{cx}" cy="{cy}" r="{RINGS[0][0]*R:.3f}" fill="#000"/>'      # heart gap
    for (i, o), (ni, no) in zip(RINGS[:-1], RINGS[1:]):                           # ring gaps
        mid, w = (o+ni)/2*R, (ni-o)*R
        m += f'<circle cx="{cx}" cy="{cy}" r="{mid:.3f}" fill="none" stroke="#000" stroke-width="{w:.3f}"/>'
    m += f'<g fill="#000">{cut_rect(cx, cy, R)}</g>'
    hm = f'<rect x="-1000" y="-1000" width="3000" height="3000" fill="#fff"/><g fill="#000">{cut_rect(cx, cy, R)}</g>'
    defs += f'<mask id="{uid}m">{m}</mask><mask id="{uid}h">{hm}</mask>'
    body = (f'<rect x="{cx-1.5*R:.1f}" y="{cy-1.5*R:.1f}" width="{3*R}" height="{3*R}" fill="{paint}" mask="url(#{uid}m)"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{HEART_R*R:.3f}" fill="{heart}" mask="url(#{uid}h)"/>')
    return f"<defs>{defs}</defs>{body}"

def wordmark_text(cx, cy, R, fill):
    x = cx + R + 0.215*R
    y = cy + 0.45*R
    fs = 1.28*R
    return (f'<text x="{x:.2f}" y="{y:.2f}" font-family="Sora, Inter, \'Segoe UI\', system-ui, sans-serif" '
            f'font-weight="700" font-size="{fs:.2f}" letter-spacing="{-0.035*fs:.2f}" fill="{fill}">kerf</text>')

def svg(w, h, body, label="Kerf"):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
            f'role="img" aria-label="{label}">{body}</svg>\n')

R, C = 46.0, 48.0
files = {
    "kerf-mark.svg": svg(96, 96, mark(C, C, R, "k")),
    "kerf-mark-mono.svg": svg(96, 96, mark(C, C, R, "m", fill="currentColor")),
    "kerf-wordmark.svg": svg(224, 96, mark(C, C, R, "w") + wordmark_text(C, C, R, BONE)),
    "kerf-wordmark-dark-on-light.svg": svg(224, 96, mark(C, C, R, "l") + wordmark_text(C, C, R, INK)),
    "kerf-icon.svg": svg(96, 96, f'<rect width="96" height="96" rx="22" fill="{INK}"/>' + mark(48, 48, 33.0, "i")),
}
for n, c in files.items():
    open(os.path.join(OUT, n), "w").write(c)

# ---- side-by-side check against the render ------------------------------------
# Render's mark: centre (289.8, 495.5), R=177 on a 1024 canvas. Reproduce at the same place.
cmp_ = svg(1024, 1024, f'<rect width="1024" height="1024" fill="{INK}"/>' + mark(290.05, 495.84, 175.83, "c")
           + wordmark_text(290.05, 495.84, 175.83, BONE))
open(os.path.join(OUT, "_compare-svg.svg"), "w").write(cmp_)
subprocess.run(["rsvg-convert", "-w", "1024", "-o", os.path.join(OUT, "_compare-svg.png"), os.path.join(OUT, "_compare-svg.svg")], check=True)

# preview sheet
sheet = svg(900, 420,
    f'<rect width="900" height="420" fill="{INK}"/><rect x="450" width="450" height="420" fill="{BONE}"/>'
    f'<g transform="translate(40 40) scale(1.6)">{mark(C,C,R,"s1")+wordmark_text(C,C,R,BONE)}</g>'
    f'<g transform="translate(40 230)">{mark(C,C,R,"s2")}</g>'
    f'<g transform="translate(150 254) scale(0.5)">{mark(C,C,R,"s3")}</g>'
    f'<g transform="translate(210 266) scale(0.25)">{mark(C,C,R,"s4")}</g>'
    f'<g transform="translate(260 230)" style="color:{BONE}">{mark(C,C,R,"s5","currentColor")}</g>'
    f'<g transform="translate(490 40) scale(1.6)">{mark(C,C,R,"s6")+wordmark_text(C,C,R,INK)}</g>'
    f'<g transform="translate(490 230)">{mark(C,C,R,"s7")}</g>'
    f'<g transform="translate(600 230)" style="color:{INK}">{mark(C,C,R,"s8","currentColor")}</g>'
    f'<g transform="translate(710 230)"><rect width="96" height="96" rx="22" fill="{INK}"/>{mark(48,48,33.0,"s9")}</g>'
)
open(os.path.join(OUT, "preview-sheet.svg"), "w").write(sheet)
subprocess.run(["rsvg-convert", "-w", "1800", "-o", os.path.join(OUT, "preview-sheet.png"), os.path.join(OUT, "preview-sheet.svg")], check=True)
print(sorted(os.listdir(OUT)))
