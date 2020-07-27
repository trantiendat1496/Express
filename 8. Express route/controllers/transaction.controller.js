
const shortid = require("shortid");

const db = require('../db.js');

// get all transactions

module.exports.index = function(req, res) {
  const users = db.get('users').value();
  const books = db.get('books').value();
  const transactions = db.get('transactions').value();
  const renderTransactions = transactions.map((v, i) => {
    const book = books.find((book) => book.id === v.bookId);
    const user = users.find((user) => user.id === v.userId);
    return {
      id: v.id,
      userName: user.name,
      bookName: book.name,
    };
  })
  res.render('transactions/index', {
    transactions: renderTransactions
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
  db.get('transactions').push({
    ...req.body,
    id: shortid.generate()
  })
  .write();
  res.redirect('/transactions');
};

