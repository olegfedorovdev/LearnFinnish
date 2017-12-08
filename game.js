
function startGame() {
    changeScope("latest");
    changeGameType("vocabulary");

    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                //left
                Game.onPrevious();
                break;
            case 38:
                //up
                break;
            case 39:
                //right
                Game.onNext();
                break;
            case 40:
                //down
                break;
        }
    };
}

// game interface
var Game = {
    "words": [],
    "start": function() {},
    "stop": function() {},
    "onPrevious": function() {},
    "onNext": function() {}    
};

// all games will be held here. 
var Games = {};

function selectOneOfButonsWithPrefix(prefix, whatToSelect) {
    let btns = document.getElementsByTagName("button");
    for(let i = 0; i < btns.length; i++) {
        if(btns[i].id.indexOf(prefix) == 0) {
            btns[i].style.color = (btns[i].id.indexOf(whatToSelect) !== -1) ? 'red': 'black';
        }
    }
}

function showOnlyOneOfDivs(prefix, whatToSelect) {
    let divs = document.getElementsByTagName("div");
    for(let i = 0; i < divs.length; i++) {
        if(divs[i].id.indexOf(prefix) == 0) {
            divs[i].hidden = (divs[i].id.indexOf(whatToSelect) !== -1) ? false: true;
        }
    }
}

function changeScope(scope) {
    console.log("Scope: " + scope);
    selectOneOfButonsWithPrefix("btn_scope", scope);
    Game.words = (scope == "all")?words.all.words:words.latest.words;
}

function changeGameType(gameType) {
    console.log("Game type: " + gameType);
    selectOneOfButonsWithPrefix("btn_game_type", gameType);
    showOnlyOneOfDivs("div_game_field_", gameType);

    let words = Game.words;
    Game.stop();
    Game = Games[gameType];
    Game.words = words;
    Game.start();
}