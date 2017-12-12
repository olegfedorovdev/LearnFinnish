# -*- coding: utf-8 -*-
import os.path
import urllib2
import urllib
import json
import time
from HTMLParser import HTMLParser

BASE_URL="http://papunet.net/materiaalia/kuvapankki/hak/"

def get_word_url(word):
    return "{}{}".format(BASE_URL, urllib.quote_plus(word))


class MyHTMLParser(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.images = []
        self.has_results = False

    def handle_starttag(self, tag, attrs):
        a = {v[0]: v[1] for v in attrs}
        if tag == 'div' and 'class' in a.keys() and a['class'] == 'search-results':
            self.has_results = True
        if self.has_results and tag == "img" and 'class' in a.keys() and a['class'] == 'img-responsive':
            self.images.append(a["src"])

    def handle_endtag(self, tag):
        pass


def get_images(word):
    url = get_word_url(word)
    parser = MyHTMLParser()

    feed = urllib2.urlopen(url)
    text = feed.read()
    with open("{}.html".format(word), "wt") as f:
        f.write(text)
    parser.feed(text)

    return parser.images[:5]

def get_unique_name(fname):
    name = fname+u".jpg"
    if os.path.isfile(name):
        return None
    for i in range(1,5):
        name = u"{}{}.jpg".format(fname, i)
        if not os.path.isfile(name):
            return name

def download(url, fname):
    name = get_unique_name(fname)
    if not name:
        return

    with open(name, "wb") as f:
        p = urllib2.urlopen(url)
        f.write(p.read())

if __name__ == "__main__":
    with open('words.json', 'rU', encoding='utf-8') as words_file:
        words = json.loads(words_file.read(), encoding='utf-8')
        processed = set()

        for word in words:
            try:
                w = word['fi']
                ww = w.split(' ')
                if len(ww) > 2:
                    w = ww[0]
                ww = w.split('+')
                if len(ww) > 2:
                    w = ww[0]

                if w in processed:
                    continue

                print "{}".format(w.encode('utf-8'))
                for i in get_images(w.encode('utf-8')):
                    download(i, w)
                processed.add(w)
            except Exception as e:
                print e
