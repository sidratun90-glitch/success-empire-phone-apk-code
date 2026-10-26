import os
from PIL import Image

uploaded_dir = r"C:\Users\HP\.gemini\antigravity-ide\brain\1581b616-3d13-4d3e-b797-c2f4825cfa33\.user_uploaded"
files = [
    "media_1787146468895.png",
    "media_1787146468924.png",
    "media_1787146468998.png"
]

for f in files:
    path = os.path.join(uploaded_dir, f)
    img = Image.open(path).convert("RGBA")
    width, height = img.size
    data = img.load()
    
    # Let's find bounding box of white text in the upper half (y < height * 0.6)
    white_pixels_upper = []
    for y in range(int(height * 0.05), int(height * 0.6)):
        for x in range(int(width * 0.05), int(width * 0.95)):
            r, g, b, a = data[x, y]
            # Check if it's white (the text is white)
            if r > 240 and g > 240 and b > 240 and a > 200:
                white_pixels_upper.append((x, y))
                
    if white_pixels_upper:
        xs = [p[0] for p in white_pixels_upper]
        ys = [p[1] for p in white_pixels_upper]
        min_x, max_x = min(xs), max(xs)
        min_y, max_y = min(ys), max(ys)
        text_height = max_y - min_y
        text_width = max_x - min_x
    else:
        text_height, text_width = 0, 0
        
    # Let's find white pixels in the bottom right badge region (x > width * 0.7, y > height * 0.7)
    white_pixels_badge = []
    for y in range(int(height * 0.7), int(height * 0.95)):
        for x in range(int(width * 0.7), int(width * 0.98)):
            r, g, b, a = data[x, y]
            if r > 240 and g > 240 and b > 240 and a > 200:
                white_pixels_badge.append((x, y))
                
    if white_pixels_badge:
        b_xs = [p[0] for p in white_pixels_badge]
        b_ys = [p[1] for p in white_pixels_badge]
        badge_w = max(b_xs) - min(b_xs)
        badge_h = max(b_ys) - min(b_ys)
    else:
        badge_w, badge_h = 0, 0

    print(f"File: {f}")
    print(f"  Upper Text BBox: width={text_width}, height={text_height}")
    print(f"  Badge BBox: width={badge_w}, height={badge_h}")
