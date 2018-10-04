const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var comSchema = new Schema({
    author:{
        type: String
    },
    body:{
        type:String
    }
});

var comment = mongoose.model("comment", comSchema);

module.exports = comment;