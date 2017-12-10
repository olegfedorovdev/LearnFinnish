
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
};

// shuffle array
function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
};

// shuffle array leaving entries still nearby
function shuffle_nearby(array) {
    let counter = array.length;

    while (counter > 0) {
        let rnd = Math.floor(Math.random() * 8);
        counter--;
        
        let idx = counter + 4 - rnd;
        if (idx < 0) {
            idx = 0;
        }
        if (idx >= array.length) {
            idx = array.length - 1;
        }
        
        let temp = array[counter];
        array[counter] = array[idx];
        array[idx] = temp;
    }

    return array;
};


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
    // always take shuffled copy of words
    let w = JSON.parse(JSON.stringify(words[scope].words));
    w = shuffle(w);
    Game.words = w;
    Game.start();
}

function changeGameType(gameType) {
    console.log("Game type: " + gameType);
    selectOneOfButonsWithPrefix("btn_game_type", gameType);
    showOnlyOneOfDivs("div_game_field_", gameType);

    let words = Game.words;
    // always take shuffled copy of words
    let w = JSON.parse(JSON.stringify(words));
    w = shuffle(w);
    Game.stop();
    Game = Games[gameType];
    Game.words = w;
    Game.start();
}

// adds success animation to the center of element and removes it after duration miliseconds
function playSuccessAnimationOnElement(element, duration) {
    playAnimationOnElement(element, duration, "img/animations/smallSucces/", 19);
}

// adds failure animation to the center of element and removes it after duration miliseconds
function playFailureAnimationOnElement(element, duration) {
    playAnimationOnElement(element, duration, "img/animations/smallFailure/", 19);
   
}

function playAnimationOnElement(element, duration, baseSrc, imagesCount) {
    let animationNode = document.createElement("div");
    animationNode.setAttribute("class", "game_animation");

    animationNode.style.width = element.offsetWidth + "px";
    animationNode.style.height = element.offsetHeight + "px";

    element.parentNode.insertBefore(animationNode, element);
    var idx = 1;

    let animationInterval = setInterval(function() {
        animationNode.style.backgroundImage = "url('" + baseSrc + idx + ".png')";
        ++idx;
        if (idx > imagesCount)
            idx = imagesCount;
    }, 50);


    setTimeout(function() {
        animationNode.parentNode.removeChild(animationNode);
        clearInterval(animationInterval);
    }, duration);
}