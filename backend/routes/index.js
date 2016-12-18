var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = "mongodb://localhost:27017/ebblog";
var BlogPost = require('../models/users');
mongoose.connect(mongoUrl);

router.post('/newBlogPost', function(req, res, next) {

	var blogPost = new BlogPost({
		blogPost: req.body.blogPost
	});

	blogPost.save(function(error, blog, documentAdded){
		console.log(error);
		console.log(blog)
	});
	res.json({
		message: "added",
	});
});

// router.get('/', function (req, res) {
// 	console.log('home');
//   	res.redirect('https://expressjs.com/en/guide/routing.html');
// });

// router.get('/about', function (req, res) {
//   res.send('about')
// });

router.get('/', function(req, res, next){
	// var userToken = req.query.token;
	// if(userToken == undefined){
	// 	//No token was supplied
	// 	res.json({failure: "noToken"});
	// }else{
		BlogPost.find(
			function(error, document){
				console.log(document);
				if(document == null){
					res.json({failure: 'badToken'});
				}else{
					res.json({
						blogPost: document
					});
				}

			}
		)
});

router.post('/deleteBlog', function(req, res, next) {
	BlogPost.remove(
		{date: req.body.results.date},
		function(err, numberAffected){
			if(numberAffected.ok == 1){
				res.json({success: "updated"});
			}else{
				res.json({failure: "failedUpdate"});
			};
		}
	);
});

module.exports = router;
