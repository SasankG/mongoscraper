const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars")
//var controller = require("./controller/controller");
var PORT = process.env.PORT || 3000;

const app = express();

//use public folder
app.use(express.static(__dirname + "/public"));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//connect to our db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/hmwkdb";

// Connect to the Mongo DB on heroku
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

//setup handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//TODO: get routes from controller folder.
//Using server.js instead of controller
// Requiring our Comment and Article models
var comment = require("./models/comment.js");
var article = require("./models/article.js");

//scraping library
var cheerio = require("cheerio");
var request = require("request");

//populate
app.get("/", function (req, res) {

  article.find({})
    .populate("comment")
    // now, execute our query
    .exec(function (error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Otherwise, send the doc to the browser as a json object
      else {
        console.log("all article with comments: " + doc);
        res.render("index", {
          articles: doc,
          //helpers to limit number of articles shown
          helpers: {
            each_upto: function (ary, max, options) {
              if (!ary || ary.length == 0)
                return options.inverse(this);

              var result = [];
              for (var i = 0; i < max && i < ary.length; ++i)
                result.push(options.fn(ary[i]));
              return result.join('');
            }
          }
        });
      }
    });



});
//send articles to home
app.get("/", function (req, res) {
  article.find({}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      res.json(doc);
    }
  })
})
//scrape 
app.get("/scrape", function (req, res) {
  request("https://www.nytimes.com/section/world", function (error, respons, html) {

    const $ = cheerio.load(html);
    var results = [];
    //for each result/headline
    $(".headline").each(function (i, element) {
      var arTitle = $(element).text();
      var arLink = $(element).children().attr("href");
      results.push({
        title: arTitle,
        link: arLink
      });
      //store info into mongodb scema for article
      article.create(results)
        .then(function (info) {
          console.log(info.title)
          senddb(info);
        })
        .catch(function (err) {
          console.log(err);
        })
    })
  })
  function senddb() {
    article.find({}, function (err, data) {
      if (err) {
        throw err;
      } else {
        res.json(data);
      }
    })
  }
})

//function to send db info



// Listen on the port
app.listen(PORT, function () {
  console.log("Listening on port: " + PORT);
});


//SCRATCH
/*
 article.create({results}, function (err, data) {
        if (data) {
          var entry = new article(results);
          console.log(entry);
          entry.save(function (err, doc) {
            if (err) {
              console.log(err)
            } else {
            // console.log(`saving ${doc.title}`);
            }
          })
        } 
*/