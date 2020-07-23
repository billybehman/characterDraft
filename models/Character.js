var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CharacterSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },

    points: {
        type: Number,
        required: true,
        default: 0
    },

    forPositives: {
        type: Boolean,
        default: true
    },

    owner: {
        type: String,
        required: true,
        default: "unowned"
    },

    image: {
        type: String,
        required: true,
        default: "/images/QM.png"
    }
    
});

var Character = mongoose.model("Character", CharacterSchema);
module.exports = Character;