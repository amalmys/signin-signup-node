const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/sign-in', authenticate);
router.post('/sign-up', register);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    console.log(req.body);
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

