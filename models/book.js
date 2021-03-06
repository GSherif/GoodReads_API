const mongoose = require('mongoose');
const validator = require('validator');
var integerValidator = require('mongoose-integer');

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20,
		unique: true,
	},
	cover: {
		type: String,
		// required: true,
	},
	categoryId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Category',
		required: true,
	},
	authorId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Author',
		required: true,
	},
	deleted: {
		type: Boolean,
		default: false
	}

});

bookSchema.plugin(integerValidator);

const bookModel = mongoose.model('Book', bookSchema)

module.exports = bookModel;
