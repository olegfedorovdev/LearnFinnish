Games["type_word"] = {
    _currentWordIndex: 0,
    _currentGuessingLetterIndex: 0,
    // "words" : [] - here will be words
    // "_active": true, - will be true if game is active

    _elementImg: undefined,
    _elementWordEn: undefined,
    _elementWordFi: undefined,
    _elementLetters: [],//10 letters (div elements)
    _elementAudio: undefined,
    
    "start" : function() {
        console.log("Start game type_word");
        this._elementImg = document.getElementById("type_word_img");
        this._elementWordEn = document.getElementById("type_word_en");
        this._elementWordFi = document.getElementById("type_word_fi");
        this._elementAudio = document.getElementById("type_word_audio");
        var that = this;

        for(let i = 0; i < 10; ++i) {
            this._elementLetters[i] = document.getElementById("type_word_buttons_" + (i + 1));
            this._elementLetters[i].onclick = function() {that.onLetterSelected(i);}
        }

        this._currentWordIndex = 0;
        this.showCurrentWord();
    },

    "stop" : function() {
        console.log("Stop game type_word");
        helpers.clearQueuedWordsToSay();
    },

    "onPrevious": function() {
        this._currentWordIndex--;
        if (this._currentWordIndex < 0) {
            this._currentWordIndex = 0;
        }
        this.showCurrentWord();
    },

    "onNext": function() {
        this.update();
    },
    "onPlayAgain": function() {
        this.showCurrentWord();
    },
    "onHelp": function() {},//when button "help" pressed

    "win" : function() {
        let word = this.words[this._currentWordIndex];
        let that = this;
        helpers.sayFinnishWordWithFallback(this._elementAudio, word, function(word) {
            if (that._active) {
                that.update();
            }
        });

    },
    
    "update" : function() {
        ++this._currentWordIndex;
        this.showCurrentWord();
    },

    "showCurrentWord" : function() {
        // update progress and finish game
        if (helpers.updateProgress(this._currentWordIndex, this.words.length)) {
            return;
        }
        
        let word = this.words[this._currentWordIndex];
        this._currentGuessingLetterIndex = 0;
        
        this._elementWordEn.textContent = word.en;
        this._elementImg.src = helpers.getImgSrc(word);

        this.fillWordToGuess(word.fi);
        this.fillGuessLetters(word.fi);
    },

    "fillWordToGuess" : function(word) {
        let len = word.length;
        let wordToGuess = "";
        for(let i = 0; i < len; ++i) {
            if (wordToGuess.length > 0) {
                wordToGuess += " ";
            }
            wordToGuess += "_";
        }
        this._elementWordFi.textContent = wordToGuess;
    },

    "fillGuessLetters" : function(word) {
        let uniqueLetters = [];
        for(let i = 0; i < word.length; ++i) {
            let l = word[i];
            if (uniqueLetters.indexOf(l) === -1) {
                uniqueLetters.push(l);
            }
        }

        //add random other
        // note: array have multiple often used letters  to increase probability of selecting them
        let possible = "aaaaabcccdeeeefghhhhiiiijkkkklllmmmnnnoooooppppqrsssttttuvwxyzöäöäöä";//å
        while(uniqueLetters.length < 10) {
            let l = possible.charAt(Math.floor(Math.random() * possible.length));
            if (uniqueLetters.indexOf(l) === -1) {
                uniqueLetters.push(l);
            }
        }

        for(let i = 0; i < 10; ++i) {
            this._elementLetters[i].textContent = uniqueLetters[i];
        }
    },

    "onLetterSelected": function(idx) {
        let element = this._elementLetters[idx];
        let letter = element.textContent;
        console.log(letter);
        
        let word = this.words[this._currentWordIndex].fi;
        let guessingWord = this._elementWordFi.textContent;

        let guessingLetter = word[this._currentGuessingLetterIndex];

        if (letter === guessingLetter) {
            // we add spaces and _ in guessing word so we need to replace _ with letter and keep space
            let index = this._currentGuessingLetterIndex*2;
            guessingWord = guessingWord.substr(0, index) + guessingLetter + guessingWord.substr(index + 1);
            this._elementWordFi.textContent = guessingWord;
            ++this._currentGuessingLetterIndex;
            if (this._currentGuessingLetterIndex >= word.length) {
                this.win();
            }
        } else {
            let background = element.style.backgroundColor;
            element.style.backgroundColor = "red";
            setTimeout(function() {
                    element.style.backgroundColor = background;
                },
                1000
            );
        }
    }
};

