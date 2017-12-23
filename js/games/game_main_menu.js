Games["main_menu"] = {
    _gameType: "main_menu",
    _gameScope: "latest",
    
    "start" : function() {
        console.log("Main menu opened");

        //remember out which game was selected last
        this._gameType = Settings.get(Settings.SELECTED_GAME, "vocabulary");
        this._gameScope = Settings.get(Settings.SELECTED_SCOPE, "latest");
        helpers.selectDropdownValue("#select_game_type", this._gameType);
        helpers.selectDropdownValue("#select_scope", this._gameScope);
        
        document.querySelector('#gameButtons').hidden = true;
    },

    "stop" : function() {
        document.querySelector('#gameButtons').hidden = false;
    },

    "onPrevious": function() {},
    "onNext": function() {},
    "onPlayAgain": function() {},//when button "play again" pressed
    "onHelp": function() {},//when button "help" pressed

    "changeGameType": function(gameType) {
        this._gameType = gameType;
        if (this._gameType !== "main_menu") {
            Settings.set(Settings.SELECTED_GAME, this._gameType);
        }
    },

    "changeScope": function(scope) {
        this._gameScope = scope;
        Settings.set(Settings.SELECTED_SCOPE, this._gameScope);
    },

    "startGame": function() {
        console.log("Scope:", this._gameScope, ", game type:", this._gameType);

        // show game
        helpers.showOnlyOneOfDivs("div_game_field_", this._gameType);

        // always take shuffled copy of words
        let w = JSON.parse(JSON.stringify(words[this._gameScope].words));
        w = helpers.shuffle(w);

        Game.stop();
        Game._active = false;
        Game = Games[this._gameType];
        Game.words = w;
        Game.start();
        Game._active = true;
    }
};

