import urllib.request
import urllib.parse
import json
from pathlib import Path

def download_word(word):
    print("Downloading %s" % word)
    filename = "%s.mp3" % word;

    if Path(filename).is_file():
        print("already downloaded")
        return 0

    encoded = urllib.parse.quote_plus(word)

    try:
        response = urllib.request.urlopen('https://forvo.com/word/fi/%s/#fi' % encoded)
    except urllib.error.HTTPError:
        print("Failed to download page")
        return 1

    html = str(response.read())

    beginning = 'onclick="Play('
    end = ");"

    idxBeginning = html.find(beginning)
    if (idxBeginning == -1):
        print("not found!")
        exit(1)
    idxBeginning += len(beginning)

    idxEnd = html.find(end, idxBeginning)
    if (idxEnd == -1):
        print("end not found!")
        return 1

    funcArgs = html[idxBeginning:idxEnd]
    #remove html encoding
    funcArgs = funcArgs.replace("'", "")
    funcArgs = funcArgs.replace("\\", "")
    funcArgs = funcArgs.replace("'", "")
    print ("%s" % funcArgs)

    vars = funcArgs.split(",")
    print("%s" % str(vars))
    if (len(vars) < 5):
        print("Wrong vars!")
        return 1

    e = vars[4]
    url = "https://forvo.com/player-mp3-highHandler.php?path=%s" % e
    print("Downloading mp3: %s" % url)
    try:
        response = urllib.request.urlopen(url)
    except urllib.error.HTTPError:
        print("Downloading failed")
        return 1

    with open(filename, 'wb') as file:
        file.write(response.read())
    return 0

if __name__ == "__main__":
    with open('words.json', 'rU', encoding='utf-8') as words_file:
        data = json.loads(words_file.read(), encoding='utf-8')
        for d in data:
            download_word(d["fi"])