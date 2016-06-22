var frontBackground = ["https://unsplash.com/photos/7u6Jmwg2ZQ0/download","https://unsplash.com/photos/h4bBVo_CpqQ/download","https://unsplash.com/photos/F_J14NKUqLQ/download"];
var i=1;
function slideshow(){
    $(".jumbotron.front").css("background-image","url("+frontBackground[i]+")");
    i++;
    if (i >= frontBackground.length) {
        i = 0;
    }
    setTimeout(slideshow,5000);
}
slideshow();