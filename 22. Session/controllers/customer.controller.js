var db = require('../db');

const Book = require('../models/book.model');
const User = require('../models/user.model');

module.exports.index = async function(req, res){
	var id = req.params._id;
	
	var users = await User.findOne({ id: id }).exec();
	var books = await Book.find({})
	
	var transaction = db.get('transactions').value().filter((items)=>{
		return items.userId == users.id;
	});
	
	res.render("customer/index" , {
		users: users, 
		trans : transaction,
		books: books
	});	
};


module.exports.products = function(req, res){
	
	let books = db.get("books").value()
	
	
	res.render("customer/products" , {
		
		books: books
	});	
};