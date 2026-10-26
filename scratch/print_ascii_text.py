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
    
    visited = set()
    to_visit = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    while to_visit:
        x, y = to_visit.pop()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        r, g, b, a = data[x, y]
        if (r > 240 and g > 240 and b > 240) or a == 0:
            data[x, y] = (0, 0, 0, 0)
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    if (nx, ny) not in visited:
                        to_visit.append((nx, ny))
                        
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    return img

def print_ascii_text(img, file_name):
    width, height = img.size
    # Crop the top-middle text region
    # The text is roughly in y range [height*0.05, height*0.35], x range [width*0.1, width*0.9]
    text_area = img.crop((int(width * 0.1), int(height * 0.05), int(width * 0.9), int(height * 0.35)))
    
    # Resize to 50x15 to make it readable ASCII
    resized = text_area.resize((60, 15)).convert("L")
    print(f"\n--- Text region of {file_name} ---")
    for y in range(resized.height):
        line = ""
        for x in range(resized.width):
            val = resized.getpixel((x, y))
            # Text is white, background of binder is dark gray/black
            line += "#" if val > 200 else " "
        print(line)

for f in files:
    img = make_transparent_and_crop(f)
    print_ascii_text(img, f)
