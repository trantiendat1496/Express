var express = require('express');
var app = express();

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
db = low(adapter);


// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: []})
  .write()

  // Add a post
db.get('todos')
.push({ id: 1, title: 'hello'})
.write()

var port = 999;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



app.get('/', function(req, res){
	res.render('index', {
		name: "TRAN TIEN DAT"
	});
});

app.get('/todos', function(req, res){
	res.render('todos/index',{
		todos: db.get('todos').value()
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

app.get('/todos/create', function(req, res){
	res.render("todos/create");
});

app.post("/todos/create", function(req, res){
	db.get('todos').push(req.body).write();
	res.redirect("/todos")
});
app.listen(port, function(){
	console.log('Server listenning on port ' + port);
});