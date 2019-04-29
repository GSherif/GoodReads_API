const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20,
		unique: true,
	},
	books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]

});



module.exports = mongoose.model('Category', categorySchema)

