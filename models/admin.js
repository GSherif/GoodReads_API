const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const Schema = mongoose.Schema;

const signPromise = util.promisify(jwt.sign);
const verifyToken = util.promisify(jwt.verify);
const secretKey = process.env.JWT_SECRET || 'dfjekfhejhrkjherk';
const saltRounds = process.env.SALT_ROUNDS || 7;

const adminSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
        lowercase: true,
        default: 'admin'
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        hidden: true

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

adminSchema.method('verifyPassword', function (password) {
    const currentUser = this;
    return bcrypt.compare(password, currentUser.password);
})

adminSchema.static('verifyToken', async function (token) {
    const userModel = this;
    const decoded = await verifyToken(token, secretKey);
    const userId = decoded._id;
    return userModel.findById(userId);
})

adminSchema.method('generateToken', function () {
    const currentUser = this;
    return signPromise({ _id: currentUser._id }, secretKey, { expiresIn: '2h' })
})

adminSchema.pre('save', async function () {
    const currentUser = this;
    debugger;
    if (currentUser.isNew) {
        currentUser.password = await hashPassword(currentUser.password);
    }
});

const adminModel = mongoose.model('Admin', userSchema);

module.exports = adminModel;
