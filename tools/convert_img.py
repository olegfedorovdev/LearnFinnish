import glob
import os.path
from PIL import Image


def split_name(name):
    n,e = os.path.splitext(name)
    return n[:-1], n[-1], e


def merge_images(images):
    result = Image.new("RGBA", (200, 200), color=(255,255,255, 0))
    positions = [(0,0), (100, 0), (0, 100), (100, 100)]

    for i in range(0, len(images)):
        result.paste(images[i], positions[i])
    return result

variants = {}

images=glob.glob("./*[0-9].jpg")
for img in images:
    base, seq, ext = split_name(img)

    if base in variants.keys():
        variants[base].append(seq)
    else:
        variants[base] = [seq]

for base in variants.keys():
    image = merge_images([Image.open(base + x + ".jpg") for x in variants[base]])
    image.save(base + ".png", "PNG")

