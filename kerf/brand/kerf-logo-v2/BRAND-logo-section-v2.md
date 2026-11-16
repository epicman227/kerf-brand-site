## Logo (v2, Nov 6 2026)

Replaces the v1 "Logo" section in BRAND.md. Everything else in BRAND.md is unchanged.

### The mark
A tree cross-section drawn as a chat bubble: three growth rings and an amber heartwood, open gaps between them, one straight kerf cut through the whole thing, and a lime teardrop tail at the lower left. Tree company, front office, one shape.

Geometry, in units of the outer radius R (all traced from the approved render, in `build2.py`):
- Heartwood: solid disc, r = 0.196 R, `bark` amber.
- Rings: 0.268 to 0.436 R, 0.528 to 0.714 R, 0.810 to 1.0 R. The gaps between them are open (transparent), so the background shows through. The tail belongs to the outer ring.
- Cut: 0.086 R wide, on a diagonal 44 degrees off vertical, running lower-left to upper-right through the heart. It exits through the outer ring at the upper right and stops short of the outer ring at the lower left. That asymmetry is deliberate: the blade went in from the top right. Never mirror it, never close it, never make it symmetrical.
- Tail: lower left, peaking at 1.37 R around the 134 degree mark, with a convex outer edge that continues the circle and a long concave inner sweep. Never a triangle, never detached, never anywhere but lower left.
- Gradient: runs lower-left to upper-right, lime at the tail tip through `kerf` green at the heart to `canopy` at the top right. It is one gradient across all rings, not a gradient per ring.

Rules:
- Amber appears once, in the heartwood. Nothing else in the mark is amber.
- No leaf, no saw blade, no chat lines, no glow, no drop shadow, no extra rings.
- The mark is always transparent in the gaps and the cut. Never fill them with white or a flat colour; if a format cannot do transparency, place the mark on `ink` or `bone` and export that.

### Files (Logos/)
| File | Use |
|---|---|
| `kerf-mark.svg` | Gradient mark, 96x96, transparent. Dark and light grounds. |
| `kerf-mark-mono.svg` | Single colour via `currentColor`, same geometry, heart solid. Print, embroidery, favicons, anywhere one colour. |
| `kerf-wordmark.svg` | Mark plus bone "kerf", 224x96, for dark grounds. |
| `kerf-wordmark-dark-on-light.svg` | Mark plus ink "kerf", for light grounds. |
| `kerf-icon.svg` | App icon and favicon: ink rounded square (radius 22/96), mark at 69%. |
| `kerf-render-original.png` | The approved Higgsfield render, 1024px, transparent. Reference only; use the SVGs for production. |

Wordmark: lowercase "kerf", Sora 700, size 1.28 R, letter-spacing -0.035 em, starting 0.215 R to the right of the ring, baseline at 0.45 R below the ring centre (so the text is optically centred on the ring). Keep "kerf" as live text beside the inlined mark SVG so the font always loads. The SVG files fall back to Inter when Sora is missing; ship Sora with the site.

### Clear space and size
Clear space on all sides equals the outer ring thickness (0.19 R). Minimum mark size 24px. Minimum lockup width 96px. Never place the mark on `kerf` green or on the gradient; on `pine` or `canopy` use the mono mark in `bone`.

### Light grounds
The gradient mark works on `bone` as is. Under 32px on light grounds prefer the mono mark in `ink`; the lime tail is low contrast on bone at that size.

### Do not
Add a notification badge. Use the v1 ring-only mark alongside v2. Put the wordmark inside the bubble. Fill the gaps. Flip the cut.
