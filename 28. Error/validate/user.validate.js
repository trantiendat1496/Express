module.exports.postCreate =  function(req, res, next){
    var errors = [];

	if(!req.body.name){
		errors.push('Name is require.')
	}

	if(!req.body.phone){
		errors.push('Phone is require.')
	}
	
	if(req.body.name.length > 30 ){
		errors.push('Name must be less than 30 characters.')
	}
	if(!req.body.email){
		errors.push('Email is require.')
	}
	if(!req.body.password){
		errors.push('Password is require.')
	}

	if(errors.length){
		res.render('auth/register', {
			errors: errors,
			values: req.body
		});
		return;
    }
    next();
};