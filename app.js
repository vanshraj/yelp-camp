var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("./models/user"),
    seedDB = require("./seed"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    expressSession = require("express-session");
    
var campgroundRoutes = require("./routes/campground"),
    commentRoutes = require("./routes/comment"),
    indexRoutes = require("./routes/index");
    

//app config
mongoose.connect("mongodb://localhost/yelp_camp");    
app.use( bodyParser.urlencoded({extended:true}) );
app.use( express.static(__dirname + "/public") );
app.set( "view engine","ejs" );
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//passport config
app.use(expressSession({
    secret:"i love webd",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//routes config

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);

//listen
app.listen( process.env.PORT, process.env.IP,function(){
    console.log("Yelp camp server started");
});