var express = require('express');

var controller = require('../controllers/transaction.controller');

var router = express.Router();


router.get('/', controller.index);

router.get('/create', controller.getCreate);

router.post('/create', controller.postCreate);

module.exports = router;