Games["select_voices"] = {
    _voiceFI: "",
    _voiceEN: "",
    _voiceSpeed: "",
    
    "start" : function() {
        console.log("select_voices opened");
        Settings.remove(Settings.SELECTED_VOICE_FI);
        
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
        let dropdownFI = document.querySelector("#select_voice_fi");
        let dropdownEN = document.querySelector("#select_voice_en");
        dropdownFI.options.length = 0;
        dropdownEN.options.length = 0;
        window.speechSynthesis.getVoices().forEach(function (voice) {
            let name = voice.name;
            if (voice.lang === helpers.language.fi) {
                let optionFI = document.createElement('option');
                optionFI.text = name;
                dropdownFI.add(optionFI);
            }

            if (voice.lang === helpers.language.en) {
                let optionEN = document.createElement('option');
                optionEN.text = name;
                dropdownEN.add(optionEN);
            }
        });
        helpers.selectDropdownValue("#select_voice_fi", this._voiceFI);
        helpers.selectDropdownValue("#select_voice_en", this._voiceEN);
        helpers.selectDropdownValue("#select_voice_speed", this._voiceSpeed);
    },


    "onPrevious": function() {},
    "onNext": function() {},
    "onPlayAgain": function() {},//when button "play again" pressed
    "onHelp": function() {},//when button "help" pressed

    "changeVoiceFI": function(voice) {
        Settings.set(Settings.SELECTED_VOICE_FI, voice);
    },
    "changeVoiceEN": function(voice) {
        Settings.set(Settings.SELECTED_VOICE_EN, voice);
    },

    "changeVoiceSpeed": function(speed) {
        Settings.set(Settings.SELECTED_VOICE_SPEED, speed);
    }
};

