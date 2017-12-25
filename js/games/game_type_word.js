Games["type_word"] = {
    _currentWordIndex: 0,
    _currentGuessingLetterIndex: 0,
    // "words" : [] - here will be words
    // "_active": true, - will be true if game is active

    _elementImg: undefined,
    _elementWordEn: undefined,
    _elementWordFi: undefined,
    _elementLetters: [],//12 letters (div elements)
    _elementLettersCount: 12,
    _elementAudio: undefined,

    // note: array have multiple often used letters  to increase probability of selecting them
    //å is missing
    _possibleCharacters: "aaaaabcccdeeeefghhhhiiiijkkkklllmmmnnnoooooppppqrsssttttuvwxyzöäöäöä", 
    
    "start" : function() {
        console.log("Start game type_word");
        this._elementImg = document.getElementById("type_word_img");
        this._elementWordEn = document.getElementById("type_word_en");
        this._elementWordFi = document.getElementById("type_word_fi");
        this._elementAudio = document.getElementById("type_word_audio");
        var that = this;

        for(let i = 0; i < this._elementLettersCount; ++i) {
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
    
    "onHelp": function() {
        this.repeatCurrentWordInTheEnd();
        this.showNextGuessedLetter();
    },

    "onKeyPressed": function(keyCode) {
        let letter = String.fromCharCode(keyCode).toLowerCase();
        if (keyCode === 192) letter = "ö";
        if (keyCode === 222) letter = "ä";

        //simulate press on one of buttons
        for(let i = 0; i < this._elementLettersCount; ++i) {
            if (this._elementLetters[i].textContent === letter) {
                return this.onLetterSelected(i);
            }
        }

    },

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
        while(uniqueLetters.length < this._elementLettersCount) {
            let l = this._possibleCharacters.charAt(Math.floor(Math.random() * this._possibleCharacters.length));
            if (uniqueLetters.indexOf(l) === -1) {
                uniqueLetters.push(l);
            }
        }

        uniqueLetters = helpers.shuffle(uniqueLetters);

        for(let i = 0; i < this._elementLettersCount; ++i) {
            this._elementLetters[i].textContent = uniqueLetters[i];
            this._elementLetters[i].style.backgroundColor = "white";
        }
    },

    "showNextGuessedLetter": function() {
        if (this._currentGuessingLetterIndex >= this.words[this._currentWordIndex].fi.length) {
            return;
        }
            
        // we add spaces and _ in guessing word so we need to replace _ with letter and keep space
        let guessingWord = this._elementWordFi.textContent;
        let word = this.words[this._currentWordIndex].fi;
        let guessingLetter = word[this._currentGuessingLetterIndex];
        
        let index = this._currentGuessingLetterIndex*2;
        guessingWord = guessingWord.substr(0, index) + guessingLetter + guessingWord.substr(index + 1);
        this._elementWordFi.textContent = guessingWord;
        ++this._currentGuessingLetterIndex;
        if (this._currentGuessingLetterIndex >= word.length) {
            this.win();
        }
    },

    "repeatCurrentWordInTheEnd": function() {
        let word = this.words[this._currentWordIndex].fi;
        // add word to the end of the list to ask it again if guessed wrong
        if (this.words[this.words.length - 1].fi !== word) {
            this.words.push(this.words[this._currentWordIndex]);
        }
    },

    "onLetterSelected": function(idx) {
        if (this._currentGuessingLetterIndex >= this.words[this._currentWordIndex].fi.length) {
            return;
        }
        
        let element = this._elementLetters[idx];
        let letter = element.textContent;
        //console.log(letter);
        
        let word = this.words[this._currentWordIndex].fi;
        let guessingLetter = word[this._currentGuessingLetterIndex];

        if (letter === guessingLetter) {
            this.showNextGuessedLetter();
        } else {
            this.repeatCurrentWordInTheEnd();

            element.style.backgroundColor = "red";
            setTimeout(function() {
                    element.style.backgroundColor = "white";
                },
                1000
            );
        }
    }
};

