import os
from PIL import Image

uploaded_dir = r"C:\Users\HP\.gemini\antigravity-ide\brain\1581b616-3d13-4d3e-b797-c2f4825cfa33\.user_uploaded"
files = [
    "media_1787146468895.png",
    "media_1787146468924.png",
    "media_1787146468998.png"
]

def clean_and_save(file_name):
    path = os.path.join(uploaded_dir, file_name)
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return None
        
    img = Image.open(path).convert("RGBA")
    width, height = img.size
    data = img.load()
    
    # Let's check if the corners are white or black and do flood fill
    # Corner at (0,0)
    corner_color = data[0, 0]
    r, g, b, a = corner_color
    
    # We check if it is white background or black background
    is_white = r > 200 and g > 200 and b > 200
    is_black = r < 50 and g < 50 and b < 50
    
    if is_white or is_black:
        visited = set()
        to_visit = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
        seed_colors = [data[x, y] for x, y in to_visit]
        
        def is_bg(curr_r, curr_g, curr_b):
            # If we want to fill white background
            if is_white:
                return curr_r > 240 and curr_g > 240 and curr_b > 240
            # If we want to fill black background
            if is_black:
                return curr_r < 30 and curr_g < 30 and curr_b < 30
            return False

        while to_visit:
            x, y = to_visit.pop()
            if (x, y) in visited:
                continue
            visited.add((x, y))
            
            curr_r, curr_g, curr_b, curr_a = data[x, y]
            if is_bg(curr_r, curr_g, curr_b) or curr_a == 0:
                data[x, y] = (0, 0, 0, 0)
                for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < width and 0 <= ny < height:
                        if (nx, ny) not in visited:
                            to_visit.append((nx, ny))

    # Trim empty borders
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    return img

# Let's inspect each image to find which is which
for f in files:
    img = clean_and_save(f)
    if img:
        # Let's inspect some vertical columns to detect text or features
        # Or let's print color histograms to identify the text/label
        # Or we can just save them to temp files and run a quick heuristic
        # Let's save them as temp_0, temp_1, temp_2 first
        temp_path = f"src/assets/temp_{f}"
        img.save(temp_path)
        print(f"Processed {f}: size={img.size}")
