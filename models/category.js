const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20,
		unique: true,
	},

	books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]

});



const categoryModel = mongoose.model('Category', categorySchema)

module.exports = categoryModel;
