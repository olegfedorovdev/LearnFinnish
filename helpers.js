var helpers = {

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

    // say english word and call onEnd when finished
    "sayEnglishWord": function(word, onEnd) {
        if ('speechSynthesis' in window) {
            var msg = new SpeechSynthesisUtterance();
            msg.text = word;
            msg.lang = 'en-EN';
            msg.onerror = function (e) {
                console.log("Error speaking: ", e);
                if (onEnd !== undefined) {
                    onEnd();
                }
            };

            msg.onend = function (e) {
                if (onEnd !== undefined) {
                    onEnd();
                }
            };

            window.speechSynthesis.speak(msg);
        }
            
    },

    //language: en-EN, fi-FI, ru-RU
    "sayWord": function(word, language, onEnd) {
        if ('speechSynthesis' in window) {
            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            var voice = null;
            voices.forEach(function (v) {
                if (v.lang === language) {
                    voice = v;
                }
            });
            msg.voice = voice;
            msg.text = word;
            msg.lang = language;
            msg.onerror = function (e) {
                console.log("Error speaking: ", e);
                if (onEnd !== undefined) {
                    onEnd();
                }
            };
            msg.onend = function (e) {
                if (onEnd !== undefined) {
                    onEnd();
                }
            };

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

    "playAnimationOnElement": function(element, duration, baseSrc, imagesCount) {
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

};
