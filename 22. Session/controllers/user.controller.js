var db = require('../db');
var shortid = require('shortid');
const bcrypt = require('bcrypt');
const saltRounds = 10;




module.exports.index = function(req, res){
	res.render('users/index',{
		users: db.get('users').value()
	});
	
};

module.exports.search = function(req, res){
	var q = req.query.q;
	
	var users = db.get('users').value();
	
	var matchedUsers = users.filter(function(users){
		return users.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
	});
	
	res.render('users/index', {
		users: matchedUsers
	});
};

module.exports.create = function(req, res){

	console.log(req.cookies);
	res.render("users/create");
};

module.exports.delete =  function(req, res){
	var id = req.params.id;
 
	db.get('users').remove({id: id}).write();
	res.redirect("/users"); 

};


module.exports.edit = function(req, res){
	var id = req.params.id;
	var user = db.get('users').find({id : id}).value();
	res.render("users/view" , {
		user: user
	});	
};

module.exports.postUpdate = function(req, res){
	var id = req.params.id;
	
	db.get('users')
		.find({ id: id })
		.assign({ name: req.body.name, phone: req.body.phone})
		.write()
	res.redirect('/users')
};


module.exports.postCreate = async function(req, res){

	let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

	let newUser={
		id: shortid.generate(),
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		password: hashedPassword, 
		avatar: req.file.path.split('\\').slice(1).join('/')
	}
	
	db.get('users').push(newUser).write();
	res.redirect("/users")
	
};


// var users = db.get('users').value();
// let checkEmail = users.find(user => user.email === req.body.email)
// if(checkEmail){
//   res.render("users/index", {
// 	users: users,
// 	errors: ["User have been already exists"],
// 	values: req.body
//   })
//   return;
// }