var express = require('express');
var multer = require('multer');

var controller = require('../controllers/auth.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware')
var router = express.Router();
var upload = multer({ dest: './public/uploads/' });


router.get('/login', controller.login);

router.post('/login', controller.postLogin);

router.get('/register', controller.register);

router.post('/register', upload.single('avatar'),validate.postCreate ,controller.postRegister);


module.exports = router;