
Games["find_image"] = {
    // "words" : [] - here will be words 1..4
    _currentWordIndex: 0,
    _enWords: [],//4 english variants to choose (indexes)
    _elementEnWords : [],
    _elementFiWord : 0,
    _elementSound: 0,

    "start" : function() {
        console.log("Start game find_image");
        this._currentWordIndex = Math.floor(Math.random() * this.words.length);

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
    },
    
    "onPrevious": function() {
        this._currentWordIndex--;
        if (this._currentWordIndex < 0) {
            this._currentWordIndex = this.words.length - 1;
        }
        this.showCurrentWordAndGuesses();
    },

    "onNext": function() {
        this._currentWordIndex++;
        if (this._currentWordIndex >= this.words.length) {
            this._currentWordIndex = 0;
        }
        this.showCurrentWordAndGuesses();
    },

    "onWordSelected": function(_wordIndex) {
        console.log("Selected: " + _wordIndex);
        let wordIndex = this._enWords[_wordIndex];
        if (wordIndex === this._currentWordIndex) {
            this.win(this._elementEnWords[_wordIndex]);
        } else {
            this.lose(this._elementEnWords[_wordIndex])
        }
    },

    "win" : function(element) {
        element.style["background-color"] = "green";
        element.style.backgroundImage = "url('" + words.getImgSrc(this.words[this._currentWordIndex]) + "')";
        element.textContent = "";

        this._elementSound.src = words.getAudioSrc(this.words[this._currentWordIndex]);
        this._elementSound.play();
        
        var that = this;
        setTimeout(function() {that.onNext()}, 2000);
    },

    "lose": function(element) {
        element.style["background-color"] = "red";
    },

    // shows current word and 2 choices
    "showCurrentWordAndGuesses" : function() {
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
