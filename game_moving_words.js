

function startGame() {
    //myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = document.body.clientWidth - 100;
        this.canvas.height = 850; //document.body.clientHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        setInterval(updateGameArea, 20);
        var canvas = this.canvas;

        function getMousePos(evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }

        this.canvas.addEventListener('mousemove', function(evt) {
            myGame.onMouseMove(getMousePos(evt));
        }, false);
        this.canvas.addEventListener('click', function(evt) {
            myGame.onMouseClick(getMousePos(evt));
        }, false);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

var myGame = {
    frameNumber: 0,
    visibleWords: [],
    score: 0,
    complexity: 1,//1 - easiest, 10 - very hard
    myScore: new WordComponent("0", 300, 30, 0),
    wordToGuess: new WordComponent("0", 10, 30, 0),
    lastGuessResult: new WordComponent("Select the right word", 500, 30, 0),

    debugText: new WordComponent("", 10, 60, 0),

    currentWord: "",
    historyOfUsedWords: [],
    wordsType: words.types[0],
    getVisibleWordFromRect: function(rect) {
        for(let v = 0; v < this.visibleWords.length; ++v) {
            if (this.visibleWords[v].inRect(rect)) {
                return this.visibleWords[v];
            }
        }
        return undefined;
    },
    generateNewVisibleWord: function(visibleWord) {
        let minX = 20, maxX = (myGameArea.canvas.width - minX - 200);
        let minY = 50, maxY = (myGameArea.canvas.height/2 - minY);
        let gravity = 0.001 * this.complexity + Math.random() * 0.001 * this.complexity;
        var x,y;
        do {
            x = Math.floor(minX + Math.random()*maxX);
            y = Math.floor(minY + Math.random()*maxY);
            var rect = {
                "x1": x,
                "y1": y,
                "x2": x + 100,
                "y2": y + 20
            };
        } while (this.getVisibleWordFromRect(rect) !== undefined);

        this.visibleWords.push(new WordComponent(visibleWord?visibleWord:this.getNextVisibleWord(), x, y, gravity))
    },
    updateGame: function() {
        myGameArea.clear();
        this.frameNumber += 1;
        if (this.frameNumber == 1) {
            this.generateNewCurrentWord();
        }

        //generate new word every second
        if ((this.frameNumber % 50) == 49) {
            this.generateNewVisibleWord();
        }

        for (let i = 0; i < this.visibleWords.length; i += 1) {
            let word = this.visibleWords[i];
            word.update();
            word.draw();
            if (word.justHitBottom() && this.wordGuessedCorrectly(word.word)) {
                this.score -= 1;
                this.lastGuessResult.word = "Oops, word just hit bottom";
            }
        }

        this.myScore.x = myGameArea.canvas.width - 200;
        this.myScore.word = "SCORE: " + this.score;
        this.myScore.draw();

        this.wordToGuess.word = "FIND: " + this.currentWord;
        this.wordToGuess.draw();

        this.lastGuessResult.draw();

        if (this.debugText.word !== "") {
            this.debugText.draw();
        }

    },
    getNextVisibleWord: function () {
        let count = words[this.wordsType].length;
        let idx = Math.floor(Math.random()*count);
        return words[this.wordsType][idx].fi;
    },
    wasWordUsedRecently: function(word) {
        return (this.historyOfUsedWords.indexOf(word) !== -1);
    },
    generateNewCurrentWord: function () {
        let count = words[this.wordsType].length;

        var idx;
        do {
            idx = Math.floor(Math.random() * count);
        } while(this.wasWordUsedRecently(words[this.wordsType][idx].en));

        this.currentWord = words[this.wordsType][idx].en;
        this.historyOfUsedWords.push(this.currentWord);
        if (this.historyOfUsedWords.length > 10) {
            this.historyOfUsedWords = this.historyOfUsedWords.slice(1);//keep 10 max
        }

        this.visibleWords = [];
        this.generateNewVisibleWord(words[this.wordsType][idx].fi);
        for(let i = 0; i < 10; ++i) {
            this.generateNewVisibleWord();
        }
    },
    changeWordsType: function(type) {
        this.wordsType = type;
        this.generateNewCurrentWord();
    },
    getVisibleWordFromPos: function(pos) {
        let rect = {
            x1: pos.x,
            y1: pos.y,
            x2: pos.x + 3,
            y2: pos.y + 3
        };
        return this.getVisibleWordFromRect(rect);
    },
    wordGuessedCorrectly: function(word) {
        for(let i = 0; i < words[this.wordsType].length; ++i) {
            if (words[this.wordsType][i].fi == word && words[this.wordsType][i].en  == this.currentWord) {
                return true;
            }
        }
        return false;
    },
    getWordTranslation: function(word) {
        for(let i = 0; i < words[this.wordsType].length; ++i) {
            if (words[this.wordsType][i].fi == word) {
                return words[this.wordsType][i].en;
            }
        }
        return "????????";
    },
    onMouseMove: function(pos) {
        //this.debugText.word = "Mouse pos: x=" + pos.x + ",y=" + pos.y;
        //let item = this.getVisibleWordFromPos(pos);
        //if (item)
            //  this.debugText.word += ". found: " + item.word;
    },
    onMouseClick: function(pos) {
        let item = this.getVisibleWordFromPos(pos);
        if (item) {
            let correct = this.wordGuessedCorrectly(item.word);
            let translation = this.getWordTranslation(item.word);
            if (correct) {
                this.score += 3;
                this.lastGuessResult.word = "Correct! " + item.word + " = " + this.currentWord;
                this.generateNewCurrentWord();
            } else {
                this.score -= 1;
                this.lastGuessResult.word = "Wrong! " + item.word + " = " + translation;
            }
        }
    }
};

function WordComponent(word, x, y, gravity) {
    this.word = word;
    this.x = x;
    this.y = y;
    this.font = "30px Helvetica";
    this.color = "black";
    this.alpha = 1;

    this.speedX = 0;
    this.speedY = 0;
    this.gravity = gravity;
    this.gravitySpeed = 0.001;
    this.height = 20;
    this.width = 100;
    this.updatesCount = 0;
    this.alreadyHitBottomBefore = false;

    this.justHitBottom = function() {
        if (this.alreadyHitBottomBefore) {
            return false;
        }
        if (this.gravitySpeed === 0) {
            this.alreadyHitBottomBefore = true;
        }
        return this.alreadyHitBottomBefore;
    };

    this.draw = function() {
        let ctx = myGameArea.context;
        ctx.font = this.font;
        ctx.color = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fillText(this.word, this.x, this.y);

        let textSize = ctx.measureText(word);
        this.width = textSize.width;
    };
    this.update = function() {
        // appear slowly
        this.updatesCount++;
        if (this.updatesCount < 50) {
            this.alpha = this.updatesCount / 50;
            return;
        } else {
            this.alpha = 1;
        }

        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    };
    this.hitBottom = function() {
        let bottom = myGameArea.canvas.height - this.height;
        if (this.y > bottom) {
            this.y = bottom;
            this.gravitySpeed = 0;
        }
    };
    this.inRect = function(rect) {
        return (rect.x1 < this.x + this.width && rect.x2 > this.x && rect.y1 < this.y  && rect.y2 > this.y - this.height );
    }
}

function updateGameArea() {
    myGame.updateGame();
}

function changeWordsType(type) {
    myGame.changeWordsType(type);
}
