var db = require('../db');


module.exports.login = function(req, res){
	res.render('auth/login');
};

module.exports.postLogin = function (req, res){
    var email = req.body.email;
    var password = req.body.password;
    
    var user = db.get('users').find({ email : email }).value();
    // code khó hiểu quá
    

    if(!user){
        return res.render('auth/login', {
            errors : [
                'User does not exist.'
            ],
            values: req.body
        });
        return;
    }

    if(user.password !== password){
        return res.render('auth/login', {
            errors : [
                'Wrong password.'
            ],
            values: req.body
        })
    }

    res.cookie('userId', user.id);

    if(user.isAdmin){
        return res.redirect('/users');
    }
       
    return res.redirect("/customer/"+ user.id); 
};

//giờ mà muốn cho user nào thì nhảy ra tran của user đấy thì set id của nó à a
// chia trang như vậy ko được
// giờ viết 1 cái middleware là requireAdmin giống cái requireAuth kia
// route nào muốn admin nhìn thấy thì cho cái requireAdmin vào phần middleware
// còn cái set cookie cho user thì sao a, cái đó liên quan gì đâu, cái đó để check xem nó đã đăng nhập chưa thôi mà
// có thằng requireAuth check rồi còn gì