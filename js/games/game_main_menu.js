Games["main_menu"] = {
    _gameType: "main_menu",
    _gameScope: "latest",
    
    "start" : function() {
        console.log("Main menu opened");
    },

    "stop" : function() {
        console.log("Main menu stopped");
    },

    "onPrevious": function() {
    },

    "onNext": function() {
    },

    "changeGameType": function(gameType) {
        this._gameType = gameType;
    },

    "changeScope": function(scope) {
        this._gameScope = scope;
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

