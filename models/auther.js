const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autherSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 3
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 3
    },
    birthdate: {
        type: Date,
    },
    photourl: {
        type: String,
    },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]

});

const autherModel = mongoose.model('Auther', autherSchema)

module.exports = autherModel;
