var express = require('express');
var router = express.Router();
var createError = require('http-errors')
const Author = require('./../models/author');
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
		const author = await Author.find({ _id: req.params.id, deleted: false })
		// .populate('books')
		res.send(author);
		;
	}
	catch (err) {
		next(createError(500, err.message))
	}
})
module.exports = router;