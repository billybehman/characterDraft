var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CharacterSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },

    points: {
        type: Number,
        required: true
    },

    owner: {
        type: String,
        required: true,
        default: "unowned"
    },
    
});

var Character = mongoose.model("Character", CharacterSchema);
module.exports = Character;