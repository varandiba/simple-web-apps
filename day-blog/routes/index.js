var express  = require("express"),
    passport = require("passport"),
    router   = express.Router();

var User     = require("../models/user"),
    Blog     = require("../models/blog"),
    middleware = require("../middleware/index");


//==================== Blog list ====================
router.get("/", function(req, res) {
    var perPage = 3;
    var page = req.params.page || 1;
    Blog
        .find({})
        .sort({_id: -1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, fblog){
            Blog
                .countDocuments().exec(function(err, count){
                    if(err) {
                        console.log(err)
                    } else {
                        res.render("index.ejs", {
                            blogs: fblog,
                            currentUser: req.user,
                            current: page,
                            pages: Math.ceil(count / perPage)});
                    }
            });
        });
});
router.get("/page/:page", function(req, res) {
    var perPage = 3;
    var page = req.params.page || 1;
    Blog
        .find({})
        .sort({_id: -1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, fblog){
            Blog
                .countDocuments().exec(function(err, count){
                    if(err) {
                        console.log(err)
                    } else {
                        res.render("index.ejs", {
                            blogs: fblog,
                            currentUser: req.user,
                            current: page,
                            pages: Math.ceil(count / perPage)});
                    }
            });
        });
});


//==================== Register New User ====================
router.get("/singup", middleware.AlreadyLoggedIn, function(req, res){
    res.render("singup.ejs");
});
router.post("/singup"
                ,middleware.AlreadyLoggedIn
                ,middleware.lowerCaseIt
                ,function(req, res){    
    var nUsername = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email
    });

    if(req.body.password !== req.body.repassword){
        req.flash("regitryError", "Passwords dont math");
        return res.redirect("back");
    }

    User.register(nUsername, req.body.password, function(err, nuser){
        if(err) {
            console.log(err + `\nNew user doesnt created!`);
            res.redirect("back");
        } else {
            passport.authenticate("local")(req, res, function(){res.redirect("/");});
        }
    });
});

//==================== Login ====================
router.get("/login", middleware.AlreadyLoggedIn, function(req, res){
    res.render("login.ejs");
});
router.post("/login"
                ,middleware.AlreadyLoggedIn 
                ,middleware.lowerCaseIt
                ,passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res){});

//==================== Logout ====================
router.get("/logout", middleware.IsloggedIn, function(req, res){
    req.logOut();
    req.flash("logoutSuccess", "You have logged Out");
    res.redirect("/");
});

module.exports = router;