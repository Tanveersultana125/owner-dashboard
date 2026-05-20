"""Generate placeholder PWA screenshots for richer install prompt + Play Store.

These are PROMOTIONAL placeholders — replace with real dashboard screenshots
before Play Store submission. To capture real ones:
    1. Run `npm run dev` and open the app on the matching viewport.
    2. Use DevTools Device Mode → screenshot.
    3. Save as public/screenshots/{name}.png at the listed dimensions.

Manifest entries are still useful even as placeholders — they make the
install prompt render as a rich card with more user trust signals.
"""
from PIL import Image, ImageDraw, ImageFont
import os
import sys

SRC_LOGO = "public/edullent-icon.png"
OUT_DIR = "public/screenshots"

# Manifest screenshot spec:
#   - "wide" form_factor → landscape, 1280x800 or larger
#   - "narrow" form_factor → portrait, 1080x1920 or 750x1334
SHOTS = [
    # (filename, width, height, form_factor, label)
    ("desktop-dashboard.png", 1280, 800,  "wide",   "Owner Dashboard — Multi-branch overview"),
    ("desktop-finance.png",   1280, 800,  "wide",   "Finance — Fee + revenue across branches"),
    ("mobile-dashboard.png",  750,  1334, "narrow", "Mobile dashboard"),
    ("mobile-students.png",   750,  1334, "narrow", "Student intelligence"),
]

NAVY_DARK = (0, 16, 64)
NAVY_MID  = (30, 58, 138)
NAVY_HI   = (0, 68, 204)
WHITE     = (255, 255, 255)
WHITE_DIM = (191, 219, 254)


def gradient_bg(w: int, h: int) -> Image.Image:
    img = Image.new("RGB", (w, h), NAVY_DARK)
    draw = ImageDraw.Draw(img)
    for y in range(h):
        t = y / h
        r = int(NAVY_DARK[0] + (NAVY_HI[0] - NAVY_DARK[0]) * t)
        g = int(NAVY_DARK[1] + (NAVY_HI[1] - NAVY_DARK[1]) * t)
        b = int(NAVY_DARK[2] + (NAVY_HI[2] - NAVY_DARK[2]) * t)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
    return img


def load_font(size: int):
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


def build_shot(filename: str, w: int, h: int, label: str):
    bg = gradient_bg(w, h).convert("RGBA")

    # Logo top-left
    logo_src = Image.open(SRC_LOGO).convert("RGBA")
    sw, sh = logo_src.size
    side = min(sw, sh)
    sq = logo_src.crop(((sw - side) // 2, (sh - side) // 2,
                        (sw - side) // 2 + side, (sh - side) // 2 + side))
    is_narrow = h > w
    logo_size = 80 if is_narrow else 96
    logo = sq.resize((logo_size, logo_size), Image.LANCZOS)
    margin = 40 if is_narrow else 56
    bg.paste(logo, (margin, margin), logo)

    draw = ImageDraw.Draw(bg)

    # Wordmark next to logo
    wordmark_font = load_font(40 if is_narrow else 56)
    draw.text((margin + logo_size + 18, margin + (logo_size - (40 if is_narrow else 56)) // 2 + 4),
              "Edullent", font=wordmark_font, fill=WHITE)

    # Center label
    label_font = load_font(32 if is_narrow else 44)
    if is_narrow:
        # Wrap narrow label
        words = label.split()
        lines = []
        cur = ""
        for word in words:
            test = (cur + " " + word).strip()
            test_w = draw.textbbox((0, 0), test, font=label_font)[2]
            if test_w > w - 100:
                lines.append(cur)
                cur = word
            else:
                cur = test
        if cur:
            lines.append(cur)
        line_h = 48
        total_h = line_h * len(lines)
        start_y = (h - total_h) // 2
        for i, line in enumerate(lines):
            bbox = draw.textbbox((0, 0), line, font=label_font)
            x = (w - bbox[2]) // 2
            draw.text((x, start_y + i * line_h), line, font=label_font, fill=WHITE)
    else:
        bbox = draw.textbbox((0, 0), label, font=label_font)
        x = (w - bbox[2]) // 2
        y = (h - bbox[3]) // 2
        draw.text((x, y), label, font=label_font, fill=WHITE)

    # "Preview" tag bottom-right
    tag_font = load_font(18)
    tag_text = "Placeholder — replace before publishing"
    bbox = draw.textbbox((0, 0), tag_text, font=tag_font)
    tag_w, tag_h = bbox[2], bbox[3]
    draw.rectangle(
        [(w - tag_w - margin - 24, h - tag_h - margin - 18),
         (w - margin + 4, h - margin + 4)],
        fill=(255, 255, 255, 30),
    )
    draw.text((w - tag_w - margin - 12, h - tag_h - margin - 6),
              tag_text, font=tag_font, fill=WHITE_DIM)

    os.makedirs(OUT_DIR, exist_ok=True)
    out = os.path.join(OUT_DIR, filename)
    bg.convert("RGB").save(out, "PNG", optimize=True)
    print(f"  wrote {out} ({w}x{h})")


def main():
    if not os.path.exists(SRC_LOGO):
        print(f"ERROR: source missing: {SRC_LOGO}", file=sys.stderr)
        sys.exit(1)
    for (filename, w, h, _, label) in SHOTS:
        build_shot(filename, w, h, label)
    print("DONE")


if __name__ == "__main__":
    main()
