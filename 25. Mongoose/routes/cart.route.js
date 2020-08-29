var express = require('express');

var controller = require('../controllers/cart.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/:productId', controller.addToCart); 

router.get('/:productId/updateQuantity', controller.updateQuantity);

router.get('/:userId/checkout', controller.checkout);

router.get('/:id/delete', controller.deleteCart);


module.exports = router;