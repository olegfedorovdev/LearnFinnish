var Settings = {
    "get" : function(name, def) {
        let v = localStorage.getItem(name);
        if (v === null) {
            return def;
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
        localStorage.setItem(name, value);
    },

    "setNumber" : function(name, value) {
        localStorage.setItem(name, value);
    },

    "remove": function(name) {
        localStorage.removeItem(name);
    },



    // constants
    "GAMES_PLAYED": "games_played",
    "SELECTED_GAME": "selected_game",
    "SELECTED_SCOPE": "selected_scope",
    "SELECTED_VOICE_FI": "selected_voice_fi",
    "SELECTED_VOICE_EN": "selected_voice_en",
    "SELECTED_VOICE_SPEED": "selected_voice_speed"
};
