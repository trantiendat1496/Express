var express = require('express');
var app = express();

var port = 999;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res){
	res.render('index', {
		name: "TRAN TIEN DAT"
	});
});

app.get('/todos', function(req, res){
	res.render('todos/index',{
		todos: [
			{id: 1, name: 'Đi chợ'},
			{id: 2, name: 'Nấu cơm'},
			{id: 3, name: 'Rửa bát'},
			{id: 4, name: 'Học Coder.Tokyo'}
		]
	});
});

app.listen(port, function(){
	console.log('Server listenning on port ' + port);
});