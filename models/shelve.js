const mongoose = require('mongoose');

const shelveSchema = new mongoose.Schema({

	value: {

		type: String,
		required: true,
		enum: ["Read", "CurrentlyReadeing", "WantedToRead", "n/a"],
		default: "n/a",

	},
});


const shelveModel = mongoose.model('Shelve', shelveSchema)

module.exports = shelveModel;
