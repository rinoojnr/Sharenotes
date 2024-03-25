const express = require('express');

const signupController = require('../Controllers/user');


const router = express.Router();

// router.post('/login',);
router.post('/signup',signupController.userSignUp);

module.exports = router;