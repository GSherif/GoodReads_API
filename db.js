const mongoose = require('mongoose');
const dbURL = process.env.MONGO_URL || 'mongodb://localhost:27017/good_reads';
mongoose.connect(dbURL, {
    autoIndex: true,
    useNewUrlParser: true,
    useCreateIndex: true
});