var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

//root
router.get("/",function(req, res){
    res.render("landing");
});


//user routes
//new register
router.get("/register",function(req, res) {
   res.render("register"); 
});

//create register
router.post("/register",function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome to YelpCamp "+ user.username);
                res.redirect("/campgrounds");
            });
        }
    });    
});

//new login
router.get("/login",function(req, res) {
   res.render("login"); 
});

//create login
router.post("/login",passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){});

//logout 
router.get("/logout",function(req, res) {
   req.logout();
   req.flash("success","Successfuly, logged you out.");
   res.redirect("/campgrounds");
});




module.exports = router;