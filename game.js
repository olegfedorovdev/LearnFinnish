
function startGame() {
    changeScope("latest");
    changeGameType("vocabulary");
}

function selectOneOfButonsWithPrefix(prefix, whatToSelect) {
    let btns = document.getElementsByTagName("button");
    for(let i = 0; i < btns.length; i++) {
        if(btns[i].id.indexOf(prefix) == 0) {
            btns[i].style.color = (btns[i].id.indexOf(whatToSelect) !== -1) ? 'red': 'black';
        }
    }
}

function changeScope(scope) {
    console.log("Scope: " + scope);
    selectOneOfButonsWithPrefix("btn_scope", scope);
}

function changeGameType(gameType) {
    console.log("Game type: " + gameType);
    selectOneOfButonsWithPrefix("btn_game_type", gameType);
}