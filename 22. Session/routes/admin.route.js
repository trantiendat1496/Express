const express = require('express');
var multer = require('multer');


var controller = require('../controllers/admin.controller');

var router = express.Router();

var upload = multer({ dest: './public/uploads/' });


router.get('/', controller.index);

router.post('/', upload.single('avatar'), controller.create);

module.exports = router;