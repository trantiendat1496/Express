var express = require('express');
var bodyPaser = require('body-parser');
var cookieParser = require('cookie-parser');

var bookRoute = require('./routes/book.route');
var userRoute = require('./routes/user.route');
var transactionRoute = require('./routes/transaction.route');
var  authRoute = require('./routes/auth.route');

var authMiddleware = require('./middlewares/auth.middleware');
var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyPaser.json()) // for parsing application/json
app.use(bodyPaser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser("secret"));

app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('index', {
		name: "TRAN TIEN DAT"
	});
});

app.use('/books', authMiddleware.requireAuth, bookRoute);

app.use('/users',authMiddleware.requireAuth, userRoute);

app.use('/transactions',authMiddleware.requireAuth, transactionRoute);

app.use('/auth', authRoute);

app.listen(port, function(){
	console.log('Server listenning on port ' + port);
});


