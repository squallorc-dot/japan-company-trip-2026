#!/usr/bin/env python3
"""Download verified existing scene photos and convert them to small, local WebP assets.

Runs on a GitHub-hosted runner because external photo CDNs are not accessible from
our local build environment. Existing webpage stays unchanged until ALL files pass.
"""
import hashlib
import io
import json
import os
from pathlib import Path
import re
import time
from urllib.parse import quote

import requests
from PIL import Image, ImageOps, UnidentifiedImageError

ROOT = Path(__file__).resolve().parents[1]
PHOTO_DIR = ROOT / 'assets' / 'photos'
MEDIA_JS = ROOT / 'media.js'
AGENT = 'JapanCompanyTrip2026/1.0 (personal travel guide; https://github.com/squallorc-dot/japan-company-trip-2026)'
HEADERS = {'User-Agent': AGENT, 'Accept': 'image/avif,image/webp,image/jpeg,image/png,image/*;q=0.8'}

# Exact files that the current website links to. No replacement photographs.
PHOTOS = [
    dict(key='meiji', title='明治神宮', filename='Torii of Meiji Shrine.jpg', author='Christophe95', license='CC BY-SA 4.0', license_url='https://creativecommons.org/licenses/by-sa/4.0/'),
    dict(key='enoshima', title='江之島海蠟燭', filename='EnoshimaSeaCandle.jpg', author='Maksym Grinenko', license='CC BY-SA 4.0', license_url='https://creativecommons.org/licenses/by-sa/4.0/'),
    dict(key='hakone', title='箱根神社', filename='Hakone-jinja torii - Hakone, Japan -DSC05709.jpg', author='Daderot', license='CC0 1.0', license_url='https://creativecommons.org/publicdomain/zero/1.0/'),
    dict(key='fuji', title='新倉山忠靈塔', url='https://images.unsplash.com/photo-1779887609927-734b1cf1a768?auto=format&fit=crop&w=1400&q=82', page='https://unsplash.com/photos/_VCtujeQNSY', author='Takashi Miyazaki (原網站記錄，作者尚待複核)', license='Unsplash License', license_url='https://unsplash.com/license'),
    dict(key='narita', title='成田山新勝寺', filename='Naritasan Shinshoji Temple.jpg', author='Manish Prabhune', license='CC BY 2.0', license_url='https://creativecommons.org/licenses/by/2.0/'),
    dict(key='yokohama', title='橫濱紅磚倉庫', filename='Yokohama Red Brick Warehouse 20191207 2006.jpg', author='Pcs34560', license='Public domain', license_url='https://commons.wikimedia.org/wiki/Commons:Public_domain'),
]

def download(url):
    last = None
    for attempt in range(4):
        try:
            r = requests.get(url, headers=HEADERS, timeout=45, allow_redirects=True)
            r.raise_for_status()
            if len(r.content) < 10000 or len(r.content) > 30_000_000:
                raise ValueError('Unexpected file size: ' + str(len(r.content)))
            ctype = r.headers.get('content-type','')
            if not ctype.startswith('image/'):
                raise ValueError('Not an image: '+ctype)
            return r.content, r.url
        except (requests.RequestException,ValueError) as ex:
            last = ex
            print(f'  download attempt {attempt + 1} failed: {type(ex).__name__}: {ex}', flush=True)
            time.sleep(2 + 2 * attempt)
    raise RuntimeError('Could not download image: ' + str(last))

def commons_urls(filename):
    basename = filename.replace(' ', '_')
    digest = hashlib.md5(basename.encode('utf-8')).hexdigest()
    prefix = 'https://upload.wikimedia.org/wikipedia/commons/' + digest[0] + '/' + digest[:2] + '/' + quote(basename, safe='-_.()')
    thumb = ('https://upload.wikimedia.org/wikipedia/commons/thumb/' + digest[0] + '/' + digest[:2] + '/' + quote(basename, safe='-_.()') + '/1280px-' + quote(basename, safe='-_.()'))
    return [thumb, prefix, 'https://commons.wikimedia.org/wiki/Special:Redirect/file/' + quote(filename, safe='')]

def prepare():
    built={}
    attribution=[]
    for p in PHOTOS:
        print('Downloading:',p['key'], flush=True)
        candidates=[p['url']] if 'url' in p else commons_urls(p['filename'])
        image_bytes=None
        effective_url=None
        failure=[]
        for url in candidates:
            try:
                image_bytes,effective_url=download(url)
                break
            except Exception as ex:
                failure.append(str(ex))
                print('  trying fallback source', flush=True)
        if not image_bytes:
            raise RuntimeError('FAILED to obtain '+p['key']+'; '+str(failure))
        try:
            with Image.open(io.BytesIO(image_bytes)) as img:
                img = ImageOps.exif_transpose(img).convert('RGB')
                if min(img.size)<450:
                    raise ValueError('Not a full photograph: '+str(img.size))
                original_size=img.size
                img.thumbnail((1400,1400), Image.Resampling.LANCZOS)
                buffer=io.BytesIO()
                img.save(buffer,'WEBP',quality=82,method=6)
                out=buffer.getvalue()
        except (UnidentifiedImageError,OSError,ValueError) as ex:
            raise RuntimeError('Image validation failed: '+p['key']+' '+str(ex)) from ex
        if len(out)<8_000:
            raise RuntimeError('Suspicious output size '+p['key'])
        filename=f"{p['key']}.webp"
        built[filename]=out
        source_page=p['page'] if 'page' in p else ('https://commons.wikimedia.org/wiki/File:'+quote(p['filename'].replace(' ','_'),safe='-_.()'))
        attribution.append(dict(id=p['key'],subject=p['title'],file=filename,source_page=source_page,original_url=effective_url,author=p['author'],license=p['license'],license_url=p['license_url'],modification='Downscaled to max. 1400px, converted to WebP for web delivery',original_dimensions=f'{original_size[0]}x{original_size[1]}',webp_bytes=len(out)))
        print(f"  {p['key']}: {original_size[0]}x{original_size[1]} -> {len(out):,} bytes WebP",flush=True)

    # Only save when every image succeeded.
    PHOTO_DIR.mkdir(parents=True,exist_ok=True)
    for filename, data in built.items():
        (PHOTO_DIR/filename).write_bytes(data)
    (PHOTO_DIR/'credits.json').write_text(json.dumps(attribution,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

    original=MEDIA_JS.read_text(encoding='utf-8')
    updated=original
    for p in PHOTOS:
        key=p['key']
        value="'./assets/photos/"+key+".webp'"
        if 'filename' in p:
            prior="image:commons('"+p['filename']+"')"
        else:
            prior="image:'"+p['url']+"'"
        if updated.count(prior)!=1:
            raise RuntimeError('Source image expression missing or duplicated: '+key)
        updated=updated.replace(prior,'image:'+value)
    if updated==original:
        raise RuntimeError('No photos substituted')
    # File credit/links remain intact: authors and original photo licensing preserved in the website footer.
    updated=updated.replace('// 部分照片為過往實景，並非 2026 年活動的現場照片。外部圖片需有網路才會載入。', '// 所有主要照片皆存於 assets/photos/，可供離線閱讀；已縮放轉 WebP，詳見 credits.json。')
    MEDIA_JS.write_text(updated,encoding='utf-8')

    sw=ROOT/'sw.js'
    sw_content=sw.read_text(encoding='utf-8')
    old="japan-trip-2026-v20261023-06"
    if old not in sw_content:raise RuntimeError('Unexpected service-worker cache version')
    sw_content=sw_content.replace(old,"japan-trip-2026-v20261023-07")
    marker="  './assets/video-poster-4.svg','./assets/video-poster-5.svg'"
    if marker not in sw_content:raise RuntimeError('Service-worker asset anchor changed')
    sw_content=sw_content.replace(marker,marker+",\n  './assets/photos/meiji.webp','./assets/photos/enoshima.webp','./assets/photos/hakone.webp',\n  './assets/photos/fuji.webp','./assets/photos/narita.webp','./assets/photos/yokohama.webp'")
    sw.write_text(sw_content,encoding='utf-8')
    data=ROOT/'data.js'
    dt=data.read_text(encoding='utf-8')
    if "version:'2026.10.23-06'" not in dt:raise RuntimeError('Unexpected data.js version')
    data.write_text(dt.replace("version:'2026.10.23-06'","version:'2026.10.23-07'"),encoding='utf-8')
    ver=ROOT/'version.json'
    ver.write_text(json.dumps(dict(version='2026.10.23-07',updated='2026-10-23',summary='六張景點照片本地化為 WebP，納入離線閱讀與圖片授權清單'),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('All 6 photos downloaded, compressed and referenced locally.',flush=True)

if __name__=='__main__':
    prepare()