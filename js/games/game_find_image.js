
Games["find_image"] = {
    // "words" : [] - here will be words 1..4
    _currentWordIndex: 0,
    _seenWordsAmount: 0,
    _enWords: [],//4 english variants to choose (indexes)
    _elementEnWords : [],
    _elementFiWord : 0,
    _elementSound: 0,

    "start" : function() {
        console.log("Start game find_image");
        this._currentWordIndex = 0;//Math.floor(Math.random() * this.words.length);
        this._seenWordsAmount = 0;
        
        this._elementEnWords[1] = document.getElementById("find_image_en_1");
        this._elementEnWords[2] = document.getElementById("find_image_en_2");
        this._elementEnWords[3] = document.getElementById("find_image_en_3");
        this._elementEnWords[4] = document.getElementById("find_image_en_4");

        var that = this;
        this._elementEnWords[1].onclick = function() {that.onWordSelected(1);}
        this._elementEnWords[2].onclick = function() {that.onWordSelected(2);}
        this._elementEnWords[3].onclick = function() {that.onWordSelected(3);}
        this._elementEnWords[4].onclick = function() {that.onWordSelected(4);}
        
        this._elementFiWord = document.getElementById("find_image_fi_word");
        this._elementSound = document.getElementById("find_image_sound");

        this.showCurrentWordAndGuesses();       
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
        this.showCurrentWordAndGuesses();
    },

    "onNext": function() {
        ++this._seenWordsAmount;
        this._currentWordIndex++;
        if (this._currentWordIndex >= this.words.length) {
            this._currentWordIndex = 0;
        }
        if (this._active)
            this.showCurrentWordAndGuesses();

        if (this.onWordGuessed) {
            this.onWordGuessed();
        }
    },
    "onPlayAgain": function() {},//when button "play again" pressed
    "onHelp": function() {},//when button "help" pressed

    "onWordSelected": function(_wordIndex) {
        let wordIndex = this._enWords[_wordIndex];
        let currentWord = this.words[this._currentWordIndex];
        let chosenWord = this.words[wordIndex];
        if (currentWord.fi === chosenWord.fi) {
            this.win(this._elementEnWords[_wordIndex]);
        } else {
            this.lose(this._elementEnWords[_wordIndex])
        }
    },

    "win" : function(element) {
        //element.style["background-color"] = "green";
        let word = this.words[this._currentWordIndex];
        helpers.setWordAnsweredCorrectly(word.fi);
        element.style.backgroundImage = "url('" + helpers.getImgSrc(word) + "')";
        element.textContent = "";

        helpers.sayFinnishWordWithFallback(this._elementSound, word, function() {});
        
        var that = this;
        setTimeout(function() {that.onNext()}, 2000);
    },

    "lose": function(element) {
        element.style["background-color"] = "red";
        helpers.setWordAnsweredIncorrectly(this.words[this._currentWordIndex].fi);
    },

    // shows current word and 2 choices
    "showCurrentWordAndGuesses" : function() {
        if (this._active && helpers.updateProgress(this._seenWordsAmount, this.words.length)) {
            return;
        }
                
        for(let i = 1; i <= 4; ++i) {
            this._enWords[i] = this.getRandomWord(this._currentWordIndex);
        }
        this._enWords[Math.floor(1 + Math.random() * 4)] = this._currentWordIndex;//one of them is real

        for(let i = 1; i <= 4; ++i) {
            this._elementEnWords[i].textContent = this.words[this._enWords[i]].en;
            this._elementEnWords[i].style["background-color"] = "white";
            this._elementEnWords[i].style.backgroundImage = "none";
        }
        this._elementFiWord.textContent = this.words[this._currentWordIndex].fi;
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
