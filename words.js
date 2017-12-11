//https://www.memrise.com/course/99695/3000-most-common-finnish-words/36/?action=next

// words object should have type and array of words.
// every entry in "words" array must have "fi" and "en". it may have "img" and "snd" if they are not default.
// if "snd" is missing - it's taken from "sounds/" + fi + ".mp3"
// if "img" is missing - it's taken from "img/" + fi + ".jpg"
// good web site with finnish mp3: https://forvo.com/word/fi/l%C3%B6yt%C3%A4%C3%A4/#fi
// images: http://papunet.net/materiaalia/kuvapankki
var words = {
    //"all": {},//here will be all words
    "latest" : {
        "type": "verbit",
        "words" : [
            {"fi":"hoikka", "en":"slim", "ru": "стройный"}
        ]
    },

    
    // we can have as many other as we want, they will be combined into "all"
    "verbs" :   {

    }
};


// will create object words.all
function wordsAutoGenerateAll() {
    let all = [];
    for(t in words) {
        if (words[t] instanceof Object && words[t].words instanceof Array) {
            all = all.concat(words[t].words);
        }
    }

    words.all = {
        "type" : "All words", 
        "words" : all
    };
};
    
wordsAutoGenerateAll();






