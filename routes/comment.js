var express = require("express"),
    router = express.Router({ mergeParams: true}),
    Campground = require("../models/campground"),
    middleware = require("../middleware"),
    Comment = require("../models/comment");
    
//comment routes
//new
router.get("/new",middleware.isLoggedIn,function(req, res) {
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground: foundCampground});
        }
    });
});

//create
router.post("/", middleware.isLoggedIn, function(req,res){
     Campground.findById(req.params.id,function(err, campground){
        if(err){
            req.flash("error","Something went wrong");
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment,function(err,comment){
               if(err){
                   res.redirect("/campgrounds");
               } else{
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   req.flash("success","Comment Added!");
                   res.redirect("/campgrounds/"+req.params.id);
               }
            });
        }
    });
});

//edit

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id,function(err, foundComment) {
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{ campground_id: req.params.id , comment: foundComment});
        }
    });
    
});

//update

router.put("/:comment_id", middleware.checkCommentOwnership ,function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            req.flash("error","Something went wrong!");
            res.redirect("back");
        }else{
            req.flash("success","Comment Updated!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//delete

router.delete("/:comment_id", middleware.checkCommentOwnership ,function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            req.flash("error","Something went wrong");
            res.redirect("back");
        }else{
            req.flash("success","Comment Deleted!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});



module.exports = router;