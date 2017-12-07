
function startGame() {
    
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
    selectOneOfButonsWithPrefix("btn_scope", scope);
}

function changeGameType(gameType) {
    selectOneOfButonsWithPrefix("btn_game_type", gameType);
}