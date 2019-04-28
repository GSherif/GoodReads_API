var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const categoryModel = require('../models/category');

/* GET category listing. */
router.get('/', function (req, res, next) {
    categoryModel.find({ deleted: false })
        .then((result) => {
            console.log(result);
            res.send(result);
        }).catch((err) => {
            next(createError(500, err));
        });
});



module.exports = router;
