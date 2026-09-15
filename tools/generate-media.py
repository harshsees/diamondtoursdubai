"""
Generates the non-photographic assets: the footer skyline watermark and the
favicons. Both are original to this repository and drawn procedurally, so they
stay crisp at any size and weigh almost nothing.

Photography is a separate concern — see tools/fetch-photos.py. This script
deliberately writes nothing into /media/slides, /media/about or /media/banners.

Run:  python tools/generate-media.py
"""

from __future__ import annotations

import os

import numpy as np
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "media")

# Brand palette, matching src/app/globals.css.
TEAL = (15, 61, 62)
AMBER = (232, 163, 61)


def write_skyline() -> None:
    """
    A seamless port silhouette, tiled horizontally under the footer. Written as
    SVG so it stays crisp at any width and weighs almost nothing. Kept fine
    grained and very pale — it reads as a watermark, never as a graphic.
    """
    W, H = 1400, 400
    rng = np.random.default_rng(4242)
    parts: list[str] = []

    def rect(x, y, w, h):
        parts.append(f'<rect x="{x:.0f}" y="{y:.0f}" width="{w:.0f}" height="{h:.0f}"/>')

    def tower(x, w, h, spire=0.0):
        """A tall block, optionally tapering into a mast."""
        rect(x, H - h, w, h)
        if spire:
            rect(x + w * 0.42, H - h - spire, max(2, w * 0.16), spire)

    # Back layer: a dense, low-rise band the full width.
    x = -10.0
    while x < W + 10:
        bw = float(rng.integers(11, 34))
        bh = float(rng.integers(46, 132))
        rect(x, H - bh, bw, bh)
        x += bw + float(rng.integers(2, 9))

    # Landmark towers, spread so the tile does not read as repeating.
    for cx, tw, th, sp in (
        (96, 30, 250, 60),
        (238, 22, 196, 34),
        (500, 34, 292, 78),
        (556, 20, 214, 0),
        (742, 26, 236, 46),
        (985, 38, 274, 66),
        (1112, 22, 188, 30),
        (1298, 28, 224, 52),
    ):
        tower(cx, tw, th, sp)

    # Ship-to-shore gantries, drawn thin so they stay graphic at any scale.
    for cx in (350, 660, 1180):
        base = H - 20
        top = base - 186
        for dx in (-40, 40):
            rect(cx + dx - 3, top, 6, 186)
        rect(cx - 46, top, 92, 7)
        rect(cx - 3, top - 44, 6, 44)
        rect(cx - 168, top - 22, 224, 6)
        rect(cx - 132, top - 16, 5, 40)
        rect(cx - 146, top + 24, 33, 7)

    # A vessel silhouette anchoring the right third.
    parts.append(
        f'<path d="M820 {H - 78} h300 l-24 36 h-258 z"/>'
        f'<rect x="1064" y="{H - 108}" width="46" height="30"/>'
    )

    # Container blocks along the very bottom.
    for row, (y, uw, uh) in enumerate(((H - 30, 34, 15), (H - 15, 40, 15))):
        bx = -14 - row * 11
        while bx < W:
            for k in range(int(rng.integers(1, 3))):
                rect(bx, y - k * uh, uw - 3, uh - 2)
            bx += uw + 4

    body = "".join(parts)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
        f'viewBox="0 0 {W} {H}">'
        f'<g fill="#f1f1f4">{body}</g></svg>'
    )
    with open(os.path.join(OUT, "skyline.svg"), "w", encoding="utf-8") as fh:
        fh.write(svg)


# --------------------------------------------------------------------------
# favicons
# --------------------------------------------------------------------------
def write_icons() -> None:
    public = os.path.join(ROOT, "public")
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
        '<rect width="32" height="32" rx="6" fill="#0f3d3e"/>'
        '<path d="M16 5 19 13.5 16 27 13 13.5Z" fill="#fff"/>'
        '<path d="M5 16h22" stroke="#e8a33d" stroke-width="1.8"/>'
        '<ellipse cx="16" cy="16" rx="6.5" ry="11" fill="none" stroke="#fff" stroke-width="1.6"/>'
        "</svg>"
    )
    with open(os.path.join(public, "icon.svg"), "w", encoding="utf-8") as fh:
        fh.write(svg)

    # Raster marks for the browser tab and iOS home screen.
    size = 256
    img = Image.new("RGB", (size, size), TEAL)
    d = ImageDraw.Draw(img)
    s = size / 32
    d.polygon([(16 * s, 5 * s), (19 * s, 13.5 * s), (16 * s, 27 * s), (13 * s, 13.5 * s)], fill="white")
    d.line([(5 * s, 16 * s), (27 * s, 16 * s)], fill=AMBER, width=int(1.8 * s))
    d.ellipse(
        [16 * s - 6.5 * s, 16 * s - 11 * s, 16 * s + 6.5 * s, 16 * s + 11 * s],
        outline="white",
        width=int(1.6 * s),
    )
    img.resize((180, 180), Image.LANCZOS).save(os.path.join(public, "apple-icon.png"))
    img.resize((64, 64), Image.LANCZOS).save(
        os.path.join(public, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)]
    )


# --------------------------------------------------------------------------
# main
# --------------------------------------------------------------------------
def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    write_skyline()
    write_icons()
    print(f"skyline + favicons written ({OUT})")


if __name__ == "__main__":
    main()
