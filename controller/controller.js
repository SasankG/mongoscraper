const express = require("express");
//const router = express.Router();
// Requiring our Comment and Article models
var comment = require("../models/comment.js");
var article = require("../models/article.js");
var app = express();
//scraping library
var cheerio = require("cheerio");
var request = require("request");

//populate
app.get("/", function (req, res) {

    article.find({})
        .populate("comments")
        // now, execute our query
        .exec(function (error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send the doc to the browser as a json object
            else {
                console.log("all article with comments: " + doc);
                res.render("index", { articles: doc });
            }
        });



});
//send articles to home
app.get("/",function(req,res){
    article.find({}, function(err,doc){
        if(err){
            console.log(err)
        }else{
            res.json(doc);
        }
    })
})
//scrape 
app.get("/scrape", function (req, res) {
    request("https://www.nytimes.com/section/world", function (error, respons, html) {

        const $ = cheerio.load(html);
        var results = [];
        $(".headline").each(function (i, element) {
            var arTitle = $(element).text();
            var arLink = $(element).children().attr("href");
            results.push({
                title: arTitle,
                link: arLink
            });
            article.findOne({ title: result.arTitle }, function (err, data) {
                if (!data) {
                    var entry = new article(result);
                    entry.save(function (err, doc) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(`saving ${doc.title}`);
                        }
                    })
                } else {
                    console.log(`${doc.title} has already been saved`);
                }
            })
        })
        console.log(results);
    })
})
