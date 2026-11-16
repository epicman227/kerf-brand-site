"""Crop and convert real job-site photos into ../images/<name>.webp.

Sources are the founder's own job photos (SO2/assets). No company branding may
show: founder.png is a Higgsfield edit of the owner shot with the shirt logo removed.
hero-bg.webp is the original Higgsfield tree-ring background (founder kept it), not built here.
Run: python3 photos.py
"""
import os
from PIL import Image, ImageOps

SO = "/Users/cgrovenor/Desktop/CCode/SO2/assets/Media/"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "images")

# name: (source, aspect w/h, output width, focus x, focus y)
PHOTOS = {
    "hero":       (SO + "IMG_5612.jpeg", 4 / 5, 900, 0.5, 0.4),
    "storm-roof": (SO + "IMG_1931.jpeg", 4 / 5, 900, 0.45, 0.5),
    "rigging":    (SO + "IMG_7296.JPG", 4 / 3, 1100, 0.5, 0.42),
    "grinder":    (SO + "IMG_1029.JPG", 4 / 3, 1100, 0.5, 0.6),
    "cleanup":    (SO + "IMG_8945.JPG", 4 / 3, 1100, 0.5, 0.68),
    "log-rounds": (SO + "IMG_4870.JPG", 16 / 7, 1800, 0.5, 0.62),
    "spar":       (SO + "FullSizeRender 3.jpeg", 4 / 5, 1000, 0.5, 0.35),
    "founder":    (os.path.join(HERE, "photo-src", "founder.png"), 4 / 5, 880, 0.5, 0.4),
}


def crop(im, aspect, fx, fy):
    w, h = im.size
    if w / h > aspect:
        nw = round(h * aspect)
        x = min(max(round(fx * w - nw / 2), 0), w - nw)
        return im.crop((x, 0, x + nw, h))
    nh = round(w / aspect)
    y = min(max(round(fy * h - nh / 2), 0), h - nh)
    return im.crop((0, y, w, y + nh))


for name, (src, aspect, width, fx, fy) in PHOTOS.items():
    im = crop(ImageOps.exif_transpose(Image.open(src)).convert("RGB"), aspect, fx, fy)
    if im.width > width:
        im = im.resize((width, round(width / aspect)), Image.LANCZOS)
    path = os.path.join(OUT, name + ".webp")
    im.save(path, "WEBP", quality=68, method=6)  # PIL drops EXIF/GPS unless passed
    print(f"{name}: {im.size[0]}x{im.size[1]} {os.path.getsize(path) // 1024} KB")
