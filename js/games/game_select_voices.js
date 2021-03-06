Games["select_voices"] = {
    _voiceFI: "",
    _voiceEN: "",
    _voiceSpeed: "",
    
    "start" : function() {
        console.log("select_voices opened");

        //remember out which game was selected last
        this._voiceFI = Settings.get(Settings.SELECTED_VOICE_FI, "");
        this._voiceEN = Settings.get(Settings.SELECTED_VOICE_EN, "");
        this._voiceSpeed = Settings.get(Settings.SELECTED_VOICE_SPEED, "0.70");

        this.reloadVoices();

        window.speechSynthesis.onvoiceschanged = function(ev) {
            Games["select_voices"].reloadVoices();
        };

    },

    "stop" : function() {
    },

    "reloadVoices": function() {
        let dropdownFI = document.getElementById("select_voice_fi");
        let dropdownEN = document.getElementById("select_voice_en");
        dropdownFI.options.length = 0;
        dropdownEN.options.length = 0;

        window.speechSynthesis.getVoices().forEach(function (voice) {
            let name = voice.name;
            if (voice.lang === helpers.language.fi) {
                let optionFI = document.createElement('option');
                optionFI.text = name;
                optionFI.value = name;
                dropdownFI.add(optionFI);
            }

            if (voice.lang === helpers.language.en || voice.lang === helpers.language.ru) {
                let optionEN = document.createElement('option');
                optionEN.text = name;
                optionEN.value = name;
                dropdownEN.add(optionEN);
            }
        });
        helpers.selectDropdownValue("select_voice_fi", this._voiceFI);
        helpers.selectDropdownValue("select_voice_en", this._voiceEN);
        helpers.selectDropdownValue("select_voice_speed", this._voiceSpeed);
        helpers.selectDropdownValue("select_words_num", Settings.get(Settings.WORDS_PER_SESSION, 10));        
    },


    "onPrevious": function() {},
    "onNext": function() {},
    "onPlayAgain": function() {},//when button "play again" pressed
    "onHelp": function() {},//when button "help" pressed

    "changeVoiceFI": function(voice) {
        Settings.set(Settings.SELECTED_VOICE_FI, voice);
        this._voiceFI = voice;
        console.log("changeVoiceFI:", voice);
        
    },
    "changeVoiceEN": function(voice) {
        Settings.set(Settings.SELECTED_VOICE_EN, voice);
        this._voiceEN = voice;
        console.log("changeVoiceEN:", voice);
    },

    "changeVoiceSpeed": function(speed) {
        console.log("changeVoiceSpeed:", speed);
        Settings.set(Settings.SELECTED_VOICE_SPEED, speed);
        this._voiceSpeed = speed;
    },

    "changeNumOfWordsPerReview": function(num) {
        console.log("changeNumOfWordsPerReview:", num);
        Settings.set(Settings.WORDS_PER_SESSION, num);
    }
};

