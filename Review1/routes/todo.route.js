var express = require('express');

var controller = require('../controllers/todo.controller');

var router = express.Router();


router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/view/:id', controller.edit);

router.get('/:id', controller.get);

router.post("/create", controller.postCreate);



module.exports = router;