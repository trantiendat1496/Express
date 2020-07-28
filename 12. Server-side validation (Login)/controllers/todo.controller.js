var db = require('../db');
var shortid = require('shortid');


module.exports.index = function(req, res){
	res.render('todos/index',{
		todos: db.get('todos').value()
	});
};

module.exports.search = function(req, res){
	var q = req.query.q;
	
	const todos = db.get('todos').value();
	
	var matchedTodos = todos.filter(function(todos){
		return todos.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
	});
	
	res.render('todos/index', {
		todos: matchedTodos
	});
};

module.exports.create = function(req, res){
	res.render("todos/create");
};

module.exports.get =  function(req, res){
	var id = req.params.id;
 
	db.get('todos').remove({id: id}).write();
	res.redirect("/todos");
};

module.exports.postCreate = function(req, res){
	req.body.id = shortid.generate();
	var errors = [];

	if(!req.body.name){
		errors.push('Name is require.')
	}

	if(!req.body.phone){
		errors.push('Phone is require.')
	}

	if(errors.length){
		res.render('todos/create', {
			errors: errors,
			values: req.body
		});
		return;
	}
	
	db.get('todos').push(req.body).write();
	res.redirect("/todos")
};