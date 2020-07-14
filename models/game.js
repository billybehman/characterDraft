var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var GameSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },

    players: {
        type: Array,
        required: true
    },

    characters: {
        type: Array,
        required: true
    },
    
});

var Game = mongoose.model("Game", GameSchema);
module.exports = Game;