var db = require('../db');
var bcrypt = require('bcrypt');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



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
        const msg = {
          to: user.email,
          from: 'trantiendat1496@gmail.com', // Use the email address or domain you verified above
          subject: 'Sending with Twilio SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        //ES6
        sgMail
          .send(msg)
          .then(() => {
            console.log("send ok ")
          }, error => {
            console.error(error);
        
            if (error.response) {
              console.error(error.response.body)
            }
          });
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

    res.cookie('userId', user.id, {
      signed : true
    });

    if(user.isAdmin){
        return res.redirect('/users');
    }
       
    return res.redirect("/customer/"+ user.id); 
};

