var mongoose = require("mongoose"),
    passportlocalmongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email:    String,
    created:  {type: Date, default: Date.now()},
    fullname: String
});

userSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("User", userSchema);