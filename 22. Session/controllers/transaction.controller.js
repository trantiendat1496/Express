
const shortid = require("shortid");

const db = require('../db.js');

// get all transactions
module.exports.index = function(req, res) {
  // const users = db.get('users').value();
  // const books = db.get('books').value();
  // const transactions = db.get('transactions').value();

  // const renderTransactions = transactions.map((v, i) => {
  //   const book = books.find((book) => book.id === v.bookId);
  //   const user = users.find((user) => user.id === v.userId);
  //   return {
  //     id: v.id,
  //     userName: user.name,
  //     bookName: book.name,
  //     isComplete: v.isComplete,
      
  //   };
  // })

  // res.render('transactions/index', {
  //   transactions: renderTransactions,
    
  // });
  const transactions = db.get('transactions').value();
    res.render('transactions/index', {
        transactions: transactions
    });
};



// add new transaction
module.exports.getCreate = function  (req, res){
  const users = db.get('users').value();
  const books = db.get('books').value();
  res.render('transactions/create', {
    users,
    books
  });
};

module.exports.postCreate = function(req, res){
  const {userId, bookId} = req.body;
  db.get('transactions').push({
    ...req.body,
    id: shortid.generate(),
    userName: db.get('users').find({id: userId}).value().name,
    bookName: db.get('books').find({id: bookId}).value().name,
    bookImage: db.get('books').find({id: bookId}).value().image,
    bookIDescription: db.get('books').find({id: bookId}).value().description,
    bookPrice: db.get('books').find({id: bookId}).value().price
  })
  .write();
  res.redirect('/transactions');
};

module.exports.updateComplete=function (req, res) {
    let id = req.params.id;
    const errs = [];
    if (
        !db
        .get("transactions")
        .find({ id: id })
        .value()
    ) {
        res.redirect("/transactions");
    } else {
        db.get("transactions")
        .find({ id: id })
        .assign({ isComplete: true})
        .write();
        res.redirect("/transactions");
    }
};


module.exports.delete =  function(req, res){
	var id = req.params.id;
 
	db.get('transactions').remove({id}).write();
	res.redirect("/transactions"); 

};


module.exports.addToTrans = (req, res) => {
  
  var sessionId = req.params.sessionId;
  
  var session = res.locals.session;
  
  
  
  if(sessionId === session.id){
    
    for(var book in session.cart){
      
      for(var i = 0; i < session.cart[book]; i++){
        db.get('transactions').push({
          id: shortid.generate(),
          userId: req.signedCookies.userId,
          bookId: book
        }).write();
      };
      
    };
    
    db.get('sessions').find({id: sessionId}).assign( {cart: {} }).write();
    
    res.redirect('/transactions');
  }
};


