var db = require('../db');
var shortid = require('shortid');


module.exports.index = function (req, res) {

	var page = parseInt(req.query.page) || 1;
	var perPage = 6;

	var start = (page - 1) * perPage;
	var end = page * perPage;

	const link = [];
	if (page == 1) {
		for (let index = 1; index <= 3; index++) {
			link.push("http://localhost:3000/books?page=" + index);
		}
	} else {
		for (let index = page - 1; index <= page + 1; index++) {
			link.push("http://localhost:3000/books?page=" + index);
		}
	}


	res.render('books/index', {
		// books: db.get('books').value().slice(start, end)
		books: db.get('books').drop(start).take(perPage).value(),
		links: link
	});

};

module.exports.search = function (req, res) {
	var q = req.query.q;

	var books = db.get('books').value();

	var matchedBooks = books.filter(function (books) {
		return books.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
	});

	res.render('books/index', {
		books: matchedBooks
	});
};

module.exports.create = function (req, res) {
	res.render("books/create");
};

module.exports.delete = function (req, res) {
	var id = req.params.id;

	db.get('books').remove({ id: id }).write();
	res.redirect("/books");

};


module.exports.edit = function (req, res) {
	var id = req.params.id;
	var book = db.get('books').find({ id: id }).value();

	res.render("books/view", {
		book: book
	});
};

module.exports.postUpdate = function (req, res) {
	var id = req.params.id;
	console.log(id);
	console.log(req.body);
	db.get('books')
		.find({ id: id })
		.assign({ name: req.body.name, description: req.body.description })
		.write()
	res.redirect('/books')
};


module.exports.postCreate = function (req, res) {
	req.body.id = shortid.generate();
	var errors = [];

	if (!req.body.name) {
		errors.push('Name is require.')
	}

	if (!req.body.description) {
		errors.push('Description is require.')
	}

	if (errors.length) {
		res.render('books/create', {
			errors: errors,
			values: req.body
		});
		return;
	}

	db.get('books').push(req.body).write();
	res.redirect("/books")

};