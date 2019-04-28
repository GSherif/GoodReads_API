const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new mongoose.Schema({
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
        type: String,
    },
    photourl: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]

});

const authorModel = mongoose.model('Author', authorSchema)

module.exports = authorModel;
