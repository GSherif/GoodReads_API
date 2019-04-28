var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const bookModel = require('../models/book');

/* GET book listing. */
router.get('/', function (req, res, next) {
  bookModel.find({ Deleted: false }).then((booksData) => {
    res.send(booksData);
  }).catch((err) => {
    next(createError(400, err));
  });
});

//add new book
router.post('/add', function (req, res, next) {
  bookModel.create(req.body)
    .then((bookData) => {
      res.send(booksData);
    }).catch((err) => {
      next(createError(400, err.message));
    });
});

//edit existing book
router.patch('/:bookId/edit', function (req, res, next) {
  let id = req.params.bookId;
  console.log(req.body);
  bookModel.findOneAndUpdate({ _id: id },
    {
      title: req.body.title,
      categoryId: req.body.categoryId,
      autherId: req.body.autherId,
      cover: req.body.cover
    })
    .then((bookData) => {
      res.send(booksData);
    }).catch((err) => {
      next(createError(400, err.message));
    });
});

//delete a book
router.delete('/:bookId/delete', function (req, res, next) {
  let id = req.params.bookId;
  console.log(req.body);
  bookModel.deleteOne({ _id: id })
    .then((result) => {
      console.log(result);
    }).catch((err) => {
      next(createError(400, err.message));
    });
});

//get books by category id
router.get('/:CatId/books', function (req, res, next) {
  let catId = req.params.CatId;
  console.log(req.body);
  bookModel.find({ categoryId: catId })
    .then((booksData) => {
      res.send(booksData);
    }).catch((err) => {
      next(createError(400, err.message));
    });
});

//get books by author id
router.get('/:authorID/books', function (req, res, next) {
  let author = req.params.authorID;
  console.log(req.body);
  bookModel.find({ autherId: author })
    .then((booksData) => {
      res.send(booksData);
    }).catch((err) => {
      next(createError(400, err.message));
    });
});
module.exports = router;