// @ts-check


function startGame() {
    let gamesPlayed = Settings.getNumer(Settings.GAMES_PLAYED, 0) + 1;
    Settings.setNumber(Settings.GAMES_PLAYED, gamesPlayed);
    console.log("Games played: ", gamesPlayed);

    let gameField = document.querySelector('#gameFields');
    document.onkeydown = function(e) {helpers.handleKeyDown(e)};
    gameField.addEventListener("touchstart", function(e) {helpers.handleTouchStart(e)}, true);
    gameField.addEventListener("touchmove", function(e) {helpers.handleTouchMove(e)}, true);
    gameField.addEventListener("touchend", function(e) {helpers.handleTouchEnd(e)}, true);
    gameField.addEventListener("touchcancel", function(e) {helpers.handleTouchCancel(e)}, true);

    Games["main_menu"].startGame();
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

