var express = require('express');
var controller = require('../controllers/customer.controller');

var router = express.Router();


router.get('/:id', controller.index);

router.get('/products', controller.products)

module.exports = router;
