#!/usr/bin/env python3
"""Create local WebP site photos from documented Commons sources.
If source retrieval fails, substitute a local fallback and record the failure;
never silently label a substitute as the pictured site.
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
fallback={"senkyakuPhoto":"meiji","shonanTrain":"enoshima","enodenCoast":"enoshima","komachiStreet":"narita","worldPorters":"yokohama","gotembaOutlets":"fuji","oshinoPond":"hakone","asakusaStreet":"narita","naritaStreet":"narita"}
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
    fb=outdir/(fallback[photo["id"]]+".webp")
    if not fb.is_file(): raise RuntimeError("Fallback missing: "+str(fb))
    dest.write_bytes(fb.read_bytes())
    results.append({"id":photo["id"],"status":"substitute","source":photo["source"],"fallback":fallback[photo["id"]]})
    print("WARNING",photo["id"],str(exc)[:130])
(root/"assets/photo-build-status.json").write_text(json.dumps(results,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("Photo localizations:",sum(x["status"]=="downloaded" for x in results),"of",len(results))
