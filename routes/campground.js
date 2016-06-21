var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"),
    Campground = require("../models/campground");
    
//campground routes
//index
router.get("/",function(req, res){
    //get all campgrounds from db
   Campground.find({},function (err, allCampgrounds) {
       if(err){
           console.log("Error in db");
       }else{
           res.render("campgrounds/index",{ campgrounds : allCampgrounds}); 
       }
   });
});

//new
router.get("/new",middleware.isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});

//create
router.post("/",middleware.isLoggedIn,function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username : req.user.username
    };
    var newCampground = { name: name, image: image, description: description, author: author};
    //create new campground and save to db
    Campground.create(newCampground,function(err, newlyCreated){
        if(err){
            console.log("error in user data");
        } else{
            req.flash("success","Campground Added!");
            res.redirect("/campgrounds");
        }
    });
});

//show
router.get("/:id",function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("error somewhere");
        }else{
            res.render("campgrounds/show",{ campground : foundCampground});     
        }
    });
});

//edit

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findById( req.params.id, function(err,foundCampground){
            res.render("campgrounds/edit",{campground: foundCampground});
    });
});

//update

router.put("/:id",middleware.checkCampgroundOwnership,function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            req.flash("success","Campground Updated!");
            res.redirect("/campgrounds/"+ req.params.id);            
        }
    });
});

//delete

router.delete("/:id",middleware.checkCampgroundOwnership,function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error","Something went wrong!");
            res.redirect("/campgrounds");
        }
        req.flash("success","Campground Deleted!");
        res.redirect("/campgrounds");
   });
});


module.exports = router;