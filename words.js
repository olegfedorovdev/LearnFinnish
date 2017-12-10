//https://www.memrise.com/course/99695/3000-most-common-finnish-words/36/?action=next

// words object should have type and array of words.
// every entry in "words" array must have "fi" and "en". it may have "img" and "snd" if they are not default.
// if "snd" is missing - it's taken from "sounds/" + fi + ".mp3"
// if "img" is missing - it's taken from "img/" + fi + ".jpg"
// good web site with finnish mp3: https://forvo.com/word/fi/l%C3%B6yt%C3%A4%C3%A4/#fi
var words = {
    //"all": {},//here will be all words
    "latest" : {
        "type": "verbit",
        "words" : [
            {"fi":"kertoa", "en":"to tell"},
            {"fi":"lähteä", "en":"to go"},
            {"fi":"löytää", "en":"to find"},
            {"fi":"ottaa", "en":"to take", "img":"img/ottaa.jpg", "snd":"sounds/ottaa.mp3"},
            {"fi":"saapua", "en":"to arrive"},
            {"fi":"yöpyä", "en":"to sleep"},
            {"fi":"nähdä", "en": "to see"},
            {"fi":"juosta", "en":"to run"},
            {"fi":"juoda", "en":"to drink"},
            {"fi":"saada", "en":"to receive"},
            {"fi":"saada", "en":"to have permission (may)"},
            {"fi":"voida", "en":"to be able to"}
        ]
    },

    
    // we can have as many other as we want, they will be combined into "all"
    "verbs2" : {
        "type": "verbit 2",
        "words" : [
            {"fi":"heittää", "en":"to throw"},
            {"fi":"pelata", "en":"to play"},
            {"fi":"syöttää", "en":"to pass"},
            {"fi":"luistella", "en":"to skate"},
            {"fi":"päästää", "en":"to release"},
            {"fi":"estää", "en":"to prevent, to stop"},
            {"fi":"hypätä", "en":"to jump"},
            {"fi":"potkaista", "en":"to kick"},
            {"fi":"uida", "en":"to swim"}            
        ]
    },


    // gives src for image for word (for instance, word={"fi":"kertoa", "en":"to tell"})
    "getImgSrc": function(word) {
        if (word.img !== undefined)
            return word.img;
        return "img/" + word.fi + ".jpg";
    },

    "getAudioSrc": function(word) {
        if (word.snd !== undefined)
            return word.snd;
        return "sounds/" + word.fi + ".mp3";
    }
};





// will create object words.all
function wordsAutoGenerateAll() {
    let all = [];
    for(t in words) {
        all = all.concat(words[t].words);
    }

    words.all = {
        "type" : "All words", 
        "words" : all
    };
};
    
wordsAutoGenerateAll();






