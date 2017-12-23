// @ts-check


function startGame() {
    let gamesPlayed = Settings.getNumer(Settings.GAMES_PLAYED, 0) + 1;
    Settings.setNumber(Settings.GAMES_PLAYED, gamesPlayed);
    console.log("Games played: ", gamesPlayed);

    changeScope("latest");
    changeGameType("main_menu");

    let gameField = document.querySelector('#gameFields');
    document.onkeydown = function(e) {helpers.handleKeyDown(e)};
    gameField.addEventListener("touchstart", function(e) {helpers.handleTouchStart(e)}, true);
    gameField.addEventListener("touchmove", function(e) {helpers.handleTouchMove(e)}, true);
    gameField.addEventListener("touchend", function(e) {helpers.handleTouchEnd(e)}, true);
    gameField.addEventListener("touchcancel", function(e) {helpers.handleTouchCancel(e)}, true);
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
