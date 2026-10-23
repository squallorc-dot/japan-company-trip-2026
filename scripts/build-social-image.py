"""Build the OG card from the project's licensed Fuji + Chureito Pagoda photo.

The source photograph stays unchanged. Use a top-aligned 1200×630 crop
to preserve the pagoda spire on the right and Mount Fuji on the left.
The GitHub Pages workflow regenerates the JPEG for every deployment.
"""
from pathlib import Path
from PIL import Image, ImageOps
import json

ROOT = Path(__file__).resolve().parents[1]
PHOTOS = ROOT / "assets" / "photos"
SOURCE = PHOTOS / "fuji.webp"
CREDITS = PHOTOS / "credits.json"
OUTPUT = ROOT / "assets" / "og-cover.jpg"

credits = json.loads(CREDITS.read_text(encoding="utf-8"))
if not SOURCE.is_file() or not any(row.get("file") == SOURCE.name for row in credits):
    raise FileNotFoundError("Missing Fuji photograph or attribution")

with Image.open(SOURCE) as photo:
    cover = ImageOps.fit(
        photo.convert("RGB"),
        (1200, 630),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.0),
    )
    cover.save(OUTPUT, "JPEG", quality=88, optimize=True, progressive=True, subsampling=0)

with Image.open(OUTPUT) as check:
    assert check.size == (1200, 630), check.size
if OUTPUT.stat().st_size > 600_000:
    raise RuntimeError("OG image unexpectedly large")
print(f"OG preview rebuilt from Fuji photo: {OUTPUT} ({OUTPUT.stat().st_size:,} bytes)")
