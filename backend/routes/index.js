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

module.exports = router;
