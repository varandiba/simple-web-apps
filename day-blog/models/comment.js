var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    name: {id: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, username: String},
    body: String,
    created: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("Comment", commentSchema);