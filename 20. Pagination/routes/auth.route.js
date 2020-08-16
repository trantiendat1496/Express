var express = require('express');

var controller = require('../controllers/auth.controller');

// var validate = require('../validate/user.validate');

var router = express.Router();


router.get('/login', controller.login);

router.post('/login', controller.postLogin);

module.exports = router;