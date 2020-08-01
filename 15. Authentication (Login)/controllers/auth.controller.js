var db = require('../db');


module.exports.login = function(req, res){
	res.render('auth/login');
};

module.exports.postLogin = function (req, res){
    var email = req.body.email;
    var password = req.body.password;
    
    var user = db.get('users').find({ email : email }).value();
    

    if(!user){
        res.render('auth/login', {
            errors : [
                'User does not exist.'
            ],
            values: req.body
        });
        return;
    }
    else{
        if(user.password !== password){
            res.render('auth/login', {
                errors : [
                    'Wrong password.'
                ],
                values: req.body
            })
        }else{
            // res.cookie("cookies", user.id, {
            //     signed: true
            // });
            if(user.isAdmin){
                res.render('users');
            }else{
                res.render("customer/index");
            }
        }
    }
  
      
    res.cookie('userId', user.id);
    res.redirect('/users');
};