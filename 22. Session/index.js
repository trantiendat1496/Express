require('dotenv').config();

var express = require('express');
var bodyPaser = require('body-parser');
var cookieParser = require('cookie-parser');


var  mongoose = require('mongoose');
mongoose.connect(process.env.MONGOOSE_URL);


var bookRoute = require('./routes/book.route');
var userRoute = require('./routes/user.route');
var transactionRoute = require('./routes/transaction.route');
var customerRoute = require('./routes/customer.route');
var authRoute = require('./routes/auth.route');
var cartRoute = require('./routes/cart.route');
var adminRoute = require('./routes/admin.route');


var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = 30;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyPaser.json()) // for parsing application/json
app.use(bodyPaser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(sessionMiddleware);

const api_key = process.env.SENDGRID_API_KEY;


app.use(express.static('public'));



app.get('/', function(req, res){

	const books = db.get('books').value();
	res.render('index', {
		books: books
	});
});


app.use('/books', bookRoute); 

app.use('/users',authMiddleware.requireAuth, userRoute); 

app.use('/transactions',authMiddleware.requireAuth, transactionRoute); 

app.use('/customer', customerRoute); //authMiddleware.requireAuth, authMiddleware.requireAdmin đoạn này có nghĩa là nó phải đăng nhập và nó phải là admin

app.use('/auth', authRoute);

app.use('/cart', cartRoute);

app.use('/admin',authMiddleware.requireAuth, adminRoute);


app.listen(port, function(){
	console.log('Server listenning on port ' + port);
});


