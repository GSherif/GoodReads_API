const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/good_reads', {
    autoIndex: true,
    useNewUrlParser: true,
    useCreateIndex: true
});