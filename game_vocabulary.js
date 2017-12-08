

Games["vocabulary"] = {
    _currentWordIndex: 0,
    _updateInterval: 0,
    // "words" : [] - here will be words

    "start" : function() {
        console.log("Start game vocabulary");
        _currentWordIndex = Math.floor(Math.random() * this.words.length);
        this.showCurrentWord();
        var that = this;
        _updateInterval = setInterval(function() {that.update();}, 3000);
    },

    "stop" : function() {
        console.log("Stop game vocabulary");
        clearInterval(_updateInterval);
    },

    "update" : function() {
        console.log("Update");
        this._currentWordIndex++;
        if (this._currentWordIndex >= this.words.length)
            this._currentWordIndex = 0;
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
