#!/usr/bin/env python3
"""Create local WebP photos only from properly documented original locations.
A missing source blocks deployment instead of relabeling another attraction.
"""
import json
import os
from pathlib import Path
from urllib.request import Request,urlopen
from urllib.parse import quote
from io import BytesIO
from PIL import Image, ImageOps
root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/"assets/photo-sources.json").read_text(encoding="utf-8"))["photos"]
outdir=root/"assets/photos"
results=[]
for photo in manifest:
  dest=outdir/(photo["id"]+".webp")
  file=photo["file"]
  url="https://commons.wikimedia.org/wiki/Special:FilePath/"+quote(file,safe="")+"?width=900"
  try:
    req=Request(url,headers={"User-Agent":"JapanTripTravelGuide/1.0 (noncommercial image attribution; contact via repository GitHub issues)","Accept":"image/webp,image/jpeg,image/png,*/*"})
    with urlopen(req,timeout=18) as r:
      payload=r.read(8_000_000)
    with Image.open(BytesIO(payload)) as im:
      img=ImageOps.exif_transpose(im)
      img.thumbnail((900,900))
      if img.mode!="RGB":img=img.convert("RGB")
      img.save(dest,format="WEBP",quality=78,method=5)
    results.append({"id":photo["id"],"status":"downloaded","source":photo["source"]})
    print("OK",photo["id"],dest.stat().st_size)
  except Exception as exc:
    # Never misidentify scenery. Existing public deployment stays unchanged if this build fails.
    if dest.is_file():
      dest.unlink()
    results.append({"id":photo["id"],"status":"failed","source":photo["source"],"error":str(exc)[:250]})
    print("PHOTO SOURCE UNAVAILABLE",photo["id"],str(exc)[:130])
(root/"assets/photo-build-status.json").write_text(json.dumps(results,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("Photo localizations:",sum(x["status"]=="downloaded" for x in results),"of",len(results))
if any(x["status"] != "downloaded" for x in results):
  raise RuntimeError("Some attributed photos could not be downloaded. Deployment stopped to prevent incorrect scenery.")
