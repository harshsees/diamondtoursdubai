"""
Fetches the site's photography from Wikimedia Commons and crops it to the
exact sizes the layout expects.

Every file below is public domain or CC0, so the images carry no attribution
or share-alike obligation. Provenance is still recorded in
public/media/CREDITS.md because knowing where an asset came from matters when
someone later wants to swap or verify it.

Run:  python tools/fetch-photos.py
"""

from __future__ import annotations

import io
import json
import os
import urllib.parse
import urllib.request

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "media")
API = "https://commons.wikimedia.org/w/api.php"
UA = "KeyriseExportSiteBuild/1.0 (static marketing site)"

# --------------------------------------------------------------------------
# sources
# --------------------------------------------------------------------------
# `focus` is the point the crop keeps centred, as (x, y) fractions of the
# source. It is what stops a wide crop from cutting the subject in half.
SOURCES = {
    "roro": {
        "title": "File:DEFENDER 24 Concludes at the Port of Kemi, Finland (8533115).jpg",
        "license": "Public domain (U.S. Department of Defense)",
        "focus": (0.30, 0.42),
    },
    "aerial": {
        "title": "File:Aerial photograph of the Port of Miami Container Port.jpg",
        "license": "Public domain (U.S. federal government)",
        "focus": (0.34, 0.52),
    },
    "gantry": {
        "title": "File:PASSAT SPRING Container Ship (18671362921).jpg",
        "license": "CC0 1.0",
        "focus": (0.55, 0.56),
    },
    "dusk": {
        "title": "File:Docks (170294071).jpeg",
        "license": "CC0 1.0",
        "focus": (0.42, 0.52),
    },
    "rail": {
        "title": "File:Oak Point Link triboro jeh.jpg",
        "license": "CC0 1.0",
        "focus": (0.55, 0.60),
    },
    "inspect": {
        "title": "File:Vehicle & Cargo Inspection System (VACIS) (5765147886).jpg",
        "license": "Public domain (U.S. Customs and Border Protection)",
        "focus": (0.45, 0.55),
    },
}

# target path -> (source key, width, height)
OUTPUTS = [
    # Hero slider — 1170 x 650 at 2x.
    ("slides/slide-01.jpg", "gantry", 2340, 1300),
    ("slides/slide-02.jpg", "dusk", 2340, 1300),
    ("slides/slide-03.jpg", "roro", 2340, 1300),
    ("slides/slide-04.jpg", "aerial", 2340, 1300),
    ("slides/slide-05.jpg", "rail", 2340, 1300),
    # "Who We Are" carousel — 4:3.
    ("about/about-01.jpg", "aerial", 1014, 760),
    ("about/about-02.jpg", "gantry", 1014, 760),
    ("about/about-03.jpg", "inspect", 1014, 760),
    ("about/about-04.jpg", "rail", 1014, 760),
    # Inner-page banners — wide and shallow, sitting under the gradient wash.
    ("banners/about.jpg", "aerial", 1920, 640),
    ("banners/services.jpg", "gantry", 1920, 640),
    ("banners/compliance.jpg", "inspect", 1920, 640),
    ("banners/cargo.jpg", "rail", 1920, 640),
    ("banners/contact.jpg", "dusk", 1920, 640),
    # Social card.
    ("og.jpg", "gantry", 1200, 630),
]


def fetch(title: str, width: int) -> Image.Image:
    """Pulls a scaled render from Commons rather than the full original."""
    params = {
        "action": "query",
        "format": "json",
        "titles": title,
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata",
        "iiurlwidth": width,
    }
    req = urllib.request.Request(
        API + "?" + urllib.parse.urlencode(params), headers={"User-Agent": UA}
    )
    with urllib.request.urlopen(req, timeout=90) as r:
        data = json.load(r)

    pages = data.get("query", {}).get("pages", {})
    page = next(iter(pages.values()))
    if "imageinfo" not in page:
        raise SystemExit(f"Commons has no file named {title!r}")
    info = page["imageinfo"][0]
    url = info.get("thumburl") or info["url"]

    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=180) as r:
        return Image.open(io.BytesIO(r.read())).convert("RGB")


def crop_to(img: Image.Image, w: int, h: int, focus: tuple[float, float]) -> Image.Image:
    """Cover-crops to the target ratio around `focus`, then resizes."""
    src_w, src_h = img.size
    target = w / h

    if src_w / src_h > target:
        box_h = src_h
        box_w = round(src_h * target)
    else:
        box_w = src_w
        box_h = round(src_w / target)

    cx = focus[0] * src_w
    cy = focus[1] * src_h
    left = round(min(max(cx - box_w / 2, 0), src_w - box_w))
    top = round(min(max(cy - box_h / 2, 0), src_h - box_h))

    return img.crop((left, top, left + box_w, top + box_h)).resize((w, h), Image.LANCZOS)


def main() -> None:
    # One download per source, at the largest width any output needs.
    needed: dict[str, int] = {}
    for _, key, w, _ in OUTPUTS:
        needed[key] = max(needed.get(key, 0), w)

    cache: dict[str, Image.Image] = {}
    for key, width in needed.items():
        src = SOURCES[key]
        print(f"fetching {key} at {width}px …")
        cache[key] = fetch(src["title"], max(width, 1600))

    for path, key, w, h in OUTPUTS:
        dest = os.path.join(OUT, path)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        crop_to(cache[key], w, h, SOURCES[key]["focus"]).save(
            dest, quality=82, optimize=True, progressive=True
        )
        print(f"  {path}  {w}x{h}")

    lines = [
        "# Photography credits",
        "",
        "Every photograph on this site is **public domain or CC0**, so none of it",
        "carries an attribution or share-alike obligation. Sources are listed here",
        "for provenance, and so any image can be traced, verified or replaced.",
        "",
        "Re-fetch and re-crop them all with `python tools/fetch-photos.py`.",
        "",
        "| Source | Licence | Used for |",
        "| --- | --- | --- |",
    ]
    for key, src in SOURCES.items():
        used = ", ".join(f"`{p}`" for p, k, _, _ in OUTPUTS if k == key)
        name = src["title"][5:]
        url = "https://commons.wikimedia.org/wiki/" + urllib.parse.quote(
            src["title"].replace(" ", "_")
        )
        lines.append(f"| [{name}]({url}) | {src['license']} | {used} |")
    lines += [
        "",
        "`skyline.svg` and the favicons are drawn procedurally by",
        "`tools/generate-media.py` and are original to this repository.",
        "",
    ]
    with open(os.path.join(OUT, "CREDITS.md"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))

    total = sum(
        os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(OUT) for f in fs
    )
    print(f"\nphotography written to {OUT} ({total / 1024:.0f} KB total in /media)")


if __name__ == "__main__":
    main()
