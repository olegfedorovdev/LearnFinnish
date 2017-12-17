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
        "type": "Kappale 6",
        "words" : [
            {"fi":"lattia", "en":"floor", "ru": "пол (в комнате)"},
            {"fi":"pehmeä", "en":"soft", "ru": "мягкий"},
            {"fi":"kova", "en":"hard", "ru": "жесткий"},
            {"fi":"leveä", "en":"wide", "ru": "широкий"},
            {"fi":"kapea", "en":"narrow", "ru": "узкий"},
            {"fi":"sänky", "en":"bed", "ru": "кровать"},
            {"fi":"matala", "en":"low", "ru": "низкий"},
            {"fi":"seinä", "en":"wall", "ru": "стена"},
            {"fi":"viihtyisä", "en":"homey, comfortable", "ru": "удобный"},
            {"fi":"sotkuinen", "en":"messy", "ru": "беспорядочный"},
            {"fi":"tässä", "en":"here", "ru": "тут", "img":"img/tässä.png"},
            {"fi":"tuo", "en":"that", "ru": "этот"},
            {"fi":"usein", "en":"often", "ru": "часто"},
            {"fi":"jo", "en":"already", "ru": "уже"},
            {"fi":"aika", "en":"quite (small)", "ru": "довольно (маленький)", "img":"img/quite_small.jpg"},
            {"fi":"aika", "en":"time", "ru": "время"},
            {"fi":"ongelma", "en":"problem", "ru": "проблема"},
            {"fi":"vika", "en":"fault", "ru": "отказ"},
            {"fi":"kunnolla", "en":"properly", "ru": "правильно"},
            {"fi":"kiinni", "en":"closed", "ru": "закрыто"},
            {"fi":"koko ajan", "en":"all the time", "ru": "все время", "img":"img/koko_ajan.jpg"},
            {"fi":"selvä juttu", "en":"all clear", "ru": "все понятно", "img":"img/all_clear.png"},
            {"fi":"hieno", "en":"great!", "ru": "отлично"},
            {"fi":"rappu", "en":"stair", "ru": "подъезд"},
            {"fi":"nostaa", "en":"to lift", "ru": "поднимать"},
            {"fi":"kantaa", "en":"to carry", "ru": "нести"},
            {"fi":"tapahtua", "en":"to happen", "ru": "случаться"},
            {"fi":"viedä", "en":"to carry out", "ru": "относить"},
            {"fi":"tuoda", "en":"to carry in", "ru": "приносить"},
            {"fi":"käydä", "en":"to visit", "ru": "посещать"},
            {"fi":"vuotaa", "en":"to leak", "ru": "протекать"},
            {"fi":"sopia", "en":"to fit", "ru": "подходить"}
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






