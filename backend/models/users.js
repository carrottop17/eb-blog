var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	blogPost: {type: String, required: true},
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogPost', userSchema);