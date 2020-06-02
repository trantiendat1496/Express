var express = require('express');
var app = express();

var port = 999;

app.set('view engine', 'pug');
app.set('views', './views');

var todos= [
	{id: 1, name: 'Đi chợ'},
	{id: 2, name: 'Nấu cơm'},
	{id: 3, name: 'Rửa bát'},
	{id: 4, name: 'Học Coder.Tokyo'}
];

app.get('/', function(req, res){
	res.render('index', {
		name: "TRAN TIEN DAT"
	});
});

app.get('/todos', function(req, res){
	res.render('todos/index',{
		todos: todos
	});
});

app.get('/todos/search', function(req, res){
	var q = req.query.q;
	var matchedTodos = todos.filter(function(todos){
		return todos.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
	});

	res.render('todos/index', {
		todos: matchedTodos
	});
});

app.listen(port, function(){
	console.log('Server listenning on port ' + port);
});