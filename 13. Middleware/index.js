var express = require('express');
var bodyPaser = require('body-parser');

var bookRoute = require('./routes/book.route');

var userRoute = require('./routes/user.route');

var transactionRoute = require('./routes/transaction.route');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyPaser.json()) // for parsing application/json
app.use(bodyPaser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('index', {
		name: "TRAN TIEN DAT"
	});
});

app.use('/books', bookRoute);

app.use('/users', userRoute);

app.use('/transactions', transactionRoute);

app.listen(port, function(){
	console.log('Server listenning on port ' + port);
});


