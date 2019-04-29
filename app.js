const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cors = require('cors');
const logger = require('morgan');
require('./db');

const app = express();

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin')
const usersRouter = require('./routes/users');
const authorsRouter = require('./routes/authors');
const BookRouter = require('./routes/Book');
const CategoryRouter = require('./routes/category');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api/admin', adminRouter);
app.use('/api/users', usersRouter);
app.use('/api/authors', authorsRouter);


app.use('/api/books', BookRouter);
app.use('/api/categories', CategoryRouter);
// app.use('/api/:categoryId', usersRouter);

// not found middleware
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.error(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = app;
