#!/usr/bin/env python3
"""Build an installable 512px PWA icon from the project's 192px image."""
from pathlib import Path
from PIL import Image

source=Path("assets/icon-192.png")
target=Path("assets/icon-512.png")
if not source.exists():
    raise FileNotFoundError(source)
with Image.open(source) as icon:
    converted=icon.convert("RGBA").resize((512,512), Image.Resampling.LANCZOS)
    converted.save(target, format="PNG", optimize=True)
with Image.open(target) as check:
    assert check.size==(512,512)
print(f"Built {target} ({target.stat().st_size:,} bytes)")
