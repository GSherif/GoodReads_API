var express = require('express');
var router = express.Router();
const Admin = require('./../models/admin');
const createError = require('http-errors');
const adminMiddleware = require('./../middlewares/adminAuthorization');

router.post('/', async (req, res, next) => {
    const admin = new Admin(req.body)
    admin
        .save()
        .then(user => res.send(user))
        .catch(err => next(createError(400, err.message)))
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    const currentUser = await Admin.findOne({ username })
    if (!currentUser) return next(createError(401));
    let isMatch = await currentUser.verifyPassword(password);
    if (!isMatch) return next(createError(401));
    const token = await currentUser.generateToken();
    res.send({
        profile: currentUser,
        token
    })
})

router.use(adminMiddleware);

router.get('/:adminId', (req, res, next) => {
    Admin
        .findById(req.params.adminId)
        .then(admin => res.send(admin))
        .catch(err => next(createError(404, err.message)))
})

router.patch('/:adminId', (req, res, next) => {
    Admin
        .findByIdAndUpdate(req.params.adminId, req.body)
        .exec()
        .then(admin => res.send(admin))
        .catch(err => next(createError(400, err.message)))
})

router.delete('/:adminId', (req, res, next) => {
    Admin
        .findByIdAndDelete(req.params.adminId)
        .exec()
        .then(admin => res.send(admin))
        .catch(err => next(createError(400, err.message)))
});

router.get('/', function (req, res, next) {
    Admin
        .find({})
        .exec()
        .then(admins => res.send(admins))
        .catch(err => next.createError(500, err.message))
});

module.exports = router;
