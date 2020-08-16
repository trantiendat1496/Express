var express = require('express');

var controller = require('../controllers/book.controller');
var authMiddleware = require('../middlewares/auth.middleware');


var router = express.Router();


router.get('/', controller.index); // ngoài kia đã dùng rồi mà sao vào đây dùng nữa @@ đang loạn lắm r a ạ :(())

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/view/:id', controller.edit);

router.get('/:id', controller.delete);

router.post("/create", controller.postCreate);

router.post("/update/:id", controller.postUpdate);




module.exports = router;