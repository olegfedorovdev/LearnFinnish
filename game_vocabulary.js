

Games["vocabulary"] = {
    _currentWordIndex: 0,
    _updateInterval: undefined,
    // "words" : [] - here will be words

    "start" : function() {
        console.log("Start game vocabulary");
        _currentWordIndex = Math.floor(Math.random() * this.words.length);
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
            this._currentWordIndex = this.words.length - 1;
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
        this._updateInterval = setInterval(function() {that.update();}, 3000);
    },    

    "update" : function() {
        console.log("Update");
        this._currentWordIndex++;
        if (this._currentWordIndex >= this.words.length) {
            this._currentWordIndex = 0;
        }
        this.showCurrentWord();
    },

    "showCurrentWord" : function() {
        let word = this.words[this._currentWordIndex];
        console.log("Show word " + this._currentWordIndex + ": " + JSON.stringify(word));

        let enDiv = document.getElementById("vocabulary_en");
        let fiDiv = document.getElementById("vocabulary_fi");
        let img = document.getElementById("vocabulary_img");
        let sound = document.getElementById("vocabulary_audio");

        enDiv.textContent = word.en;
        fiDiv.textContent = word.fi;
        img.src = words.getImgSrc(word);
        sound.src = words.getAudioSrc(word);
    }
}