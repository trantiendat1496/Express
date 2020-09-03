const Book = require('../models/book.model');
const User = require('../models/user.model');

module.exports.requireAuth = async function (req, res, next){
    if(!req.signedCookies.userId){ 
        res.redirect('/');
        return;
    }

    var userId = req.signedCookies.userId;
    var users = await User.findOne({ _id: userId }).exec();
    var user = JSON.parse(JSON.stringify(users))

    if(!user){
        res.redirect('/');
        return;
    }


    if(!user.isAdmin){
        res.redirect('/');
        return;
    }

    next();
}

