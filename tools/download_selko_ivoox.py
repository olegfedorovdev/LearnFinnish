import urllib.request
import urllib.parse
from pathlib import Path

def download_mp3(url):
    filename = url.split("/")[-1]
    print("downloading %s to %s" % (url, filename))
    if Path(filename).is_file():
        print("already downloaded")
        return

    try:
        response = urllib.request.urlopen(url)
    except urllib.error.HTTPError:
        print("Failed to download page")
        return

    with open(filename, 'wb') as file:
        file.write(response.read())


def parse_mp3_from_url(_url):
    url = str(_url)
    #print(url)
    delimiter = 'mp3_rf_'
    splitted = url.split(delimiter)
    if (len(splitted) < 2):
        print ("Not found idaudio")
        return ""
    audios = splitted[1].split('_1.')
    if (len(audios) > 1):
        url = "http://www.ivoox.com/listen_mn_%s_1.mp3" % audios[0]
        return url
    return ""

def get_mp3_from_page(page):
    mp3 = []
    response = urllib.request.urlopen(page)
    content =  response.read().decode(response.headers.get_content_charset())
    html = str(content)
    
    delimiter = '<meta itemprop="url" content="'
    splitted = html.split(delimiter)
    count = 0
    for s in splitted:
        count = count + 1
        if (count == 1):
            #first has no meaning
            continue
        beg = s.split('"/>')
        if len(beg) > 2:
            mp3.append(parse_mp3_from_url(beg[0].encode('utf-8')))
            
    return mp3
            


def get_pages():
    pages = []
    for i in range(1, 19):
        print ("Page: %s" % i)
        page = "http://www.ivoox.com/en/podcast-yle-uutiset-selkosuomeksi_sq_f1407669_%s.html" % str(i)
        pages.append(page)
    return pages


if __name__ == "__main__":
    pages = get_pages()
    for page in pages:
        print ("Working with %s" % page)
        audioFiles = get_mp3_from_page(page)
        for mp3 in audioFiles:
            download_mp3(mp3)
