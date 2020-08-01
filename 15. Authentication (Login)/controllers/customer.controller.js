var db = require('../db');
var shortid = require('shortid');


module.exports.index = function(req, res){
	res.render('customer/index',{
		users: db.get('users').value()
	});
	
};