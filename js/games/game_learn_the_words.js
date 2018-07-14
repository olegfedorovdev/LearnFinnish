

Games["learn_the_words"] = {
    // "words" : [] - here will be words
    prepared_words : [], //words prepared for learning - searched unlearned from words and 3x times
    _currentWordIndex: 0,

    words_per_session : 2,
    game_types: ["choose_word", "find_image", "listen_choose", "type_word"],
    current_game: undefined,

    "start" : function() {
        console.log("Start game learn_the_words");
        this._currentWordIndex = 0;
        this.words_per_session = Settings.getNumer(Settings.WORDS_PER_SESSION, 10);

        const unlearnedWords = this.selectUnlearnedWords(this.words);
        if (unlearnedWords.length === 0) {
            // just repeat if everything is learned already
            unlearnedWords = JSON.parse(JSON.stringify(this.words));
        }

        this.prepared_words = this.words.slice(0, this.words_per_session);
        // mix every word 3 times
        this.prepared_words = this.prepared_words.concat(this.prepared_words);
        this.prepared_words = this.prepared_words.concat(this.prepared_words);
        this.prepared_words = helpers.shuffle(this.prepared_words);
        
        this.showNextWord();
    },

    "stop" : function() {
        console.log("Stop game learn_the_words");
    },

    "onPrevious": function() {
    },

    "onNext": function() {
    },

    "onPlayAgain": function() {
    },

    "onHelp": function() {
    },

    "showNextWord": function() {
        if (this._currentWordIndex >= this.prepared_words.length) {
            helpers.updateProgress(100, 100);
            return;
        }
        helpers.updateProgress(this._currentWordIndex, this.prepared_words.length);
        if (this.current_game) {
            this.current_game.stop();
            this.current_game.onWordGuessed = undefined;
        }
        const learnedWord = this.prepared_words[this._currentWordIndex++];
        const gameType = this.game_types[Math.floor(Math.random() * this.game_types.length)]
        this.current_game = Games[gameType];
        let that = this;
        this.current_game.onWordGuessed = function() {that.onWordGuessedInGame();}

        //first if the quessed word. rest are filled with other words
        this.current_game.words = [learnedWord].concat(this.words);

        // show game
        helpers.showOnlyOneOfDivs("div_game_field_", gameType);
        this.current_game._active = false;
        this.current_game.start();
    },

    "onWordGuessedInGame" : function() {
        this.showNextWord();
    },

    "selectUnlearnedWords" : function(words) {
        let selectedWords = [];
        for(let idx in words) {
            const w = words[idx];
            if (!helpers.isWordLearned(w.fi) || helpers.needToRepeatLeanedWord(w.fi)) {
                selectedWords.push(w);
            }
        }
        return selectedWords;
    }
};

