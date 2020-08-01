var express = require('express');
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();


router.get('/',authMiddleware.requireAuth ,controller.index);

router.get('/cookie', function(req, res, next){
    res.cookie('user-id', 12345);
    res.send('Hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/view/:id', controller.edit);

router.get('/:id', controller.delete);

router.post("/create", validate.postCreate, controller.postCreate);

router.post("/update/:id", controller.postUpdate);

module.exports = router;