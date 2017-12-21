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
        "type": "Kappale 7",
        "words" : [
            {"fi":"katsella", "en":"to view", "ru": "смотреть"},
            {"fi":"palata", "en":"to return", "ru": "вернуться"},
            {"fi":"viipyä", "en":"to be late", "ru": "задерживаться"},
            {"fi":"tarkistaa", "en":"to check", "ru": "проверять"},
            {"fi":"luovuttaa", "en":"to hand over", "ru": "отдавать"},
            {"fi":"lossi", "en":"ferry", "ru": "паром"},
            {"fi":"teltta", "en":"tent", "ru": "палатка"},
            {"fi":"mennään", "en":"lets go", "ru": "пойдем"},
            {"fi":"varmasti", "en":"certainly", "ru": "конечно"},
            {"fi":"mukava", "en":"comfortable", "ru": "удобный"},
            {"fi":"noin", "en":"about, around", "ru": "примерно"},
            {"fi":"...-kin", "en":"...-also", "ru": "...-тоже, также", "img":"img/kin.jpg"},
            {"fi":"henki", "en":"spirit", "ru": "дух"},
            {"fi":"täytyä", "en":"have to", "ru": "должен"},
            {"fi":"lause", "en":"sentence", "ru": "предложение (текст)"},
            {"fi":"tuore", "en":"fresh", "ru": "свежий"},
            {"fi":"ihminen", "en":"human", "ru": "человек"},
            {"fi":"yhdistää", "en":"to connect", "ru": "соединять"},
            {"fi":"panna", "en":"to put", "ru": "ставить"},
            {"fi":"toimisto", "en":"office", "ru": "офис"},
            {"fi":"sairaala", "en":"hospital", "ru": "больница"},
            {"fi":"ainakin", "en":"at least", "ru": "как минимум"},
            {"fi":"aina", "en":"always", "ru": "всегда"},
            {"fi":"taas", "en":"again", "ru": "опять"}
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






