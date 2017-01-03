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
	});
	res.json({
		message: "added",
	});
});

router.get('/', function(req, res, next){
		BlogPost.find(
			function(error, document){
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
