var express = require('express');

var controller = require('../controllers/transaction.controller');
var authMiddleware = require('../middlewares/auth.middleware');


var router = express.Router();


router.get('/', controller.index);

router.get('/create', controller.getCreate);

router.post('/create', controller.postCreate);

// update - complete transaction
router.get('/:id/complete', controller.updateComplete);

//delete transaction
router.get('/:id', controller.delete);

module.exports = router;