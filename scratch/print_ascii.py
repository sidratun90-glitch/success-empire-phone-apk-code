import os
from PIL import Image

uploaded_dir = r"C:\Users\HP\.gemini\antigravity-ide\brain\1581b616-3d13-4d3e-b797-c2f4825cfa33\.user_uploaded"
files = [
    "media_1787146468895.png",
    "media_1787146468924.png"
]

def print_ascii_badge(file_name):
    path = os.path.join(uploaded_dir, file_name)
    img = Image.open(path).convert("RGBA")
    width, height = img.size
    data = img.load()
    
    # Locate badge
    white_pixels = []
    for y in range(int(height * 0.7), int(height * 0.95)):
        for x in range(int(width * 0.7), int(width * 0.98)):
            r, g, b, a = data[x, y]
            if r > 240 and g > 240 and b > 240 and a > 200:
                white_pixels.append((x, y))
                
    if not white_pixels:
        print(f"No badge found for {file_name}")
        return
        
    xs = [p[0] for p in white_pixels]
    ys = [p[1] for p in white_pixels]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    
    print(f"\n--- ASCII Badge for {file_name} ---")
    # Resize the badge region to 20x10 for readable ASCII art
    badge_img = img.crop((min_x, min_y, max_x, max_y)).resize((30, 12)).convert("L")
    for y in range(badge_img.height):
        line = ""
        for x in range(badge_img.width):
            val = badge_img.getpixel((x, y))
            line += "#" if val > 128 else " "
        print(line)

for f in files:
    print_ascii_badge(f)
