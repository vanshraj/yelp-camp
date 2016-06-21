var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var Data =[
    {
        name:"Red Fire Camp",
        image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description:"The camp performs bonfire and guitar karaoke every night."
    },
    {
        name:"Clear Water Camp",
        image:"https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
        description:"The camp is surrounded by a clear water stream and has many activities to do!.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur"
    },
    {
        name:"White Snow Camp",
        image:"https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
        description:"The camp is situated at pretty large height fully covered with snow.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur"
    },
    {
        name:"Dense Jungle Camp",
        image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
        description:"The camp is place between the dense jungle amid the creepy crawlies, but perfectly safe . Or is it ?Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur"
    }
];

function seedDB(){
  Campground.remove({},function(err){
      if(err){
          console.log(err);
      }else{
      console.log("removed campgrounds");
      Data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("added campground");
                    Comment.create({
                        text:"This place is great",
                        author:"Homer"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("comment created");
                        }
                    });
                }
            });
        });
        }
    });  
}

module.exports = seedDB;