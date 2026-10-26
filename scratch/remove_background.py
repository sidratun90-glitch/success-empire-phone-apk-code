import os
from PIL import Image

def remove_background(image_path, output_path, tolerance=35):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    data = img.load()
    width, height = img.size

    # Flood fill starting from corners
    visited = set()
    to_visit = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    
    # Get seed colors at corners
    seed_colors = [data[x, y] for x, y in to_visit]
    
    # We want to fill pixels that are close to black / dark gray
    # Let's check distance to seed colors or check if pixel is generally dark
    def is_background(r, g, b, seed_color):
        # Distance to seed color
        dist = ((r - seed_color[0]) ** 2 + (g - seed_color[1]) ** 2 + (b - seed_color[2]) ** 2) ** 0.5
        if dist < tolerance:
            return True
        # If it's very dark (almost black), it's background
        if r < 30 and g < 30 and b < 30:
            return True
        return False

    while to_visit:
        x, y = to_visit.pop()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        # Check current pixel
        current_color = data[x, y]
        r, g, b, a = current_color
        
        # Determine if it matches any seed color background condition
        matches = False
        for sc in seed_colors:
            if is_background(r, g, b, sc):
                matches = True
                break
                
        if matches:
            # Make transparent
            data[x, y] = (0, 0, 0, 0)
            
            # Add neighbors
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    if (nx, ny) not in visited:
                        to_visit.append((nx, ny))

    # Also crop bounding box of non-transparent content to trim margins if any
    # to avoid empty spacing issues
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    src = r"src/assets/standard.jpg"
    dest = r"src/assets/standard.png"
    if os.path.exists(src):
        remove_background(src, dest)
    else:
        print(f"Source file {src} not found!")
