const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cors = require('cors');
const logger = require('morgan');
require('./db');
<<<<<<< HEAD
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authersRouter = require('./routes/authers');


const app = express();

=======
const app = express();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const BookRouter = require('./routes/Book');

>>>>>>> dd3f4b30bb03305f0d329559a1f3cc5bcc1b3319
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
<<<<<<< HEAD
app.use('/api/authers', authersRouter);

=======
app.use('/api/books', BookRouter);
>>>>>>> dd3f4b30bb03305f0d329559a1f3cc5bcc1b3319

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
