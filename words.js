//https://www.memrise.com/course/99695/3000-most-common-finnish-words/36/?action=next
var words = {
    "verbs" : [
        {"fi": "antaa", "en": "to give"},
        {"fi": "pitää", "en": "to like"},
        {"fi": "tehdä", "en": "to do"},
        {"fi": "tehdä", "en": "to make"},
        {"fi": "käyttää", "en": "to use"},
        {"fi": "käyttää", "en": "to apply"},
        {"fi": "ottaa", "en": "to take"},
        {"fi": "ottaa", "en": "to select"},
        {"fi": "löytää", "en": "to find"},
        {"fi": "muuttaa", "en": "to change"},
        {"fi": "painaa", "en": "to press"},
        {"fi": "viettää", "en": "to celebrate"},
        {"fi": "myydä", "en": "to sell"},
        {"fi": "kerätä", "en": "to gather"},
        {"fi": "kerätä", "en": "To pick (berries)"},
        {"fi": "heittää", "en": "to throw"},
        {"fi": "kääntyä", "en": "to turn"},
        {"fi": "keskustella", "en": "to discuss"},
        {"fi": "menettää", "en": "to lose"},
        {"fi": "sulkea", "en": "to close"},
        {"fi": "sulkea", "en": "to turn off"}
    ],
    "nouns" : [
        {"fi": "silmä", "en": "eye"},
        {"fi": "viikko", "en": "week"},
        {"fi": "piiri", "en": "circle"},
        {"fi": "kokous", "en": "meeting"},
        {"fi": "ääni", "en": "sound"},
        {"fi": "ääni", "en": "voice"},
        {"fi": "tavara", "en": "goods"},
        {"fi": "pinta", "en": "surface"},
        {"fi": "johto", "en": "administration"},
        {"fi": "johto", "en": "management"},
        {"fi": "kokemus", "en": "knowledge"},
        {"fi": "vastaus", "en": "answer"},
        {"fi": "ehdotus", "en": "suggestion"},
        {"fi": "ehdotus", "en": "recommendation"},
        {"fi": "vaara", "en": "danger"},
        {"fi": "rauha", "en": "peace"},
        {"fi": "ottelu", "en": "game"},
        {"fi": "tulevaisuus", "en": "future"},
        {"fi": "ansio", "en": "income"}
    ],
    "adjectives" : [
        {"fi": "sopiva", "en": "suitable"},
        {"fi": "huomattava", "en": "remarkable"},
        {"fi": "kansainvälinen", "en": "international"},
        {"fi": "välitön", "en": "spontaneous"},
        {"fi": "välitön", "en": "immediate"},
        {"fi": "tehokas", "en": "powerful"},
        {"fi": "tehokas", "en": "effective"},
        {"fi": "sisäinen", "en": "internal"},
        {"fi": "hidas", "en": "hidas"},
        {"fi": "mielenkiintoinen", "en": "interesting"},
        {"fi": "normaali", "en": "normal"},
        {"fi": "tuttu", "en": "familiar"},
        {"fi": "vahva", "en": "strong"},
        {"fi": "luonnollinen", "en": "natural"},
        {"fi": "tyhjä", "en": "empty"},
        {"fi": "täydellinen", "en": "perfect"}
    ],
    "other" : [
        {"fi": "joskus", "en": "sometimes"},
        {"fi": "lehti", "en": "leaf"},
        {"fi": "päätös", "en": "decision"},
        {"fi": "sormus", "en": "ring"},
        {"fi": "hieman", "en": "slightly"},
        {"fi": "parempi", "en": "better"},
        {"fi": "tavallisesti", "en": "usually"},
        {"fi": "välinen", "en": "between"},
        {"fi": "melko", "en": "quite"},
        {"fi": "melkein", "en": "almost"},
        {"fi": "päin", "en": "towards"},
        {"fi": "varmaan", "en": "certainly"},
        {"fi": "suoraan", "en": "directly"},
        {"fi": "vähintään", "en": "at least"},
        {"fi": "välissä", "en": "between"}
    ],
    "types": ["verbs", "nouns", "adjectives", "other"],
    // auto generated
    "all": []
};


function wordsAutoGenerate() {
    for(var t = 0; t < words.types.length; ++t) {
        words.all = words.all.concat(words[words.types[t]]);
    }
}

wordsAutoGenerate();