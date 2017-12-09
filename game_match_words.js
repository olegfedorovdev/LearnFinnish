
Games["match_words"] = {
    // "words" : [] - here will be words

    // elements for words 1..8
    _elementEnWords : [],
    _elementFiWords : [],

    _currentWordsFi: [],//shuffled array of words which are shown
    _currentWordsEn: [],//shuffled array of words which are shown

    _selectedWordFi: undefined,//index
    _selectedWordEn: undefined,//index
    
    "start" : function() {
        console.log("Start game choose_word");
        var that = this;
        for(let i = 1; i <= 8; ++i) {
            this._elementEnWords[i] = document.getElementById("match_words_en_" + i);
            this._elementFiWords[i] = document.getElementById("match_words_fi_" + i);
            this._elementEnWords[i].onclick = function() {that.onWordSelectedEn(i);}
            this._elementFiWords[i].onclick = function() {that.onWordSelectedFi(i);}
            this.unselect(this._elementFiWords[i]);
            this.unselect(this._elementEnWords[i]);
        }
        this._currentWordsFi = JSON.parse(JSON.stringify(this.words));//copy
        this._currentWordsFi = this.shuffle(this._currentWordsFi);
        this._currentWordsEn = JSON.parse(JSON.stringify(this._currentWordsFi));//copy
        this._currentWordsEn = this.shuffle_nearby(this._currentWordsEn);
        this._currentWordsFi.unshift({});
        this._currentWordsEn.unshift({});
        this._selectedWordFi = undefined;
        this._selectedWordEn = undefined;

        this.showWords();
    },
    "stop" : function() {
        console.log("Stop game match words");
    },
    
    "onPrevious": function() {
    },

    "onNext": function() {
    },

    "win" : function() {
        var that = this;
        setTimeout(function() {that.start()}, 1000);
    },

    "showWords" : function() {
        // we have unused element 0 so length 1 means nothing left
        if (this._currentWordsFi.length === 1) {
            this.win();
        }

        for(let i = 1; i <= 8; ++i) {
            if (i >= this._currentWordsFi.length) {
                this._elementEnWords[i].hidden = true;
                this._elementFiWords[i].hidden = true;
            } else {
                this._elementEnWords[i].hidden = false;
                this._elementFiWords[i].hidden = false;
                this._elementEnWords[i].textContent = this._currentWordsEn[i].en;
                this._elementFiWords[i].textContent = this._currentWordsFi[i].fi;
            }
        }
    },

    "onWordSelectedEn": function(wordIndex) {
        console.log("Selected en: " + wordIndex);
        if (this._selectedWordEn !== undefined) {
            this.unselect(this._elementEnWords[this._selectedWordEn])
        }
        this._selectedWordEn = wordIndex;
        this.select(this._elementEnWords[this._selectedWordEn]);

        var that = this;
        setTimeout(function() {that.checkSelectedWords()}, 500);
    },

    "onWordSelectedFi": function(wordIndex) {
        console.log("Selected fi: " + wordIndex);
        if (this._selectedWordFi !== undefined) {
            this.unselect(this._elementFiWords[this._selectedWordFi])
        }
        this._selectedWordFi = wordIndex;
        this.select(this._elementFiWords[this._selectedWordFi]);

        var that = this;
        setTimeout(function() {that.checkSelectedWords()}, 500);
    },

    "checkSelectedWords": function() {
        if (this._selectedWordEn === undefined || this._selectedWordFi == undefined) {
            return;
        }
        let en = this._currentWordsEn[this._selectedWordEn];
        let fi = this._currentWordsFi[this._selectedWordFi];

        if (en.fi === fi.fi) {
            this.removeSelectedWords();
        } else {
            this.markSelectedWordsWrong();
        }
        this.showWords();
    },

    "removeSelectedWords" : function() {
        console.log("Guessed right");
        this.unselect(this._elementFiWords[this._selectedWordFi]);
        this.unselect(this._elementEnWords[this._selectedWordEn]);
        this._currentWordsEn.splice(this._selectedWordEn, 1);
        this._currentWordsFi.splice(this._selectedWordFi, 1);
        this._selectedWordEn = undefined;
        this._selectedWordFi = undefined;
    },

    "markSelectedWordsWrong" : function() {
        console.log("Guessed wrong");
        var en = this._elementEnWords[this._selectedWordEn];
        var fi = this._elementFiWords[this._selectedWordFi];
        this.markWrong(en);
        this.markWrong(fi);
        
        var that = this;
        setTimeout(function() {
            that.unselect(fi);
            that.unselect(en);
        }, 1100);

        this._selectedWordEn = undefined;
        this._selectedWordFi = undefined;
    },

    "markWrong" : function(element) {
        element.style["background-color"] = "#ff1010";
    },

    "select" : function(element) {
        element.style["background-color"] = "#ffe0d0";
    },

    "unselect" : function(element) {
        element.style["background-color"] = "white";
    },
        
    // shuffle array
    "shuffle" : function(array) {
        let counter = array.length;
    
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;

            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
    
        return array;
    },

    // shuffle array leaving entries still nearby
    "shuffle_nearby" : function(array) {
        let counter = array.length;
    
        while (counter > 0) {
            let rnd = Math.floor(Math.random() * 8);
            counter--;
            
            let idx = counter + 4 - rnd;
            if (idx < 0) {
                idx = 0;
            }
            if (idx >= array.length) {
                idx = array.length - 1;
            }
            
            let temp = array[counter];
            array[counter] = array[idx];
            array[idx] = temp;
        }
    
        return array;
    }

}
