var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const Auther = require('./../models/auther');

router.post("/add", (req, res, next) => {
	const auther = Auther
		.create(req.body)
		.exec()
		.then(res => {
			res.send(auther)
		})
		.catch(err => {
			next(createError(400, err.message));
		})
})
module.exports = router;