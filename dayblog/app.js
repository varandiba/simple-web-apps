var express         = require("express"),
    app             = express(),
    passport        = require("passport"),
    mongoose        = require("mongoose"),
    bodyparser      = require("body-parser"),
    flash           = require("connect-flash"),
    localstratagy   = require("passport-local"),
    sessions        = require("express-session"),
    methodOverride  = require("method-override");

var index           = require("./routes/index"),
    blog            = require("./routes/blog"),
    comment         = require("./routes/comment"),
    User            = require("./models/user");

mongoose.connect("mongodb://localhost/dayblog", {useNewUrlParser: true});

app.use(bodyparser.urlencoded({extended: true}));
app.use(flash());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(sessions({secret: "This is very secret", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser  = req.user;
    res.locals.loginError   = req.flash("loginError");
    res.locals.loginRequire = req.flash("loginRequire");
    res.locals.regitryError = req.flash("regitryError");
    res.locals.blogError    = req.flash("blogError");

    res.locals.loginSuccess    = req.flash("loginSuccess");
    res.locals.logoutSuccess   = req.flash("logoutSuccess");
    res.locals.registrySuccess = req.flash("registrySuccess");
    res.locals.blogSuccess     = req.flash("blogSuccess");

    res.locals.blogWar      = req.flash("warning")
    next();
});

passport.use(new localstratagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(index);
app.use(blog);
app.use(comment);

app.listen(3000, function(){
    console.log(`Server has been started`);
});