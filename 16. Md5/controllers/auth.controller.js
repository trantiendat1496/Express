var db = require('../db');
var bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports.login = function(req, res){
	res.render('auth/login');
};

module.exports.postLogin = async function (req, res){
    var email = req.body.email;
    
    var user = db.get('users').find({ email : email }).value();
    

    if(!user){
        return res.render('auth/login', {
            errors : [
                'User does not exist.'
            ],
            values: req.body
        });
        return;
    }

    if (!user.wrongLoginCount) {
        db.get("users")
          .find({ id: user.id })
          .set("wrongLoginCount", 0)
          .write();
      }
    
      if (user.wrongLoginCount >= 4) {
        res.render("auth/login", {
          errors: ["Your account has been locked."],
          values: req.body
        });
    
        return;
      }
      

      let checkPassword = await bcrypt.compare(req.body.password, user.password)
      if (!checkPassword) {
        db.get("users")
          .find({ id: user.id })
          .assign({ wrongLoginCount: (user.wrongLoginCount += 1) })
          .write();
    
        res.render("auth/login", {
          errors: ["Wrong password."],
          values: req.body
        });
    
        return;
      }

    res.cookie('userId', user.id);

    if(user.isAdmin){
        return res.redirect('/users');
    }
       
    return res.redirect("/customer/"+ user.id); 
};

