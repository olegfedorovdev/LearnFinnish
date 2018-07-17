Games["main_menu"] = {
    _gameType: "main_menu",
    _gameScope: "latest",
    
    "start" : function() {
        console.log("Main menu opened");

        this.fillSelectorsWhenAvailable();
        
        document.getElementById('gameButtons').hidden = true;
        helpers.updateProgress(0, 100);
    },

    "stop" : function() {
        document.getElementById('gameButtons').hidden = false;
    },

    "wordsAutoGenerateAll": function() {
        let all = [];
        let names = [];
        let wrongWords = JSON.parse(Settings.get(Settings.WRONG_WORDS, "[]"));
        let wrongWordsRecords = [];

        for(t in words) {
            if (t !== "all" && words[t] instanceof Object && words[t].words instanceof Array) {
                all = all.concat(words[t].words);
                names.push({
                    "type": t, 
                    "visible_name": words[t].type
                });
            }
        };
        words.all = {
            "type" : "All words", 
            "words" : all
        };
        names.push({
            "type": "all", 
            "visible_name": words.all.type
        });

        //fill wrong words
        for(w in all) {
            if (wrongWords.includes(all[w].fi)) {
                wrongWordsRecords.push(all[w]);
            }
        }
        words.wrong = {
            "type" : "Review mistakes: " + wrongWordsRecords.length, 
            "words" : wrongWordsRecords
        };
        names.push({
            "type": "wrong",
            "visible_name": words.wrong.type
        });
        return names;
    },

    "fillSelectorsWhenAvailable": function() {
        let names = this.wordsAutoGenerateAll();
        console.log(JSON.stringify(names));
        let scopeList = document.getElementById('select_scope');
        scopeList.options.length = 0;
        for(n in names) {
            let option = document.createElement("option");
            option.text = names[n].visible_name;
            option.value = names[n].type;
            scopeList.add(option);
        }    

        //remember which game was selected last
        this._gameType = Settings.get(Settings.SELECTED_GAME, "vocabulary");
        this._gameScope = Settings.get(Settings.SELECTED_SCOPE, "latest");
        const gameTypeSelected = helpers.selectDropdownValue("select_game_type", this._gameType);
        helpers.selectDropdownValue("select_scope", this._gameScope);

        //game types load async so they may be loaded later - wait for it
        var that = this;
        if (!gameTypeSelected) {
            setTimeout(function() {
                that.fillSelectorsWhenAvailable()
            }, 100);
        }
    },

    "onPrevious": function() {},
    "onNext": function() {},
    "onPlayAgain": function() {},//when button "play again" pressed
    "onHelp": function() {},//when button "help" pressed

    "changeGameType": function(gameType) {
        this._gameType = gameType;
        if (gameType !== "main_menu" && gameType !== "select_voices") {
            Settings.set(Settings.SELECTED_GAME, this._gameType);
        }
    },

    "changeScope": function(scope) {
        this._gameScope = scope;
        Settings.set(Settings.SELECTED_SCOPE, scope);
    },

    "startGame": function() {
        console.log("Scope:", this._gameScope, ", game type:", this._gameType);

        // show game
        helpers.showOnlyOneOfDivs("div_game_field_", this._gameType);

        // always take shuffled copy of words
        let w = JSON.parse(JSON.stringify(words[this._gameScope].words));

        if (this._gameScope === "wrong" && this._gameType !== "main_menu") {
            Settings.set(Settings.WRONG_WORDS, "[]");
        }

        w = helpers.shuffle(w);

        Game.stop();
        Game._active = false;
        Game = Games[this._gameType];
        Game.words = w;
        Game.start();
        Game._active = true;
    }
};

