
Games["listen_choose"] = {
    // "words" : [] - here will be words
    _currentWordIndex: 0,
    _seenWordsAmount: 0,
    _enWords: [],//4 english variants to choose (indexes)
    _elementEnWords : [],
    _elementEnImages : [],
    _elementSound: 0,

    "start" : function() {
        console.log("Start game find_image");
        this._currentWordIndex = Math.floor(Math.random() * this.words.length);
        this._seenWordsAmount = 0;
        var that = this;
        for(let i = 1; i <= 4; ++i) {
            this._elementEnWords[i] = document.getElementById("listen_choose_en_" + i);
            this._elementEnImages[i] = document.getElementById("listen_choose_img_en_" + i);
            this._elementEnWords[i].onclick = function() {that.onWordSelected(i);}
            this._elementEnImages[i].onclick = function() {that.onWordSelected(i);}
        }

        this._elementSound = document.getElementById("listen_choose_sound");

        this.playCurrentWordAndShowGuesses();       
    },
    "stop" : function() {
        console.log("Stop game choose_word");
        this._elementSound.src = "";
        helpers.clearQueuedWordsToSay();
    },
    
    "onPrevious": function() {
        --this._seenWordsAmount;
        this._currentWordIndex--;
        if (this._currentWordIndex < 0) {
            this._currentWordIndex = this.words.length - 1;
        }
        this.playCurrentWordAndShowGuesses();
    },

    "onNext": function() {
        ++this._seenWordsAmount;
        this._currentWordIndex++;
        if (this._currentWordIndex >= this.words.length) {
            this._currentWordIndex = 0;
        }
        this.playCurrentWordAndShowGuesses();
    },
    "onPlayAgain": function() {},//when button "play again" pressed
    "onHelp": function() {},//when button "help" pressed

    "onWordSelected": function(_wordIndex) {
        let wordIndex = this._enWords[_wordIndex];
        let currentWord = this.words[this._currentWordIndex];
        let chosenWord = this.words[wordIndex];

        this._elementEnWords[_wordIndex].textContent = chosenWord.fi;//show finnish translation, no matter if it's correct or wrong

        if (currentWord.fi === chosenWord.fi) {
            this.win(_wordIndex);
        } else {
            this.lose(_wordIndex)
        }
    },

    "win" : function(index) {
        helpers.playSuccessAnimationOnElement(this._elementEnImages[index], 2000);

        var that = this;
        setTimeout(function() {that.onNext()}, 2500);
    },

    "lose": function(index) {
        helpers.playFailureAnimationOnElement(this._elementEnImages[index], 2000);
        //this._elementEnImages[index].src = "img/red.jpg";
    },

    "playCurrentWordAndShowGuesses" : function() {
        if (helpers.updateProgress(this._seenWordsAmount, this.words.length)) {
            return;
        }        
        let word = this.words[this._currentWordIndex];
        helpers.sayFinnishWordWithFallback(this._elementSound, word, function() {});
        
        for(let i = 1; i <= 4; ++i) {
            this._enWords[i] = undefined;
        }
        for(let i = 1; i <= 4; ++i) {
            this._enWords[i] = this.getRandomWord(this._currentWordIndex, this._enWords);
        }
        this._enWords[Math.floor(1 + Math.random() * 4)] = this._currentWordIndex;//one of them is real

        for(let i = 1; i <= 4; ++i) {
            let word = this.words[this._enWords[i]];
            this._elementEnWords[i].textContent = word.en;
            this._elementEnImages[i].src = helpers.getImgSrc(word);
        }
    },

    "getRandomWord": function(excludeWord, array) {
        do {
            let r = Math.floor(Math.random() * this.words.length);
            if (r != excludeWord && array.indexOf(r) === -1) {
                return r;
            }
        } while(true);
        
    }
}
