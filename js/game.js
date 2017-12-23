// @ts-check


function startGame() {
    let gamesPlayed = Settings.getNumer(Settings.GAMES_PLAYED, 0) + 1;
    Settings.setNumber(Settings.GAMES_PLAYED, gamesPlayed);
    console.log("Games played: ", gamesPlayed);

    changeScope("latest");
    changeGameType("vocabulary");

    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 38:
                //for test code, press UP
                window.speechSynthesis.getVoices().forEach(function (voice) {
                    console.log("Name: ", voice.name, ", default: ", voice.default ? voice.default : '');
                });
            break;
            case 37:
                Game.onPrevious();//left
                break;
            case 39:
                Game.onNext();//right
                break;
        }
    };
};


// game interface
var Game = {
    "words": [],
    "start": function() {},
    "stop": function() {},
    "onPrevious": function() {},
    "onNext": function() {},
    "_active" : false
};

// all games will be held here. 
var Games = {};


function changeScope(scope) {
    console.log("Scope: " + scope);
    helpers.selectOneOfButonsWithPrefix("btn_scope", scope);
    // always take shuffled copy of words
    let w = JSON.parse(JSON.stringify(words[scope].words));
    w = helpers.shuffle(w);
    Game.words = w;
    Game.start();
}

function changeGameType(gameType) {
    console.log("Game type: " + gameType);
    helpers.selectOneOfButonsWithPrefix("btn_game_type", gameType);
    helpers.showOnlyOneOfDivs("div_game_field_", gameType);

    let words = Game.words;
    // always take shuffled copy of words
    let w = JSON.parse(JSON.stringify(words));
    w = helpers.shuffle(w);
    Game.stop();
    Game._active = false;
    Game = Games[gameType];
    Game.words = w;
    Game.start();
    Game._active = true;
}
