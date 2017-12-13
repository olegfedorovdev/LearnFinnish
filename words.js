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
        "type": "Kappale 4",
        "words" : [
            {"fi":"hoikka", "en":"slim", "ru": "стройный"},
            {"fi":"söpö", "en":"cute", "ru": "милый"},
            {"fi":"ujo", "en":"shy", "ru": "застенчивый"},
            {"fi":"suloinen", "en":"sweet", "ru": "сладенький"},
            {"fi":"bussikuski", "en":"bus driver", "ru": "водитель автобуса"},
            {"fi":"tukka", "en":"hair", "ru": "волосы"},
            {"fi":"suora", "en":"straight", "ru": "прямые"},
            {"fi":"kihara", "en":"curly", "ru": "кудрявый"},
            {"fi":"puhelias", "en":"talkative", "ru": "разговорчивый"},
            {"fi":"hiljainen", "en":"quiet", "ru": "тихий"},
            {"fi":"vihainen", "en":"evil", "ru": "злой"},
            {"fi":"ujo", "en":"shy", "ru": "застенчивый"},
            {"fi":"kohtelias", "en":"polite", "ru": "вежливый"},
            {"fi":"epäkohtelias", "en":"impolite", "ru": "невежливый"},
            {"fi":"parta", "en":"beard", "ru": "борода"},
            {"fi":"viikset", "en":"mustache", "ru": "усы"},
            {"fi":"komea", "en":"handsome", "ru": "красивый"},
            {"fi":"tukeva", "en":"sturdy", "ru": "плотный"},
            {"fi":"kihloissa", "en":"engaged", "ru": "обручен"},
            {"fi":"eronnut", "en":"divorced", "ru": "разведен"},
            {"fi":"avoliitossa", "en":"cohabiting", "ru": "сожительствовать"},
            {"fi":"avoliitto", "en":"cohabitation", "ru": "сожительствование"},
            {"fi":"parempi", "en":"better", "ru": "лучше"},
            {"fi":"lomake", "en":"form (to fill)", "ru": "форма (для заполнения)"},
            {"fi":"haluta", "en":"to want", "ru": "хотеть"},
            {"fi":"ilmoittautua", "en":"to register", "ru": "зарегистрироваться"},
            {"fi":"tarkista", "en":"to check", "ru": "проверить"},
            {"fi":"tarvita", "en":"need", "ru": "нуждаться"},
            {"fi":"siviilisääty", "en":"martial status", "ru": "семейное положение"},
            {"fi":"henkilötiedot", "en":"personal details", "ru": "персональные данные"},
            {"fi":"nälkä", "en":"hunger", "ru": "голод"},
            {"fi":"jano", "en":"thirst", "ru": "жажда"},
            {"fi":"kiire", "en":"hurry", "ru": "спешка"},
            {"fi":"Minulla on nälkä", "en":"I'm hungry", "ru": "Я голодный", "snd":"sounds/nälkä.mp3", "img":"img/nälkä.jpg"},
            {"fi":"Minulla on jano", "en":"I'm thursty", "ru": "У меня жажда", "snd":"sounds/jano.mp3", "img":"img/jano.jpg"},
            {"fi":"Minulla on kiire", "en":"I'm in a hurry", "ru": "Я спешу", "snd":"sounds/kiire.mp3", "img":"img/kiire.jpg"},
            {"fi":"tavallisesti", "en":"usually", "ru": "обычно"},
            {"fi":"heti", "en":"right now", "ru": "немедленно"},
            {"fi":"vielä", "en":"yet, still, more", "ru": "еще"}
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






