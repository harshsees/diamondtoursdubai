"""
Generates the cinematic, near-black imagery used across the site.

Everything here is procedural so the repository stays self-contained and no
image can ever 404. Each file is written to /public/media and is meant to be
swapped 1:1 for real photography later — keep the filenames and aspect ratios
and no component needs to change.

Run:  python tools/generate-media.py
"""

from __future__ import annotations

import math
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "media")
os.makedirs(OUT, exist_ok=True)

RNG = np.random.default_rng(20260902)


# --------------------------------------------------------------------------
# noise helpers
# --------------------------------------------------------------------------
def _grid(h: int, w: int, cells: int, rng: np.random.Generator) -> np.ndarray:
    """Smoothly interpolated random lattice, resized up to (h, w)."""
    gh = max(2, int(cells * h / max(h, w)))
    gw = max(2, int(cells * w / max(h, w)))
    lattice = rng.random((gh, gw)).astype(np.float32)
    img = Image.fromarray((lattice * 255).astype(np.uint8), "L").resize((w, h), Image.BICUBIC)
    return np.asarray(img, dtype=np.float32) / 255.0


def fbm(h: int, w: int, octaves: int = 6, cells: int = 3, gain: float = 0.5,
        turbulence: bool = False, rng: np.random.Generator | None = None) -> np.ndarray:
    """Fractal brownian motion in [0, 1]."""
    rng = rng or RNG
    out = np.zeros((h, w), dtype=np.float32)
    amp, total = 1.0, 0.0
    for o in range(octaves):
        layer = _grid(h, w, cells * (2 ** o), rng)
        if turbulence:
            layer = np.abs(layer * 2.0 - 1.0)
        out += layer * amp
        total += amp
        amp *= gain
    out /= total
    return np.clip(out, 0.0, 1.0)


def vgrad(h: int, w: int, top: float, bottom: float, power: float = 1.0) -> np.ndarray:
    t = np.linspace(0.0, 1.0, h, dtype=np.float32) ** power
    return (top + (bottom - top) * t)[:, None].repeat(w, axis=1)


def vignette(h: int, w: int, strength: float = 0.85, radius: float = 0.95) -> np.ndarray:
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    dx = (xx / w - 0.5) * 2.0
    dy = (yy / h - 0.5) * 2.0
    d = np.sqrt(dx * dx + dy * dy) / (radius * math.sqrt(2))
    return np.clip(1.0 - strength * np.clip(d, 0, 1) ** 2.2, 0.0, 1.0)


def grain(h: int, w: int, amount: float = 0.016, rng: np.random.Generator | None = None) -> np.ndarray:
    rng = rng or RNG
    n = rng.normal(0.0, 1.0, (h, w)).astype(np.float32)
    n = np.asarray(Image.fromarray(((n * 0.25 + 0.5) * 255).clip(0, 255).astype(np.uint8), "L")
                   .filter(ImageFilter.GaussianBlur(0.5)), dtype=np.float32) / 255.0
    return (n - 0.5) * 2.0 * amount


def save(arr: np.ndarray, name: str, quality: int = 88, tint: tuple[float, float, float] = (1.0, 1.0, 1.02)) -> None:
    """arr: float luminance in [0,1] -> slightly cool-toned JPEG."""
    a = np.clip(arr, 0.0, 1.0)
    rgb = np.stack([np.clip(a * tint[0], 0, 1), np.clip(a * tint[1], 0, 1), np.clip(a * tint[2], 0, 1)], axis=-1)
    img = Image.fromarray((rgb * 255).astype(np.uint8), "RGB")
    path = os.path.join(OUT, name)
    img.save(path, quality=quality, optimize=True, progressive=True)
    print(f"  {name:24s} {img.size[0]}x{img.size[1]}  {os.path.getsize(path) / 1024:6.0f} KB")


def soft(img: Image.Image, r: float) -> np.ndarray:
    return np.asarray(img.filter(ImageFilter.GaussianBlur(r)), dtype=np.float32) / 255.0


# --------------------------------------------------------------------------
# 1. hero — storm sky the container hangs in
# --------------------------------------------------------------------------
def hero_sky(w: int = 2560, h: int = 1440) -> None:
    """Overcast cumulus: big smooth masses, thresholded so they keep an edge,
    with a finer turbulent layer riding on top for texture."""
    rng = np.random.default_rng(11)

    mass = fbm(h, w, octaves=6, cells=3, gain=0.50, rng=rng)
    detail = fbm(h, w, octaves=7, cells=6, gain=0.52, turbulence=True, rng=rng)
    field = mass * 0.78 + detail * 0.22

    # threshold gives the masses a defined edge instead of a smooth haze
    density = np.clip((field - 0.315) * 3.1, 0, 1)
    density = soft(Image.fromarray((density * 255).astype(np.uint8)), w * 0.0018)

    # light comes from above and slightly left; tops catch it, bases go dark
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    key = np.exp(-(((xx / w - 0.32) ** 2) / 0.75 + ((yy / h - 0.10) ** 2) / 0.55))
    off = int(h * 0.045)
    shade = np.vstack([np.repeat(density[:1], off, axis=0), density[:-off]])  # self-shadowing
    tops = np.clip(density - shade * 0.80, 0, 1)

    sky = 0.075 + 0.105 * key
    lum = sky + density * 0.30 + tops * 0.72 * key
    lum *= vgrad(h, w, 1.08, 0.62, power=1.1)

    # the last fifth falls away so the hero melts into the next section
    v = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    lum *= np.clip(1.0 - (v - 0.78) / 0.22, 0, 1)
    lum *= vignette(h, w, strength=0.50, radius=1.35)
    lum += grain(h, w, 0.014, rng)
    save(np.clip(lum, 0, 1), "hero-sky.jpg", quality=88)


# --------------------------------------------------------------------------
# 2. positioning — faceted low-poly slabs
# --------------------------------------------------------------------------
def facets(w: int = 2400, h: int = 1500) -> None:
    rng = np.random.default_rng(23)
    img = Image.new("L", (w, h), 8)
    d = ImageDraw.Draw(img)

    cols, rows = 7, 5
    cw, ch = w / cols, h / rows
    pts = np.zeros((rows + 1, cols + 1, 2), dtype=np.float32)
    for r in range(rows + 1):
        for c in range(cols + 1):
            jx = rng.uniform(-0.45, 0.45) * cw
            jy = rng.uniform(-0.45, 0.45) * ch
            pts[r, c] = (c * cw + jx, r * ch + jy)

    light = fbm(rows + 1, cols + 1, octaves=3, cells=2, rng=rng)
    for r in range(rows):
        for c in range(cols):
            a, b = pts[r, c], pts[r, c + 1]
            e, f = pts[r + 1, c], pts[r + 1, c + 1]
            for tri, k in (((a, b, f), 0.0), ((a, f, e), 1.0)):
                v = light[r, c] * 0.55 + light[r + 1, c + 1] * 0.45
                shade = 5 + v * 26 + k * 7 + rng.uniform(-3, 3)
                d.polygon([tuple(p) for p in tri], fill=int(np.clip(shade, 3, 46)))

    lum = soft(img, 1.4)

    # one broad raking light across the plane
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    beam = np.exp(-(((xx * 0.55 + yy * 0.85) / w - 0.62) ** 2) / 0.012) * 0.10
    lum = np.clip(lum + beam, 0, 1)
    lum *= vignette(h, w, strength=0.6, radius=1.2)
    lum += grain(h, w, 0.010, rng)
    save(lum, "facets.jpg", quality=84)


# --------------------------------------------------------------------------
# 3. process — near-black panels with specular sweeps
# --------------------------------------------------------------------------
def _streaks(w: int, h: int, seeds, blur: float, rng) -> np.ndarray:
    img = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(img)
    for (x0, y0, x1, y1, cx, cy, width, bright) in seeds:
        pts = []
        for t in np.linspace(0, 1, 90):
            mt = 1 - t
            x = mt * mt * x0 + 2 * mt * t * cx + t * t * x1
            y = mt * mt * y0 + 2 * mt * t * cy + t * t * y1
            pts.append((x * w, y * h))
        d.line(pts, fill=int(bright * 255), width=int(width * w), joint="curve")
    return soft(img, blur * w) * 1.0


def process_bg(w: int = 2560, h: int = 1600) -> None:
    rng = np.random.default_rng(37)
    lum = vgrad(h, w, 0.040, 0.012, power=1.2)

    # tight specular edges — the look of light grazing a dark painted panel
    edges = _streaks(w, h, [
        (-0.05, 0.18, 1.05, 0.44, 0.45, -0.06, 0.0022, 1.0),
        (-0.05, 0.26, 1.05, 0.52, 0.45, 0.02, 0.0014, 0.7),
        (-0.05, 0.66, 1.05, 0.34, 0.50, 0.95, 0.0018, 0.8),
        (0.12, 1.08, 0.94, 0.06, 0.72, 0.56, 0.0012, 0.9),
        (-0.05, 0.90, 0.82, 1.08, 0.34, 0.82, 0.0016, 0.5),
    ], blur=0.0014, rng=rng)

    # the soft body falloff sitting under those edges
    body = _streaks(w, h, [
        (-0.05, 0.18, 1.05, 0.44, 0.45, -0.06, 0.030, 0.5),
        (-0.05, 0.66, 1.05, 0.34, 0.50, 0.95, 0.022, 0.4),
        (0.12, 1.08, 0.94, 0.06, 0.72, 0.56, 0.016, 0.6),
    ], blur=0.016, rng=rng)

    lum = np.clip(lum + edges * 0.30 + body * 0.085, 0, 1)
    lum = np.clip(lum + fbm(h, w, octaves=5, cells=2, gain=0.55, rng=rng) * 0.030, 0, 1)
    lum *= vignette(h, w, strength=0.95, radius=0.98)
    lum += grain(h, w, 0.012, rng)
    save(np.clip(lum, 0, 1), "process-bg.jpg", quality=84)


# --------------------------------------------------------------------------
# 4. reviews — thin light filaments on black
# --------------------------------------------------------------------------
def reviews_bg(w: int = 2560, h: int = 1500) -> None:
    rng = np.random.default_rng(53)
    lum = np.full((h, w), 0.022, dtype=np.float32)

    fine = _streaks(w, h, [
        (-0.05, 0.55, 1.05, 0.18, 0.50, 0.02, 0.0016, 1.0),
        (-0.05, 0.68, 1.05, 0.30, 0.45, 0.10, 0.0012, 0.9),
        (-0.05, 0.30, 0.70, 1.05, 0.20, 0.62, 0.0014, 0.8),
        (0.05, 1.05, 1.05, 0.48, 0.62, 0.72, 0.0010, 0.7),
        (-0.05, 0.12, 1.05, 0.62, 0.55, 0.34, 0.0022, 0.5),
    ], blur=0.0016, rng=rng)
    glow = _streaks(w, h, [
        (-0.05, 0.55, 1.05, 0.18, 0.50, 0.02, 0.006, 0.6),
        (-0.05, 0.30, 0.70, 1.05, 0.20, 0.62, 0.006, 0.5),
    ], blur=0.012, rng=rng)

    lum = np.clip(lum + fine * 0.55 + glow * 0.10, 0, 1)
    lum *= vignette(h, w, strength=0.85, radius=1.05)
    lum += grain(h, w, 0.010, rng)
    save(lum, "reviews-bg.jpg", quality=84)


# --------------------------------------------------------------------------
# 5. contact — dim machined grille
# --------------------------------------------------------------------------
def contact_bg(w: int = 2560, h: int = 1500) -> None:
    rng = np.random.default_rng(67)
    img = Image.new("L", (w, h), 6)
    d = ImageDraw.Draw(img)

    # horizontal slats, slightly converging
    for i in range(16):
        t = i / 15
        y = h * (0.14 + t * 0.74)
        inset = w * (0.02 + 0.10 * abs(t - 0.5))
        d.line([(inset, y), (w - inset, y)], fill=int(26 + 22 * math.sin(t * math.pi)), width=int(h * 0.006))

    # emblem
    cx, cy, r = w * 0.24, h * 0.52, h * 0.20
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=44, width=int(h * 0.010))
    for a in (90, 210, 330):
        rad = math.radians(a)
        d.line([(cx, cy), (cx + r * math.cos(rad), cy - r * math.sin(rad))], fill=40, width=int(h * 0.009))

    lum = soft(img, w * 0.0022)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    key = np.exp(-(((xx / w - 0.66) ** 2) / 0.09 + ((yy / h - 0.42) ** 2) / 0.14)) * 0.11
    lum = np.clip(lum * 0.55 + key, 0, 1)
    lum *= vignette(h, w, strength=0.90, radius=1.05)
    lum += grain(h, w, 0.011, rng)
    save(lum, "contact-bg.jpg", quality=84)


# --------------------------------------------------------------------------
# 6. closing CTA — corrugated container wall in perspective
# --------------------------------------------------------------------------
def cta_wall(w: int = 2560, h: int = 1280) -> None:
    rng = np.random.default_rng(89)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    u, v = xx / w, yy / h

    # rib frequency rises to the right so the box recedes
    freq = 30.0 + 44.0 * u ** 1.8
    phase = np.cumsum(freq / w, axis=1) * 2 * math.pi
    ribs = (np.sin(phase) * 0.5 + 0.5)
    ribs = ribs ** 1.25

    depth = 1.0 - 0.42 * u ** 1.3
    steel = (0.052 + ribs * 0.105) * depth

    # the container occupies a slightly rising band
    top = 0.30 + 0.045 * u
    bot = 1.02 + 0.02 * u
    wall = np.clip((v - top) * 40, 0, 1) * np.clip((bot - v) * 40, 0, 1)

    sky = np.clip((top - v) * 2.6, 0, 1) * vgrad(h, w, 0.0, 0.13, power=0.6)
    lum = steel * wall + sky * (1 - wall)

    # top rail, bottom rail and the door hardware on the far right
    rail = np.clip(1.0 - np.abs(v - top) * 120, 0, 1) * 0.17 * depth
    lum = np.clip(lum + rail, 0, 1)
    door = np.clip((u - 0.80) * 12, 0, 1)
    bars = ((np.abs(np.sin((u - 0.80) * math.pi * 34)) > 0.86) & (v > top + 0.03) & (v < 0.94))
    lum = np.clip(lum + bars * door * 0.075, 0, 1)

    # chevron stencilled onto the steel
    mark = Image.new("L", (w, h), 0)
    dm = ImageDraw.Draw(mark)
    mx, my, ms = w * 0.26, h * 0.66, h * 0.26
    dm.polygon([(mx - ms * 0.95, my + ms * 0.8), (mx - ms * 0.15, my - ms * 0.8), (mx + ms * 0.65, my + ms * 0.8)], fill=255)
    dm.polygon([(mx - ms * 0.30, my + ms * 0.8), (mx - ms * 0.15, my - ms * 0.18), (mx + ms * 0.02, my + ms * 0.8)], fill=0)
    lum = np.clip(lum + soft(mark, w * 0.0012) * wall * depth * 0.070, 0, 1)

    lum *= vignette(h, w, strength=0.45, radius=1.5)
    lum += grain(h, w, 0.012, rng)
    save(np.clip(lum * 1.28, 0, 1), "cta-wall.jpg", quality=86)


# --------------------------------------------------------------------------
# 7. field tiles — six moody frames for the social grid
# --------------------------------------------------------------------------
def _dof(lum, w, h, focus=0.62, amount=2.6):
    """Blend a blurred copy in by distance from the focal band -> depth of field."""
    img = Image.fromarray((np.clip(lum, 0, 1) * 255).astype(np.uint8))
    blurred = soft(img, w * 0.010)
    v = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    k = np.clip(np.abs(v - focus) * amount, 0, 1) ** 1.4
    return lum * (1 - k) + blurred * k


def _film(lum, w, h, rng, name, vig=0.78, lift=0.012, focus=0.62):
    """Shared grade: haze, depth of field, lifted blacks, vignette, grain."""
    lum = np.clip(lum + fbm(h, w, octaves=5, cells=2, gain=0.6, rng=rng) * 0.05, 0, 1)
    if focus is not None:
        lum = _dof(lum, w, h, focus)
    lum = lift + lum * (1.0 - lift)
    lum *= vignette(h, w, strength=vig, radius=1.08)
    lum += grain(h, w, 0.017, rng)
    save(np.clip(lum, 0, 1), name, quality=82)


def tiles(w=1100, h=1320):
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    u, v = xx / w, yy / h

    # 1 - container stack receding into fog
    rng = np.random.default_rng(101)
    img = Image.new("L", (w, h), 4)
    d = ImageDraw.Draw(img)
    for row in range(9):
        t = row / 8.0
        y = h * (0.86 - t * 0.56)
        bh = h * (0.085 - t * 0.030)
        near = 1.0 - t
        bw = w * (0.24 - t * 0.10)
        for col in range(10):
            if rng.random() < 0.14:
                continue
            x = w * -0.10 + col * bw * 1.02 + t * w * 0.10
            tone = 10 + rng.random() * 44 * near
            d.rectangle([x, y - bh, x + bw, y], fill=int(np.clip(tone, 4, 58)))
            d.line([(x, y - bh), (x, y)], fill=int(np.clip(tone * 1.7, 4, 78)), width=2)
    lum = soft(img, 1.1)
    fog = np.clip((0.62 - v) * 1.7, 0, 1) ** 1.2
    lum = lum * (1 - fog * 0.85) + fog * 0.14
    lum = np.clip(lum + np.exp(-(((u - 0.78) ** 2) / 0.14 + ((v - 0.22) ** 2) / 0.10)) * 0.13, 0, 1)
    _film(lum, w, h, rng, "field-01.jpg", vig=0.7, focus=0.72)

    # 2 - gantry cranes against a dusk sky
    rng = np.random.default_rng(202)
    sky = vgrad(h, w, 0.045, 0.30, power=2.1)
    sky = np.clip(sky + np.exp(-((v - 0.72) ** 2) / 0.010) * 0.16, 0, 1)
    img = Image.fromarray((sky * 255).astype(np.uint8))
    d = ImageDraw.Draw(img)
    for lx, sc in ((0.10, 1.0), (0.44, 0.86), (0.76, 0.72)):
        base = h * 0.80
        top = base - h * 0.34 * sc
        lw = max(2, int(w * 0.020 * sc))
        for off in (-0.075, 0.075):
            d.line([(w * (lx + off * sc), top), (w * (lx + off * sc * 1.5), base)], fill=3, width=lw)
        d.line([(w * (lx - 0.20 * sc), top), (w * (lx + 0.26 * sc), top - h * 0.02 * sc)], fill=3, width=int(lw * 1.5))
        d.line([(w * (lx + 0.02 * sc), top - h * 0.10 * sc), (w * (lx + 0.24 * sc), top - h * 0.018 * sc)], fill=4, width=max(1, lw // 2))
        d.line([(w * (lx + 0.02 * sc), top - h * 0.10 * sc), (w * (lx - 0.18 * sc), top - h * 0.004 * sc)], fill=4, width=max(1, lw // 2))
        d.line([(w * (lx + 0.02 * sc), top), (w * (lx + 0.02 * sc), top - h * 0.10 * sc)], fill=3, width=lw)
    d.rectangle([0, h * 0.80, w, h], fill=5)
    lum = soft(img, 0.9)
    _film(lum, w, h, rng, "field-02.jpg", vig=0.62, focus=0.66)

    # 3 - freight road at night
    rng = np.random.default_rng(303)
    horizon = 0.44
    lum = np.where(v < horizon, vgrad(h, w, 0.02, 0.10, power=1.0), 0.030).astype(np.float32)
    ahead = np.clip((v - horizon) / (1 - horizon), 0, 1)
    lum = np.where(v >= horizon, 0.028 + ahead * 0.055, lum)
    halfw = 0.020 + ahead * 0.60
    lum = np.where((v >= horizon) & (np.abs(u - 0.5) < halfw), lum + 0.020, lum)
    dash = (((v - horizon) ** 0.45 * 26) % 2.0 < 0.95) & (np.abs(u - 0.5) < 0.004 + ahead * 0.020)
    lum = np.clip(lum + dash * ahead * 0.55, 0, 1)
    rail = np.abs(np.abs(u - 0.5) - halfw * 1.06) < 0.004 + ahead * 0.012
    lum = np.clip(lum + rail * (v >= horizon) * ahead * 0.10, 0, 1)
    for hx in (0.40, 0.47):
        lum = np.clip(lum + np.exp(-(((u - hx) ** 2) / 0.00030 + ((v - horizon - 0.035) ** 2) / 0.00022)) * 0.95, 0, 1)
    lum = np.clip(lum + np.exp(-(((u - 0.435) ** 2) / 0.020 + ((v - horizon - 0.03) ** 2) / 0.012)) * 0.30, 0, 1)
    lum = np.clip(lum + np.exp(-((v - horizon) ** 2) / 0.004) * 0.10, 0, 1)
    _film(lum, w, h, rng, "field-03.jpg", vig=0.68, focus=0.50)

    # 4 - machinery detail, raking rim light
    rng = np.random.default_rng(404)
    img = Image.new("L", (w, h), 5)
    d = ImageDraw.Draw(img)
    for cx, cy, r, tone in ((0.30, 0.34, 0.36, 30), (0.74, 0.58, 0.30, 22), (0.20, 0.86, 0.26, 16)):
        rr = r * w
        box = [w * cx - rr, h * cy - rr, w * cx + rr, h * cy + rr]
        inner = [w * cx - rr * 0.42, h * cy - rr * 0.42, w * cx + rr * 0.42, h * cy + rr * 0.42]
        d.ellipse(box, fill=int(tone * 0.35))
        d.arc(box, start=185, end=340, fill=int(min(255, tone * 3.4)), width=int(w * 0.020))
        d.ellipse(inner, fill=int(tone * 0.6))
        d.arc(inner, start=190, end=330, fill=int(min(255, tone * 2.6)), width=int(w * 0.010))
    for i in range(5):
        x0 = w * (0.05 + i * 0.22)
        d.line([(x0, h * 1.05), (x0 + w * 0.16, -h * 0.05)], fill=9, width=int(w * 0.055))
        d.line([(x0 + w * 0.026, h * 1.05), (x0 + w * 0.186, -h * 0.05)], fill=26, width=int(w * 0.006))
    lum = soft(img, w * 0.0022)
    lum = np.clip(lum + np.exp(-(((u - 0.18) ** 2) / 0.10 + ((v - 0.26) ** 2) / 0.08)) * 0.10, 0, 1)
    _film(lum, w, h, rng, "field-04.jpg", vig=0.82, focus=0.40)

    # 5 - port at night, lights on the water
    rng = np.random.default_rng(505)
    hp = int(h * 0.56)
    sky = vgrad(h, w, 0.020, 0.16, power=2.4)
    img = Image.fromarray((np.clip(sky, 0, 1) * 255).astype(np.uint8))
    d = ImageDraw.Draw(img)
    x = -w * 0.06
    while x < w * 1.06:
        bw = w * rng.uniform(0.05, 0.16)
        bh = h * rng.uniform(0.03, 0.15)
        d.rectangle([x, hp - bh, x + bw, hp], fill=int(rng.uniform(3, 9)))
        if rng.random() < 0.55:
            mx = x + bw * rng.uniform(0.2, 0.8)
            d.line([(mx, hp - bh), (mx, hp - bh - h * rng.uniform(0.04, 0.11))], fill=6, width=int(w * 0.007))
        for _ in range(int(bw / w * 14)):
            lx = x + rng.uniform(0.05, 0.95) * bw
            ly = hp - rng.uniform(0.1, 0.95) * bh
            d.ellipse([lx - 2, ly - 2, lx + 2, ly + 2], fill=210)
        x += bw + w * 0.010
    a = np.asarray(img, dtype=np.float32) / 255.0
    band = a[max(0, hp - int(h * 0.40)):hp][::-1]
    a[hp:hp + band.shape[0]] = band * 0.30
    ripple = (np.sin(yy * 0.55) * 0.5 + 0.5) * (np.sin(xx * 0.06 + yy * 0.2) * 0.5 + 0.5)
    a[hp:] = np.clip(a[hp:] * (0.55 + ripple[hp:] * 0.9), 0, 1)
    a = np.clip(a + np.exp(-((v - hp / h) ** 2) / 0.0009) * 0.10, 0, 1)
    _film(a, w, h, rng, "field-05.jpg", vig=0.66, focus=0.56)

    # 6 - corrugated steel, raking light
    rng = np.random.default_rng(606)
    ribs = (np.sin(u * math.pi * 2 * 9 + 0.4) * 0.5 + 0.5) ** 1.35
    lum = 0.040 + ribs * 0.135
    lum *= vgrad(h, w, 1.30, 0.42, power=1.1)
    lum = np.clip(lum + np.clip(1 - np.abs(v - 0.70) * 70, 0, 1) * 0.10, 0, 1)
    lum = np.clip(lum + np.clip(1 - np.abs(v - 0.16) * 55, 0, 1) * 0.06, 0, 1)
    lum = np.clip(lum + np.exp(-(((u - 0.30) ** 2) / 0.20 + ((v - 0.30) ** 2) / 0.18)) * 0.07, 0, 1)
    _film(lum, w, h, rng, "field-06.jpg", vig=0.74, focus=0.45)


# --------------------------------------------------------------------------
# 8. social card
# --------------------------------------------------------------------------
def _brand_font(size: int):
    """Best available sans on this machine; None falls back to a mark-only card."""
    from PIL import ImageFont
    for path in (
        r"C:\Windows\Fonts\segoeuisl.ttf",
        r"C:\Windows\Fonts\segoeui.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ):
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return None


def og(w: int = 1200, h: int = 630) -> None:
    rng = np.random.default_rng(777)
    mass = fbm(h, w, octaves=6, cells=3, gain=0.50, rng=rng)
    detail = fbm(h, w, octaves=6, cells=6, gain=0.52, turbulence=True, rng=rng)
    density = np.clip((mass * 0.78 + detail * 0.22 - 0.34) * 3.0, 0, 1)

    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    key = np.exp(-(((xx / w - 0.72) ** 2) / 0.55 + ((yy / h - 0.16) ** 2) / 0.5))
    lum = 0.06 + 0.08 * key + density * 0.20 + np.clip(density - np.vstack(
        [np.repeat(density[:1], 22, axis=0), density[:-22]]) * 0.8, 0, 1) * 0.55 * key
    lum *= vgrad(h, w, 1.05, 0.55, power=1.1)
    lum *= vignette(h, w, strength=0.7, radius=1.15)
    lum += grain(h, w, 0.010, rng)

    a = np.clip(lum, 0, 1)
    card = Image.fromarray((np.stack([a, a, np.clip(a * 1.02, 0, 1)], -1) * 255).astype(np.uint8))
    d = ImageDraw.Draw(card)

    # scrim so the wordmark always holds against the sky
    scrim = Image.new("L", (w, h), 0)
    ImageDraw.Draw(scrim).rectangle([0, int(h * 0.42), w, h], fill=210)
    scrim = scrim.filter(ImageFilter.GaussianBlur(w * 0.09))
    card = Image.composite(Image.new("RGB", (w, h), (4, 4, 4)), card, scrim)
    d = ImageDraw.Draw(card)

    # chevron mark
    mx, my, ms = 84, h - 150, 30
    d.polygon([(mx, my + ms), (mx + ms, my - ms), (mx + 2 * ms, my + ms)], fill=(79, 209, 165))
    d.polygon([(mx + ms * 0.62, my + ms), (mx + ms, my + ms * 0.05), (mx + ms * 1.38, my + ms)],
              fill=(4, 4, 4))

    title = _brand_font(58)
    small = _brand_font(26)
    if title and small:
        d.text((84 + 2 * ms + 26, my - 34), "MERIDIAN", font=title, fill=(242, 242, 240))
        d.text((84, h - 88), "cross-border trade, handled end to end",
               font=small, fill=(150, 150, 148))

    path = os.path.join(OUT, "og.jpg")
    card.save(path, quality=90, optimize=True, progressive=True)
    print(f"  {'og.jpg':24s} {w}x{h}  {os.path.getsize(path) / 1024:6.0f} KB")


if __name__ == "__main__":
    print("generating media ->", OUT)
    hero_sky()
    facets()
    process_bg()
    reviews_bg()
    contact_bg()
    cta_wall()
    tiles()
    og()
    print("done")
