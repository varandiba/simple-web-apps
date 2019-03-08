var express = require("express"),
    router  = express.Router();

var Blog = require("../models/blog");
var middlerware = require("../middleware/index");

router.get("/newblog", middlerware.IsloggedIn, function(req, res){
    res.render("blog/new.ejs");
});

router.post("/newblog", middlerware.IsloggedIn, function(req, res){
    var newblog = {
        author: {id: req.user.id, username: req.user.username },
        title: req.body.blog.title,
        image: req.body.blog.image,
        body : req.body.blog.body
    }
    Blog.create(newblog, function(err, nblog){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

router.get("/blog/:id", function(req, res){
    Blog.findById(req.params.id).populate("comment").exec(function(err, fblog){
        if(err) {
            console.log(err);
        } else {
            res.render("blog/show.ejs", {blog: fblog});
        }
    });
});

router.get("/blog/:id/edit"
            ,middlerware.IsloggedIn
            ,middlerware.blogOwner
            ,function(req, res){
    Blog.findById(req.params.id, function(err, fblog){
        if(err) {
            console.log(err);
        } else {
            res.render("blog/edit.ejs", {blog: fblog});
        }
    });
});

router.put("/blog/:id"
            ,middlerware.IsloggedIn
            ,middlerware.blogOwner
            ,function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, fblog){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/blog/" + req.params.id);
        }
    });
});

router.delete("/blog/:id"
            ,middlerware.IsloggedIn
            ,middlerware.blogOwner
            ,function(req, res){
    Blog.findByIdAndDelete(req.params.id, function(err, fblog){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

module.exports = router;
