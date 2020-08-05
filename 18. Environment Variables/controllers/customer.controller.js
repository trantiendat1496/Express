var db = require('../db');


module.exports.index = function(req, res){
	var id = req.params.id;
	
	var user = db.get('users').find({id : id}).value();

	
	var transaction = db.get('transactions').value().filter((items)=>{
		return items.userId == user.id;
	});
	
	res.render("customer/index" , {
		users: user, 
		trans : transaction
	});	
};