"""Build a reusable Open Graph JPEG from photos already licensed and stored in this repository.
This script crops/scales photos only; do not overwrite source photographs.
Credit details for these photos remain in assets/photos/credits.json and the website footer.
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json

ROOT = Path(__file__).resolve().parents[1]
PHOTOS = ROOT / "assets" / "photos"
credits = json.loads((PHOTOS / "credits.json").read_text(encoding="utf-8"))
if not credits:
    raise ValueError("Missing photograph attribution records")
for name in ("fuji", "enoshima", "hakone"):
    if not (PHOTOS / (name + ".webp")).is_file():
        raise FileNotFoundError(f"Missing expected photograph {name}")

canvas = Image.new("RGB", (1200, 630), "#f5efe8")
panels = [
    ("fuji", 0, 0, 620, 630),
    ("enoshima", 626, 0, 310, 630),
    ("hakone", 942, 0, 258, 630),
]
for name, x, y, w, h in panels:
    with Image.open(PHOTOS / (name + ".webp")) as source:
        photo = ImageOps.fit(source.convert("RGB"), (w, h), method=Image.Resampling.LANCZOS)
        canvas.paste(photo, (x, y))
# Narrow paper-colored gutters create one calm landscape preview instead of tiny text.
draw = ImageDraw.Draw(canvas)
draw.rectangle((620, 0, 625, 629), fill="#fff9ef")
draw.rectangle((936, 0, 941, 629), fill="#fff9ef")
out = ROOT / "assets" / "og-cover.jpg"
canvas.save(out, "JPEG", quality=85, optimize=True, progressive=True, subsampling=0)
with Image.open(out) as check:
    assert check.size == (1200, 630), check.size
if out.stat().st_size > 600_000:
    raise RuntimeError("OG image unexpectedly large")
print(f"OG cover created: {out} ({out.stat().st_size:,} bytes, 1200×630)")
