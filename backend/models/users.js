var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	blogPost: {type: String, required: true},
	date: Date
});

module.exports = mongoose.model('BlogPost', userSchema);