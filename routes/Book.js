var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const bookModel = require('../models/book');

/* GET book listing. */
router.get('/', function (req, res, next) {
  debugger;
  // bookModel.find({})
  bookModel.find({ deleted: false }).populate('authorId').populate('categoryId')
    .then((booksData) => {
      console.log(booksData);
      res.send(booksData);
    }).catch((err) => {
      next(createError(500, err));
    });
});

//add new book
router.post('/add', function (req, res, next) {
  debugger;
  console.log(req.body);
  bookModel.create(req.body)
    .then((bookData) => {
      res.send(bookData);
    }).catch((err) => {
      next(createError(400, err.message));
    });
});

//get book details
//hnst5dm populate hna
router.get('/:bookId/details', function (req, res, next) {
  // debugger;
  let id = req.params.bookId;
  bookModel.findOne({ _id: id }).populate('authorId').populate('categoryId')
    .then((bookData) => {
      // debugger;
      console.log(bookData);
      res.send(bookData);
    }).catch((err) => {
      next(createError(400, err.message));
    });
});

//edit existing book
router.patch('/:bookId/edit', function (req, res, next) {
  debugger;
  let id = req.params.bookId;
  console.log(req.body);
  bookModel.updateOne({ _id: id },
    {
      $set: {
        title: req.body.title,
        categoryId: req.body.categoryId,
        autherId: req.body.autherId,
        cover: req.body.cover
      }
    })
    .then((bookData) => {
      res.send(bookData);
    }).catch((err) => {
      next(createError(400, err.message));
    });
});

//delete a book
router.patch('/:bookId/delete', function (req, res, next) {
  debugger;
  let id = req.params.bookId;
  // console.log(req.body);
  bookModel.updateOne({ _id: id }, { deleted: true })
    .then((result) => {
      res.send(result);
      // res.redirect('api/books/');
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
// router.get('/:authorID/books', function (req, res, next) {
//   let author = req.params.authorID;
//   console.log(req.body);
//   bookModel.find({ autherId: author })
//     .then((booksData) => {
//       res.send(booksData);
//     }).catch((err) => {
//       next(createError(400, err.message));
//     });
// });

//get by searchkey
router.get('/search', function (req, res, next) {
  let { serachKey } = req.body;
  console.log(req.body);
  bookModel.find({ "authors": { "$regex": serachKey, "$options": "i" } })
    .then((booksData) => {
      res.send(booksData.data);
    }).catch((err) => {
      next(createError(400, err.message));
    });
});

module.exports = router;
