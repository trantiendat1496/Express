const express = require('express');
var multer = require('multer');

var controller = require('../controllers/admin.controller');
var validate = require('../validate/user.validate');

var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();

var upload = multer({ dest: './public/uploads/' });


// router.get('/transactions', controller.transactions);
router.get('/listSession', controller.listSession);

router.get('/',controller.index);
router.get('/listUser', controller.listUser);
router.post('/listUser', upload.single('avatar'), controller.createUser);
router.get("/updateUser/:id", controller.updateUser);
router.post("/updateUser/:id", controller.postUpdate)




router.get('/listBook', controller.listBook);
router.post('/listBook', upload.single('image'), controller.postCreateBook);
router.get("/updateBook/:id", controller.updateBook);
router.post("/updateBook/:id", controller.postUpdateBook)
router.get('/:id/book', controller.deleteBook);
router.get('/:id', controller.deleteUser);






module.exports = router;