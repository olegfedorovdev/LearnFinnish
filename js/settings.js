var Settings = {
    "get" : function(name, def) {
        let v = localStorage.getItem(name);
        if (v === undefined) {
            return def;
        }
        return v;
    },

    "getNumer" : function(name, def) {
        let v = this.get(name, undefined);
        if (v === undefined) {
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
};
