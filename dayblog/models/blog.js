var mongoose = require("mongoose");

var blogSchema = mongoose.Schema({
    title: String,
    created: {type: Date, default: Date.now()},
    image: String,
    body: String,
    author: { id: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, username: String},
    comment: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
});

module.exports = mongoose.model("Blog", blogSchema);