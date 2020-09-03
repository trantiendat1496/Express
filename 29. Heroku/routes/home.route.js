var express = require('express');
var router = express.Router();

const Book = require('../models/book.model');


router.get('/', function(req, res){	
	res.render('index');
});

router.get('/about', function(req, res){
	res.render('about');
})

router.get('/coming-soon', function(req, res){
	res.render('coming-soon')
})

router.get('/contact', function(req, res){
	res.render('contact')
})

router.get('/blog', function(req, res){
	res.render('blog')
})

router.get('/author', function(req, res){
	res.render('author')
})

router.get('/top-seller', function(req, res){
	res.render('top-seller')
})

router.get('/books',async function(req, res){
	const books = await Book.find();
	res.render('books',{
		books: books
	});
})

router.get('/books/search', async function(req, res){
	
	const name_search = req.query.name 
	const book = await Book.find({})

	var result = book.filter( (book) => {
		return book.title.toLowerCase().indexOf(name_search.toLowerCase()) !== -1
	})

	res.render('books', {
		books: result
	})
})



module.exports = router;