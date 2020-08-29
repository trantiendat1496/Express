var db = require('../db');


module.exports.index = function(req, res){
    const sessionId = req.signedCookies.sessionId;
    // const carts = db.get('sessions').find({id : sessionId}).value();
    // const books =  db.get('books').find({id: carts.cart}).value();
    const userId = req.signedCookies.userId;

    const trans = db.get('transactions').filter({userId : userId}).value();
    // const users = db.get('users').value();
    const books = db.get('books').value()
        res.render('cart', {
            // carts: carts,
            books: books,
            // users: users,
            trans: trans
        });

    
}

    



module.exports.addToCart = function(req, res){
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if(!sessionId){
        res.redirect('/');
        return;
    }

    var count = db
        .get('sessions')
        .find({id : sessionId})
        .get('cart.' + productId, 0)
        .value();

    db.get('sessions')
      .find({id: sessionId})
      .set('cart.' + productId, count + 1)
      .write();

    res.redirect('/');  
}