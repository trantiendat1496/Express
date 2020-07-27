var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
db = low(adapter);

db.defaults({ books: [], users: [], transactions: []})
  .write();

module.exports = db;