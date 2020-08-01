var express = require('express');
var controller = require('../controllers/customer.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();


router.get('/',authMiddleware.requireAuth, controller.index);
