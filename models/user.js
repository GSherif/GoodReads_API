const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const Schema = mongoose.Schema;

const signPromise = util.promisify(jwt.sign);
const verifyToken = util.promisify(jwt.verify);
const secretKey = process.env.JWT_SECRET || 'dfjekfhejhrkjherk';
const saltRounds = process.env.SALT_ROUNDS || 7;

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
        lowercase: true,
        default: 'user'
    },
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
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: true,
        hidden: true

    },
    photo: {
        type: String
    },
    listOfBooks: [{
        bookId: {
            type: Schema.Types.ObjectId, ref: 'Book'
        },
        shelveId: {
            type: Schema.Types.ObjectId, ref: 'Shelve'
        }
    }]
}, {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret.password;
                return ret;
            }
        }
    });

const hashPassword = (password) => bcrypt.hash(password, saltRounds);

userSchema.method('verifyPassword', function (password) {
    const currentUser = this;
    return bcrypt.compare(password, currentUser.password);
})

userSchema.static('verifyToken', async function (token) {
    const userModel = this;
    const decoded = await verifyToken(token, secretKey);
    const userId = decoded._id;
    return userModel.findById(userId);
})

userSchema.method('generateToken', function () {
    const currentUser = this;
    return signPromise({ _id: currentUser._id }, secretKey, { expiresIn: '2h' })
})

userSchema.pre('save', async function () {
    const currentUser = this;
    debugger;
    if (currentUser.isNew) {
        currentUser.password = await hashPassword(currentUser.password);
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
