require('dotenv').config();

var express = require('express');
var bodyPaser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

var  mongoose = require('mongoose');
mongoose.connect(process.env.MONGOOSE_URL);


var authRoute = require('./routes/auth.route');
var cartRoute = require('./routes/cart.route');
var adminRoute = require('./routes/admin.route');
var homeRoute = require('./routes/home.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = 30;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyPaser.json()) // for parsing application/json
app.use(bodyPaser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(sessionMiddleware.session);

const api_key = process.env.SENDGRID_API_KEY;


app.use(express.static(path.join(__dirname, '/public')));
app.use('/admin', express.static(path.join(__dirname, '/public')));
app.use('/auth', express.static(path.join(__dirname, '/public')));
app.use('/books/search', express.static(path.join(__dirname, '/public')));
app.use('/admin/updateUser', express.static(path.join(__dirname, '/public')));
app.use('/admin/updateBook', express.static(path.join(__dirname, '/public')));



app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);
app.use('/admin',authMiddleware.requireAuth, adminRoute);


app.listen(port, function(){
	console.log('Server listenning on port ' + port);
});


