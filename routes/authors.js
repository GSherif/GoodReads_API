var express = require('express');
var router = express.Router();
var createError = require('http-errors')
const Author = require('./../models/author');
const Book = require('./../models/book');

const adminMiddleware = require('./../middlewares/adminAuthorization');

router.use(adminMiddleware);
///////////////add
router.post("/add", (req, res, next) => {
	Author
		.create(req.body)
		.then(author => {
			res.send(author)
		})
		.catch(err => {
			next(createError(400, err.message));
		})
})
//////////////edit
router.patch("/:id/edit", (req, res, next) => {

	Author.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.exec()
		.then(author => {
			res.send(author);
		})
		.catch(err => {
			next(createError(400, err.message));
		})
})
////////////////delete
router.patch("/:id/delete", (req, res, next) => {
	Author.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true })
		.exec()
		.then(author => {
			res.send(author);
		})
		.catch(err => {
			next(createError(400, err.message));
		})
})
/////////////get all
router.get("/", async (req, res, next) => {
	try {
		const authors = await Author.find({ deleted: false });
		res.send(authors);
	}
	catch (err) {
		next(createError(500, err.message))
	}
})
/////////////getone

router.get("/:id", async (req, res, next) => {
	try {
		const author = await Author.findOne({ _id: req.params.id }).populate('books');
		// .populate('books')
		res.send(author);
		;
	}
	catch (err) {
		next(createError(500, err.message))
	}
})
/////get authors books
router.get("/:id/books", async (req, res, next) => {
	try {
		const id = req.params.id
		// router.get(async (req, res, next) => {
		const books = await Book.find({ authorId: id })
		// const books = await Author.find({ authorId: id })
		debugger
		res.send(books);

		res.send(author);
		;
	}
	catch (err) {
		next(createError(500, err.message))
	}
})
module.exports = router;