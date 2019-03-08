var middlewareObj = {};

var Blog = require("../models/blog"),
    Comments = require("../models/comment");

middlewareObj.IsloggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        req.flash("loginRequire", "You need to login.");
        res.redirect("/login");
    }
}
middlewareObj.AlreadyLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        req.flash("loginError", "You Already Logged In.");
        res.redirect("/");
    } else {
        next();
    }
}

middlewareObj.lowerCaseIt = function(req, res, next) {
    if(req.body.username)
        req.body.username = req.body.username.toLowerCase();

    if(req.body.email)
        req.body.email    = req.body.email.toLowerCase();
    
next();
}

middlewareObj.blogOwner = function (req, res, next) {
    Blog.findById(req.params.id, function(err, fblog){
        if(err) {
            console.log(err);
        } else {
            if(fblog.author.id.equals(req.user.id)){
                next();
            } else {
                res.send("This is not yours get back");
            }
        }
    });
}

middlewareObj.commentOwner = function (req, res, next) {
    Comments.findById(req.params.id, function(err, fcom){
        if(err) {
            console.log(err + "\nCannot find comment");
        } else {
            if(fcom.name.id.equals(req.user.id)) {
                next();
            } else {
                res.redirect("back");
            }
        }
    });
}

module.exports = middlewareObj;