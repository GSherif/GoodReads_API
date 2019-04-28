const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cors = require('cors');
const logger = require('morgan');
require('./db');
const cors = require('cors');

const app = express();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authorsRouter = require('./routes/authors');


const app = express();


const BookRouter = require('./routes/Book');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/authors', authorsRouter);


app.use('/api/books', BookRouter);

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
    res.render('error');
});

module.exports = app;
