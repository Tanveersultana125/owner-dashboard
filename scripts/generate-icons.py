"""Regenerate PWA icons from a single source image.

Run from owner-dashboard/ root:
    python scripts/generate-icons.py

Output: public/icons/icon-{size}x{size}.png for all needed sizes
        public/icons/icon-{192|512}-maskable.png (10% safe zone, navy bg)
        public/icons/apple-touch-icon.png (180x180)
"""
from PIL import Image
import os
import sys

SRC = "public/edullent-icon.png"
OUT_DIR = "public/icons"
SIZES = [72, 96, 128, 144, 152, 192, 384, 512]
MASKABLE_SIZES = [192, 512]
NAVY_BG = (30, 58, 138, 255)  # #1e3a8a — matches manifest theme_color


def main():
    if not os.path.exists(SRC):
        print(f"ERROR: source missing: {SRC}", file=sys.stderr)
        sys.exit(1)

    img = Image.open(SRC).convert("RGBA")
    w, h = img.size
    print(f"source: {SRC} ({w}x{h})")

    # Center-crop to square so PWA icons render correctly on Android home screens.
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    square = img.crop((left, top, left + side, top + side))
    print(f"cropped to square: {side}x{side}")

    os.makedirs(OUT_DIR, exist_ok=True)

    # Regular sizes (purpose: any).
    for size in SIZES:
        resized = square.resize((size, size), Image.LANCZOS)
        out = os.path.join(OUT_DIR, f"icon-{size}x{size}.png")
        resized.save(out, "PNG", optimize=True)
        print(f"  wrote {out}")

    # Apple touch icon (180x180 = iOS preferred).
    apple = square.resize((180, 180), Image.LANCZOS)
    apple.save(os.path.join(OUT_DIR, "apple-touch-icon.png"), "PNG", optimize=True)
    print(f"  wrote {OUT_DIR}/apple-touch-icon.png")

    # Maskable raster icons — Android adaptive icon spec.
    # Safe-zone rule: critical content must fit inside the central 80% circle.
    # We achieve this by placing the source at 80% on a navy canvas.
    for size in MASKABLE_SIZES:
        canvas = Image.new("RGBA", (size, size), NAVY_BG)
        logo_size = int(size * 0.8)
        logo = square.resize((logo_size, logo_size), Image.LANCZOS)
        pad = (size - logo_size) // 2
        canvas.paste(logo, (pad, pad), logo)
        out = os.path.join(OUT_DIR, f"icon-{size}-maskable.png")
        canvas.save(out, "PNG", optimize=True)
        print(f"  wrote {out} (maskable, 10% safe zone)")

    print("DONE")


if __name__ == "__main__":
    main()
