var express = require("express"),
    router  = express.Router();

var Comments = require("../models/comment"),
    Blog     = require("../models/blog"),
    middleware = require("../middleware/index");


router.post("/blog/:id/comment"
                    ,middleware.IsloggedIn
                    ,function(req, res){
    Blog.findById(req.params.id, function(err, fblog){
        if(err) {
            console.log(err);
        } else {
            Comments.create(req.body.comment, function(err, ncomment){
                if(err) {
                    console.log(err);
                } else {
                    ncomment.name.id = req.user.id;
                    ncomment.name.username = req.user.username;
                    ncomment.save();
                    fblog.comment.push(ncomment);
                    fblog.save();
                    res.redirect("back");
                }
            });
        }
    });
});

router.delete("/blog/:id/comment"
                        ,middleware.IsloggedIn
                        ,middleware.commentOwner
                        ,function(req, res){
    Comments.findByIdAndDelete(req.params.id, function(err, fcomment){
        if(err) {
            console.log(err);
        } else {
            res.redirect("back");
        }
    });
});

module.exports = router;