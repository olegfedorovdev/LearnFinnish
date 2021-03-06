var helpers = {
    "language" : {
        "en": "en-GB",
        "fi": "fi-FI",
        "ru": "ru-RU"
    },

    "numOfGuessesToLearnTheWord" : 5,//lets assume 5 times is enough to learn the word

    "setWordAnsweredIncorrectly" : function(word) {
        let wordRecords = JSON.parse(Settings.get(Settings.WRONG_WORDS, "[]"));
        if (wordRecords.includes(word)) {
            return;
        }
        wordRecords.push(word);
        Settings.set(Settings.WRONG_WORDS, JSON.stringify(wordRecords));

        //play the sound
        var audio = new Audio('sounds/system/incorrect.mp3');
        audio.play();
    },

    "setWordAnsweredCorrectly" : function(word) {
        const defaultEmptyWordRecord = {
            "guessed": 0,
            "seenLastTime": 0
        };
        let wordRecords = JSON.parse(Settings.get(Settings.LEARNED_WORDS, "{}"));
        if (!(word in wordRecords)) {
            wordRecords[word] = defaultEmptyWordRecord;
        }
        wordRecords[word].guessed++;
        wordRecords[word].seenLastTime = Date.now();
        Settings.set(Settings.LEARNED_WORDS, JSON.stringify(wordRecords));

        const learned = (wordRecords[word].guessed === helpers.numOfGuessesToLearnTheWord);
        if (learned) {
            //play the sound
            var audio = new Audio('sounds/system/complete.mp3');
            audio.play();
        }
    },

    // true if word already learned
    "isWordLearned" : function(word) {
        let wordRecords = JSON.parse(Settings.get(Settings.LEARNED_WORDS, "{}"));
        if (!(word in wordRecords)) {
            return false;
        }
        return wordRecords[word].guessed > helpers.numOfGuessesToLearnTheWord;
    },

    // true if word is learned long time ago and it's time to repeat it
    "needToRepeatLeanedWord" : function(word) {
        let wordRecords = JSON.parse(Settings.get(Settings.LEARNED_WORDS, "{}"));
        if (!(word in wordRecords)) {
            return false;
        }
        const guesses = wordRecords[word].guessed;
        const hoursToRepeat = 1;
        if (guesses > 2 && guesses <= 5) {
            hoursToRepeat = 6;
        }
        if (guesses > 5 && guesses <= 7) {
            hoursToRepeat = 12;
        }
        if (guesses > 7 && guesses <= 9) {
            hoursToRepeat = 24;
        }
        if (guesses > 9 && guesses <= 12) {
            hoursToRepeat = 48;
        }
        if (guesses > 12) {
            hoursToRepeat = 24*30;//once a month
        }

        return (wordRecords[word].seenLastTime + hoursToRepeat*60*60*1000) > Date.now();
    },

    // gives src for image for word (for instance, word={"fi":"kertoa", "en":"to tell"})
    "getImgSrc": function(word) {
        if (word.img !== undefined)
            return word.img;
        return "img/" + word.fi + ".jpg";
    },

    // gives src for audio for word (for instance, word={"fi":"kertoa", "en":"to tell"})
    "getAudioSrc": function(word) {
        if (word.snd !== undefined)
            return word.snd;
        return "sounds/" + word.fi + ".mp3";
    },

    "updateProgress" : function(currentWord, wordsAmount) {
        let greenLen = currentWord*100/wordsAmount;
        let green = document.getElementById('progress_line');
        if (greenLen < 1) {
            greenLen = 1;//1 min
        }
        if (greenLen > 100) {
            greenLen = 100;
        }
        green.style.width = greenLen + "%";
        // time to return to main menu when all words were seen
        if (currentWord >= wordsAmount) {
            setTimeout(function() {showMainMenu()}, 1000);
            return true;
        }
        return false;
    },

    // shuffle array
    "shuffle" : function(array) {
        let counter = array.length;

        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;

            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    },

    // shuffle array leaving entries still nearby
    "shuffle_nearby": function (array) {
        let counter = array.length;

        while (counter > 0) {
            let rnd = Math.floor(Math.random() * 10);
            counter--;

            let idx = counter + 5 - rnd;
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
    },

    
    "selectOneOfButonsWithPrefix": function (prefix, whatToSelect) {
        let btns = document.getElementsByTagName("button");
        for (let i = 0; i < btns.length; i++) {
            if (btns[i].id.indexOf(prefix) == 0) {
                btns[i].style.color = (btns[i].id.indexOf(whatToSelect) !== -1) ? 'red' : 'black';
            }
        }
    },

    "showOnlyOneOfDivs": function (prefix, whatToSelect) {
        let divs = document.getElementsByTagName("div");
        for (let i = 0; i < divs.length; i++) {
            if (divs[i].id.indexOf(prefix) == 0) {
                divs[i].hidden = (divs[i].id.indexOf(whatToSelect) !== -1) ? false : true;
            }
        }
    },

    "selectDropdownValue" : function(elementID, value) {
        let dropdown = document.getElementById(elementID);
        for (var i = 0; i < dropdown.length; i++) {
            if (dropdown[i].value == value) {
                dropdown[i].selected = true;
                return true;
            }
        }
        console.log("Cannot select '", value, "' in", elementID);
        return false;
    },

    "sayFinnishWordWithFallback": function(audio, word, onPlayed) {
        helpers.clearQueuedWordsToSay();
        this.sayWord(word.fi, this.language.fi, function(played_fi) {
            let playEnNow = true;
            if (!played_fi) {
                var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                //assume iOS has finnish voice
                if (!iOS) {
                    playEnNow = false;
                    audio.onended = audio.onerror = audio.onabort = null;
                    audio.src = helpers.getAudioSrc(word);
                    audio.play();
                    audio.onended = function() {
                        onPlayed(word);
                    }
                    audio.onerror = function() {
                        onPlayed(word);
                    }
                }
            }
            if (playEnNow) {
                onPlayed(word);
            }
        });
    },

    "clearQueuedWordsToSay" : function() {
        if (helpers.sayEnglishWordTimeout !== undefined) {
            clearTimeout(helpers.sayEnglishWordTimeout);
            helpers.sayEnglishWordTimeout = undefined;
        }
    },

    // say english word and call onEnd when finished. can define timeout in miliseconds
    "sayEnglishWord": function(word, pause, onEnd) {
        helpers.clearQueuedWordsToSay();
        helpers.sayEnglishWordTimeout = setTimeout(function(){
            helpers.sayWord(word, helpers.language.en, onEnd);
        }, pause);
    },

    // says word in defined language. calls onEnd with status (true, false) in the end
    //language: en-EN, fi-FI, ru-RU. if cannot find language - will call onEnd right away with false
    "sayWord": function(word, language, onEnd) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            let voice = null;
            let requiredVoice = (language === helpers.language.en) ? Settings.get(Settings.SELECTED_VOICE_EN):Settings.get(Settings.SELECTED_VOICE_FI);
            let voiceRate = Settings.getNumer(Settings.SELECTED_VOICE_SPEED, 0.7);
            //console.log("requiredVoice:", requiredVoice);
            
            window.speechSynthesis.getVoices().forEach(function (v) {
                if (requiredVoice !== undefined && requiredVoice !== "") {
                    if (v.name === requiredVoice) {
                        voice = v;
                    }
                } else {
                    if (language === helpers.language.en && v.name === "Google UK English Female") {
                        //prefer this for en in browser
                        voice = v;
                    }
                    
                    if (v.lang === language && voice === null) {
                        voice = v;
                    }
                }
            });
            if (voice === null) {
                return onEnd(false)
            }
            //console.log("selected voice:", voice.name);
            
            let msg = new SpeechSynthesisUtterance();
            msg.voice = voice;
            msg.text = word;
            msg.lang = language;
            msg.rate = ((language === helpers.language.fi)?voiceRate:1);
            msg.onerror = function (e) {
                console.log("Error speaking: ", e);
                onEnd(false);
            };
            msg.onend = function (e) {
                onEnd(true);
            };

            window.speechSynthesis.speak(msg);
        } else {
            onEnd(false);
        }
            
    },

    "activateText2Speech": function() {
        if ('speechSynthesis' in window) {
            var msg = new SpeechSynthesisUtterance();
            msg.text = "   ";
            msg.lang = "en-EN";
            window.speechSynthesis.speak(msg);
        }
    },

    
    // adds success animation to the center of element and removes it after duration miliseconds
    "playSuccessAnimationOnElement":function (element, duration) {
        this.playAnimationOnElement(element, duration, "img/animations/smallSucces/", 19);
    },

    // adds failure animation to the center of element and removes it after duration miliseconds
    "playFailureAnimationOnElement": function(element, duration) {
        this.playAnimationOnElement(element, duration, "img/animations/smallFailure/", 19);
    
    },

    "playAnimationOnElement": function(element, duration, baseSrc, imageIndex) {
        let animationNode = document.createElement("div");
        animationNode.setAttribute("class", "game_animation");

        animationNode.style.opacity = 0;
        animationNode.style.width = element.offsetWidth + "px";
        animationNode.style.height = element.offsetHeight + "px";
        animationNode.style.backgroundImage = "url('" + baseSrc + imageIndex + ".png')";

        element.parentNode.insertBefore(animationNode, element);
        var cycle = 0.0, maxCycle = 20.0;

        let animationInterval = setInterval(function() {
            if (++cycle > maxCycle) {
                cycle = maxCycle;
            }
            animationNode.style.opacity = cycle/maxCycle;
        }, 50);


        setTimeout(function() {
            animationNode.parentNode.removeChild(animationNode);
            clearInterval(animationInterval);
        }, duration);
    },

    "registerNewGame": function(gameField, gameID, gameName) {
        //console.log("registerNewGame", gameID);
        let gameFieldDiv = gameField.cloneNode(true);
        gameFieldDiv.hidden = true;
        document.getElementById('gameFields').appendChild(gameFieldDiv);

        if (gameName) {
            let gamesList = document.getElementById('select_game_type');
            let option = document.createElement("option");
            option.text = gameName;
            option.value = gameID;
            gamesList.add(option);
        }

        const isGameMenu = (gameID === "main_menu");
        // in ios pageLoaded is fired before all games are loaded so start game when we are ready
        if (helpers.pageLoaded && isGameMenu) {
            startGame();
        }
    },

    "initOnPageLoad": function() {
        // forward log to log  text area element
        var log = console.log;
        var logLine = 1;
        console.log = function () {
            log.apply(this, Array.prototype.slice.call(arguments));
            let textArea = document.getElementById('debug_log_output');
            if (textArea) {
                let text = (logLine++) + ": ";
                for(arg in arguments) {
                    text += JSON.stringify(arguments[arg]) + " ";
                }
                text += "\n";
                text += textArea.value;
                textArea.value = text;
                
            }
        };

        // ios does not support importing links so use 3rd party to emulate support
        if ('registerElement' in document &&
            'import' in document.createElement('link') &&
            'content' in document.createElement('template')) {
                console.log("Platform supports imports");
        } else {
            console.log("Platform does not support imports - use webcomponents");
            // polyfill the platform!
            var e = document.createElement('script');
            e.src = 'js/webcomponents/webcomponents-lite.js';
            document.body.appendChild(e);
        }
    },
    
    "onPageLoaded": function () {
        console.log("onPageLoaded");
        helpers.pageLoaded = true;
        if (document.getElementById('select_game_type') && document.getElementById('select_game_type').length > 0) {
            startGame();
        }
    },

    "handleKeyDown": function(e) {
        switch (e.keyCode) {
            case 38:
                //for test code, press UP
                window.speechSynthesis.getVoices().forEach(function (voice) {
                    console.log("Name: ", voice.name, ", default: ", voice.default ? voice.default : '');
                });
            break;
            case 37:
                if (Game.onPrevious) Game.onPrevious();//left
                break;
            case 39:
                if (Game.onNext) Game.onNext();//right
                break;
            default:
                if (Game.onKeyPressed) Game.onKeyPressed(e.keyCode);//any key
                
        }
    },

    "touchPointDownX": null,
    "touchPointDownY": null,

    "handleTouchStart": function(e) {
        this.touchPointDownX = e.touches[0].clientX;
        this.touchPointDownY = e.touches[0].clientY;
    },
    "handleTouchMove": function(e) {
        if (this.touchPointDownX && this.touchPointDownY) {
            e.preventDefault();//do not allow to scroll
        }
    },
    "handleTouchCancel": function(e) {
        this.touchPointDownX = null;
        this.touchPointDownY = null;
    },
        
    "handleTouchEnd": function(e) {
        if (!this.touchPointDownX || !this.touchPointDownY) {
            return;
        }

        const xUp = e.changedTouches[event.changedTouches.length-1].clientX;
        const yUp = e.changedTouches[event.changedTouches.length-1].clientY;

        const xDiff = this.touchPointDownX - xUp;
        const yDiff = this.touchPointDownY - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 150) {
            console.log("Swipe with diff: ", Math.abs(xDiff));
            if (xDiff > 0) {
                /* left swipe */
                Game.onNext();
            } else {
                /* right swipe */
                Game.onPrevious();
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
            } else {
                /* down swipe */
            }
        }
        /* reset values */
        this.touchPointDownX = null;
        this.touchPointDownY = null;    
    }
};
