var express = require('express');
var router = express.Router();
const User = require('./../models/user');
const authMiddleware = require('./../middlewares/authentication');

router.post('/', async (req, res, next) => {
  const user = new User(req.body)
  user
    .save()
    .then(user => res.send(user))
    .catch(err => next(createError(400, err.message)))
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const currentUser = await User.findOne({ username })
  if (!currentUser) return next(createError(401));
  let isMatch = await currentUser.verifyPassword(password);
  if (!isMatch) return next(createError(401));
  const token = await currentUser.generateToken();
  res.send({
    profile: currentUser,
    token
  })
})

router.use(authMiddleware);

router.get('/:userId', (req, res, next) => {
  User
    .findById(req.params.userId)
    .then(user => res.send(user))
    .catch(err => next(createError(404, err.message)))
})

router.patch('/:userId', (req, res, next) => {
  User
    .findByIdAndUpdate(req.params.userId, req.body)
    .exec()
    .then(user => res.send(user))
    .catch(err => next(createError(400, err.message)))
})

router.delete('/:userId', (req, res, next) => {
  User
    .findByIdAndDelete(req.params.userId)
    .exec()
    .then(user => res.send(user))
    .catch(err => next(createError(400, err.message)))
});

router.get('/', function (req, res, next) {
  User
    .find({})
    .exec()
    .then(users => res.send(users))
    .catch(err => next.createError(500, err.message))
});

module.exports = router;
