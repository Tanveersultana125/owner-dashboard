"""Generate iOS apple-touch-startup-image splash screens.

iOS PWAs need a separate splash PNG per device dimension (portrait + landscape
for tablets). Without these, the home-screen launch shows a blank white screen.

Run from owner-dashboard/ root:
    python scripts/generate-splash.py

Output: public/splash/ios-{width}x{height}.png

Each splash = navy background (#1e3a8a — matches theme_color) + centered
logo at ~28% of shorter side.
"""
from PIL import Image
import os
import sys

SRC = "public/edullent-icon.png"
OUT_DIR = "public/splash"
NAVY_BG = (30, 58, 138, 255)  # #1e3a8a

# Major iPhone + iPad sizes (portrait dimensions; iOS handles landscape via media queries).
# Source: Apple HIG + statcounter usage 2026.
DEVICES = [
    # (width, height, label)
    (640,  1136, "iPhone SE 1st gen"),
    (750,  1334, "iPhone SE 2nd / 6 / 7 / 8"),
    (828,  1792, "iPhone 11 / XR"),
    (1125, 2436, "iPhone X / XS / 11 Pro"),
    (1242, 2688, "iPhone XS Max / 11 Pro Max"),
    (1170, 2532, "iPhone 12 / 13 / 14"),
    (1284, 2778, "iPhone 12/13/14 Pro Max"),
    (1179, 2556, "iPhone 14/15/16 standard"),
    (1290, 2796, "iPhone 14/15/16 Pro Max"),
    (1536, 2048, "iPad 9.7\""),
    (1668, 2388, "iPad Pro 11\""),
    (2048, 2732, "iPad Pro 12.9\""),
]


def main():
    if not os.path.exists(SRC):
        print(f"ERROR: source missing: {SRC}", file=sys.stderr)
        sys.exit(1)

    img = Image.open(SRC).convert("RGBA")
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    square = img.crop((left, top, left + side, top + side))

    os.makedirs(OUT_DIR, exist_ok=True)

    for (sw, sh, label) in DEVICES:
        canvas = Image.new("RGBA", (sw, sh), NAVY_BG)
        # Logo at 28% of the SHORTER side keeps it visually balanced across
        # iPhone (tall narrow) and iPad (more square-ish).
        logo_size = int(min(sw, sh) * 0.28)
        logo = square.resize((logo_size, logo_size), Image.LANCZOS)
        x = (sw - logo_size) // 2
        y = (sh - logo_size) // 2
        canvas.paste(logo, (x, y), logo)
        out = os.path.join(OUT_DIR, f"ios-{sw}x{sh}.png")
        canvas.save(out, "PNG", optimize=True)
        print(f"  wrote {out} ({label})")

    print("DONE — add link tags to index.html (see scripts/splash-links.html for snippets)")


if __name__ == "__main__":
    main()
