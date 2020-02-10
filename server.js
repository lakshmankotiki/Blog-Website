const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//using some lodash functions in our application
var _ = require('lodash');

const app = express();


//some lorem ipsum content
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hello there. This is Lakshman'\n" + 
" I'm from Banglore, now doing job as a software engineer in one of the tech startup" + 
" now am planning to prepare for the DS & Algorithms" + 
" So that will get job in Big 4 companies"  + 
" and I like to move to abroad"
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//home route
app.get('/', function(req, res) {
    res.render('home', {
        home: homeStartingContent,
        posts: posts
    });
});

app.get('/about', function(req, res) {
    res.render('about', { about: aboutContent });
});

app.get('/contact', function(req, res) {
    res.render('contact', { contact: contactContent });
});

app.get('/compose', function(req, res) {
    res.render('compose');
});

app.post('/compose', function(req, res) {
    const postData = {
        postTitle: req.body.postTitle,
        postDescription: req.body.postDescription
    };
    posts.push(postData);
    res.redirect('/');
});

//posts route using route parameters
app.get('/posts/:postName', function(req, res) {
    const requestedTitle = req.params.postName;

    //converting title to lowercase usgn lodash method to check text is same or not
    const updatedTitle = _.lowerCase(requestedTitle);
    posts.forEach(function(item) {
        const testTitle = _.lowerCase(item.postTitle);
        //checking requested post is existed or not in our server
        if (testTitle === updatedTitle) {
            res.render('post', {
                postName: item.postTitle,
                postData: item.postDescription
            });
        }
    });

});

//example route to check route parameters
// app.get('/flights/:from-:to', function(req, res) {
//     console.log(req.params)
//     res.send("checking request params")
// })

app.listen(3000, function() {
    console.log("Server started on port 3000");
});