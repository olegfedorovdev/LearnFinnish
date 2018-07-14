
Games["choose_word"] = {
    _currentWordIndex: 0,
    _seenWordsAmount: 0,

    _fiWord1: 0,//variant to choose 1 (index)
    _fiWord2: 0,//variant to choose 2

    // "words" : [] - here will be words
    _elementEnWord : 0,
    _elementFiWord1 : 0,
    _elementFiWord2: 0,
    _elementImg: 0,
    _elementSound: 0,

    "start" : function() {
        console.log("Start game choose_word");
        this._seenWordsAmount = 0;
        this._currentWordIndex = 0;//Math.floor(Math.random() * this.words.length);

        this._elementEnWord = document.getElementById("choose_word_en");
        this._elementFiWord1 = document.getElementById("choose_word_fi_1");
        this._elementFiWord2 = document.getElementById("choose_word_fi_2");
        this._elementImg = document.getElementById("choose_word_img");
        this._elementSound = document.getElementById("choose_word_sound");

        this.showCurrentWord();
        var that = this;

        this._elementFiWord1.onclick = function() {that.onWordSelected(1);}
        this._elementFiWord2.onclick = function() {that.onWordSelected(2);}
    },
    "stop" : function() {
        console.log("Stop game choose_word");
        this._elementSound.src = "";
        helpers.clearQueuedWordsToSay();
    },
    
    "onPrevious": function() {
        if (!this._active)
            return;
        --this._seenWordsAmount;
        this._currentWordIndex--;
        if (this._currentWordIndex < 0) {
            this._currentWordIndex = this.words.length - 1;
        }
        this.showCurrentWord();
    },

    "onNext": function() {
        ++this._seenWordsAmount;
        this._currentWordIndex++;
        if (this._currentWordIndex >= this.words.length) {
            this._currentWordIndex = 0;
        }
        if (this._active)
            this.showCurrentWord();

        if (this.onWordGuessed) {
            this.onWordGuessed();
        }
        
    },
    "onPlayAgain": function() {},//when button "play again" pressed
    "onHelp": function() {},//when button "help" pressed

    "onWordSelected": function(_wordIndex) {
        let wordIndex = (_wordIndex == 1)?this._fiWord1:this._fiWord2;

        if (this.words[wordIndex].fi === this.words[this._currentWordIndex].fi) {
            helpers.sayFinnishWordWithFallback(this._elementSound, this.words[wordIndex], function() {});
            this.win(_wordIndex == 1?this._elementFiWord1:this._elementFiWord2);
        } else {
            this.lose(_wordIndex == 1?this._elementFiWord1:this._elementFiWord2)
        }
    },

    "win" : function(element) {
        element.style.color = "green";
        var that = this;

        setTimeout(function() {that.onNext()}, 2000);
    },

    "lose": function(element) {
        element.style.color = "red";
    },

    // shows current word and 2 choices
    "showCurrentWord" : function() {
        if (this._active && helpers.updateProgress(this._seenWordsAmount, this.words.length)) {
            return;
        }
       
        if (Math.random() < 0.5) {
            this._fiWord1 = this._currentWordIndex;
            this._fiWord2 = this.getRandomWord(this._fiWord1);
        } else {
            this._fiWord2 = this._currentWordIndex;
            this._fiWord1 = this.getRandomWord(this._fiWord2);
        }

        this._elementEnWord.textContent = this.words[this._currentWordIndex].en;
        this._elementFiWord1.textContent = this.words[this._fiWord1].fi;
        this._elementFiWord1.style.color = "black";
        this._elementFiWord2.textContent = this.words[this._fiWord2].fi;
        this._elementFiWord2.style.color = "black";
        this._elementImg.src = helpers.getImgSrc(this.words[this._currentWordIndex]);

    },

    "getRandomWord": function(excludeWord) {
        do {
            let r = Math.floor(Math.random() * this.words.length);
            if (r != excludeWord) {
                return r;
            }
        } while(true);
        
    }
}
