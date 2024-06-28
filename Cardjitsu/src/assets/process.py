from PIL import Image
import numpy as np

# Load the original image
input_image_path = './src/assets/sprite_penguin.png'
output_image_path_template = './src/assets/sprite_penguin_{}.png'

original_image = Image.open(input_image_path).convert('RGBA')

# Function to change color
def change_color(image, color_mapping):
    data = np.array(image)
    red, green, blue, alpha = data.T

    # Replace specific colors
    for (r1, g1, b1), (r2, g2, b2) in color_mapping.items():
        areas = (red == r1) & (green == g1) & (blue == b1)
        data[..., :-1][areas.T] = (r2, g2, b2)

    return Image.fromarray(data)

# Color mapping: {(original_red, original_green, original_blue): (new_red, new_green, new_blue)}
color_mapping = {
    (2, 36, 82): (255, 98,137),   # Change blue to red
    (0, 10, 50): (232,85,119) # Change dark blue to orange
}

# Generate new image with changed colors
new_image = change_color(original_image, color_mapping)
new_image.save(output_image_path_template.format('rosado'))

print("Image saved successfully with modified colors.")
