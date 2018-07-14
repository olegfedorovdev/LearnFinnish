var Settings = {
    "get" : function(_name, _def) {
        if (typeof localStorage === 'undefined') {
            return _def;
        }
        let v = localStorage.getItem(_name);
        if (v === null) {
            return _def;
        }
        return v;
    },

    "getNumer" : function(name, def) {
        let v = this.get(name, null);
        if (v === null) {
            return def;
        }
        return Number(v);
    },

    "set" : function(name, value) {
        if (typeof localStorage === 'undefined') {
            return;
        }
        localStorage.setItem(name, value);
    },

    "setNumber" : function(name, value) {
        if (typeof localStorage === 'undefined') {
            return;
        }
        localStorage.setItem(name, value);
    },

    "remove": function(name) {
        if (typeof localStorage === 'undefined') {
            return;
        }
        localStorage.removeItem(name);
    },

    // constants
    GAMES_PLAYED: "games_played",
    SELECTED_GAME: "selected_game",
    SELECTED_SCOPE: "selected_scope",
    SELECTED_VOICE_FI: "selected_voice_fi",
    SELECTED_VOICE_EN: "selected_voice_en",
    SELECTED_VOICE_SPEED: "selected_voice_speed",
    LEARNED_WORDS: "learned_words",
    WRONG_WORDS: "wrong_words",
    WORDS_PER_SESSION: 15
};
