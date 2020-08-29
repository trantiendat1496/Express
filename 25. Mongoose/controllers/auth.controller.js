const bcrypt = require('bcrypt');
const saltRounds = 10;

const Book = require('../models/book.model');
const User = require('../models/user.model');
const Session = require('../models/session.model');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports.register = function(req, res){
  res.render('auth/register')
}

module.exports.postRegister = async function(req, res, next){
	try {
        var user = new User();

        user.name= req.body.name;
        user.phone= req.body.phone;
        user.email= req.body.email;
        user.password= await bcrypt.hash(req.body.password, saltRounds);
        if (req.file) {
            user.avatar= req.file.path.split('\\').slice(1).join('/')
        }
        user.save();
        res.redirect('back');
    } catch (e) {
        next(e);
    }
}



module.exports.login = function(req, res){
	const userId = req.signedCookies.userId;
	if(!userId){
		res.render('auth/login');
		return;
	}
	res.clearCookie('userId');
	res.render('auth/login'); 
};


module.exports.postLogin = async function (req, res){
    
    var email = req.body.email;   
    var users = await User.findOne({ email: email }).exec();
	var user = JSON.parse(JSON.stringify(users));
	var sessionId = req.signedCookies.sessionId;
	var sessions = await Session.find({_id: sessionId});

    if(!user){
        return res.render('auth/login', {
            errors : [
                'User does not exist.'
            ],
            values: req.body
        });
        return;
	}

    var checkPassword = await bcrypt.compare(req.body.password, user.password)
	if (!checkPassword) {
		res.render("auth/login", {
			errors: ["Wrong password."],
			values: req.body
		});

		return;
	}
	
    res.cookie('userId', user._id, {
      signed : true
	});
	
	Session.findByIdAndUpdate({_id: sessionId}, {
		$set:{
			userId: user._id
		}
	}).exec()

    if(user.isAdmin){      
        return res.redirect('/admin');
    }
	   
	return res.redirect("/"); 
	
};

