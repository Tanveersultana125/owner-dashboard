"""Generate a 1200x630 Open Graph image for link-preview cards.

Output: public/og-image.png

Layout: navy gradient background + centered logo + 'Edullent — Owner Dashboard' text + tagline.
"""
from PIL import Image, ImageDraw, ImageFont
import os
import sys

SRC = "public/edullent-icon.png"
OUT = "public/og-image.png"
W, H = 1200, 630

# Brand colors
NAVY_DARK = (0, 16, 64)       # #001040
NAVY_MID  = (30, 58, 138)     # #1e3a8a
NAVY_HI   = (0, 68, 204)      # #0044CC
WHITE     = (255, 255, 255)
WHITE_DIM = (191, 219, 254)   # #bfdbfe


def gradient_bg():
    """Horizontal gradient #001040 → #0044CC (matches dashboard hero)."""
    img = Image.new("RGB", (W, H), NAVY_DARK)
    draw = ImageDraw.Draw(img)
    for x in range(W):
        t = x / W
        r = int(NAVY_DARK[0] + (NAVY_HI[0] - NAVY_DARK[0]) * t)
        g = int(NAVY_DARK[1] + (NAVY_HI[1] - NAVY_DARK[1]) * t)
        b = int(NAVY_DARK[2] + (NAVY_HI[2] - NAVY_DARK[2]) * t)
        draw.line([(x, 0), (x, H)], fill=(r, g, b))
    return img


def load_font(size: int):
    """Try common system fonts; fall back to PIL default."""
    candidates = [
        "C:\\Windows\\Fonts\\segoeuib.ttf",
        "C:\\Windows\\Fonts\\arialbd.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVu-Sans-Bold.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def main():
    if not os.path.exists(SRC):
        print(f"ERROR: source missing: {SRC}", file=sys.stderr)
        sys.exit(1)

    bg = gradient_bg().convert("RGBA")

    # Subtle radial glow top-right (matches Dashboard hero shadow)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    for r in range(280, 0, -5):
        alpha = int(40 * (1 - r / 280))
        gdraw.ellipse([(W - 300 - r // 2, -150 - r // 2),
                       (W - 100 + r // 2,  150 + r // 2)],
                      fill=(255, 255, 255, alpha))
    bg = Image.alpha_composite(bg, glow)

    # Logo: 220x220 in left area
    logo_src = Image.open(SRC).convert("RGBA")
    sw, sh = logo_src.size
    side = min(sw, sh)
    logo_sq = logo_src.crop(((sw - side) // 2, (sh - side) // 2,
                             (sw - side) // 2 + side, (sh - side) // 2 + side))
    LOGO_SIZE = 200
    logo = logo_sq.resize((LOGO_SIZE, LOGO_SIZE), Image.LANCZOS)
    bg.paste(logo, (90, (H - LOGO_SIZE) // 2), logo)

    draw = ImageDraw.Draw(bg)
    title_font = load_font(64)
    sub_font   = load_font(28)
    tag_font   = load_font(22)

    # Title
    draw.text((340, 200), "Edullent", font=title_font, fill=WHITE)
    draw.text((340, 280), "Owner Dashboard", font=sub_font, fill=WHITE_DIM)
    # Tagline
    draw.text(
        (340, 380),
        "Multi-branch school analytics, finance, and operations.",
        font=tag_font,
        fill=(220, 230, 252, 255),
    )

    bg.convert("RGB").save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} ({W}x{H})")


if __name__ == "__main__":
    main()
