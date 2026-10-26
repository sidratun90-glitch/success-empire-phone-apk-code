import os
from PIL import Image

uploaded_dir = r"C:\Users\HP\.gemini\antigravity-ide\brain\1581b616-3d13-4d3e-b797-c2f4825cfa33\.user_uploaded"
files = [
    "media_1787146468895.png",
    "media_1787146468924.png",
    "media_1787146468998.png"
]

def make_transparent_and_crop(file_name):
    path = os.path.join(uploaded_dir, file_name)
    img = Image.open(path).convert("RGBA")
    width, height = img.size
    data = img.load()
    
    # Flood fill starting from corners for white background
    visited = set()
    to_visit = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    
    while to_visit:
        x, y = to_visit.pop()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        r, g, b, a = data[x, y]
        # White background threshold
        if (r > 240 and g > 240 and b > 240) or a == 0:
            data[x, y] = (0, 0, 0, 0)
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    if (nx, ny) not in visited:
                        to_visit.append((nx, ny))
                        
    # Crop to non-transparent bounding box
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    return img

def print_ascii_badge(img, file_name):
    width, height = img.size
    data = img.load()
    
    # Find white pixels in bottom-right badge region
    white_pixels = []
    for y in range(int(height * 0.7), int(height * 0.98)):
        for x in range(int(width * 0.7), int(width * 0.99)):
            r, g, b, a = data[x, y]
            if r > 220 and g > 220 and b > 220 and a > 200:
                white_pixels.append((x, y))
                
    if not white_pixels:
        print(f"No badge found for {file_name}")
        return
        
    xs = [p[0] for p in white_pixels]
    ys = [p[1] for p in white_pixels]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    
    print(f"\n--- ASCII Badge for {file_name} ---")
    badge_img = img.crop((min_x, min_y, max_x, max_y)).resize((20, 10)).convert("L")
    for y in range(badge_img.height):
        line = ""
        for x in range(badge_img.width):
            val = badge_img.getpixel((x, y))
            line += "#" if val > 150 else " "
        print(line)

for f in files:
    img = make_transparent_and_crop(f)
    print(f"File {f}: new dimensions = {img.size}")
    print_ascii_badge(img, f)
