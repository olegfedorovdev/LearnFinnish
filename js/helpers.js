var helpers = {
    "language" : {
        "en": "en-GB",
        "fi": "fi-FI",
        "ru": "ru-RU"
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

    "sayFinnishWordWithFallback": function(audio, word, onPlayed) {
        helpers.clearQueuedWordsToSay();
        this.sayWord(word.fi, this.language.fi, function(played_fi) {
            let playEnNow = true;
            if (!played_fi) {
                var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                //assume iOS has finnish voice
                if (!iOS) {
                    playEnNow = false;
                    audio.src = helpers.getAudioSrc(word);
                    audio.play();
                    audio.onended = function() {
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
            let voice = null;
            window.speechSynthesis.getVoices().forEach(function (v) {
                //console.log(v.lang, ":", v.name);
                if (language === helpers.language.en && v.name === "Google UK English Female") {
                    //prefer this for en in browser
                    voice = v;
                }
                if (language === v.lang && v.name.indexOf("Siri") != -1) {
                    //prefer Siri voice
                    voice = v;
                }
                
                if (v.lang === language && voice === null) {
                    voice = v;
                }
            });
            if (voice === null) {
                return onEnd(false)
            }
            window.speechSynthesis.cancel();
            let msg = new SpeechSynthesisUtterance();
            msg.voice = voice;
            msg.text = word;
            msg.lang = language;
            msg.rate = 0.8;
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

    "playAnimationOnElement__": function(element, duration, baseSrc, imagesCount) {
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
    },

    "registerNewGame": function(gameField, gameID, gameName) {
        console.log("registerNewGame", gameID);
        document.querySelector('#gameFields').appendChild(gameField.cloneNode(true));
        let gamesList = document.querySelector('#select_game_type');
        let option = document.createElement("option");
        option.text = gameName;
        option.value = gameID;
        gamesList.add(option);
    }
};
