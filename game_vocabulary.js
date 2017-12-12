

Games["vocabulary"] = {
    _currentWordIndex: 0,
    _updateInterval: undefined,
    // "words" : [] - here will be words
    "shuffled_words" : [],

    "start" : function() {
        console.log("Start game vocabulary");
        this._currentWordIndex = Math.floor(Math.random() * this.words.length);
        this.shuffled_words = JSON.parse(JSON.stringify(this.words));
        this.shuffled_words = helpers.shuffle(this.shuffled_words);
        this.showCurrentWord();
        this.resetUpdateInterval();
    },

    "stop" : function() {
        console.log("Stop game vocabulary");
        clearInterval(this._updateInterval);
        this._updateInterval = undefined;
    },

    "onPrevious": function() {
        this._currentWordIndex--;
        if (this._currentWordIndex < 0) {
            this._currentWordIndex = this.shuffled_words.length - 1;
        }
        this.showCurrentWord();
        this.resetUpdateInterval();
    },

    "onNext": function() {
        this.update();
        this.resetUpdateInterval();
    },

    "resetUpdateInterval" : function() {
        var that = this;
        if (this._updateInterval !== undefined) {
            clearInterval(this._updateInterval);
        }
        this._updateInterval = setInterval(function() {that.update();}, 7000);
    },    

    "update" : function() {
        this._currentWordIndex++;
        if (this._currentWordIndex >= this.shuffled_words.length) {
            this._currentWordIndex = 0;
        }
        this.showCurrentWord();
    },

    "showCurrentWord" : function() {
        let word = this.shuffled_words[this._currentWordIndex];
        console.log("Show word " + this._currentWordIndex + ": " + JSON.stringify(word));

        let enDiv = document.getElementById("vocabulary_en");
        let fiDiv = document.getElementById("vocabulary_fi");
        let img = document.getElementById("vocabulary_img");
        let audio = document.getElementById("vocabulary_audio");
        
        enDiv.textContent = word.en;
        fiDiv.textContent = word.fi;
        img.src = helpers.getImgSrc(word);

        helpers.sayEnglishWord(word.en, function(played) {
            console.log("English word said: ", played);
            helpers.sayWord(word.fi, "fi-FI", function(played_fi) {
                if (!played_fi) {
                    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                    //assume iOS has finnish voice
                    if (!iOS) {
                        audio.src = helpers.getAudioSrc(word);
                        audio.play();
                    }
                }
            });

            //audio.src = helpers.getAudioSrc(word);
            //audio.play();
        });
        
    }
}
