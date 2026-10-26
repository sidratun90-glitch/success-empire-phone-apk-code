import os
from PIL import Image

uploaded_dir = r"C:\Users\HP\.gemini\antigravity-ide\brain\1581b616-3d13-4d3e-b797-c2f4825cfa33\.user_uploaded"

# Identified files mapping
file_mapping = {
    "premium_earning.png": "media_1787146468895.png",
    "supreme_earning.png": "media_1787146468924.png",
    "premium_plus_earning.png": "media_1787146468998.png"
}

def make_transparent_and_crop(src_filename, dest_path):
    path = os.path.join(uploaded_dir, src_filename)
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
        # White background threshold (r > 240, g > 240, b > 240)
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
        
    img.save(dest_path, "PNG")
    print(f"Saved {dest_path} with size {img.size}")

for dest_name, src_file in file_mapping.items():
    dest_path = os.path.join("src", "assets", dest_name)
    make_transparent_and_crop(src_file, dest_path)
