const bcrypt = require('bcrypt');
const saltRounds = 10;

const Book = require('../models/book.model');
const User = require('../models/user.model');
const Session = require('../models/session.model');


module.exports.index = async function (req, res){
    res.render('admin', {
        users: await User.find({})
    });
}

       
module.exports.createUser = async function (req, res, next) {
    try {
        var user = new User();

        user.name= req.body.name;
        user.phone= req.body.phone;
        user.email= req.body.email;
        user.password= await bcrypt.hash(req.body.password, saltRounds);
        if (req.file) {
            user.avatar= req.file.path.split('\\').slice(1).join('/')
        }
        user.save();
        res.redirect('/admin/listUser');
    } catch (e) {
        next(e);
    }
         
};


module.exports.listUser = async function(req, res){
    const users = await User.find({});
    res.render('admin/listUser', {
        users: users
    })
}


module.exports.deleteUser = async function (req, res) {
    const id = req.params.id;
    await User.remove({ _id:id });
    res.redirect('/admin/listUser')
}



module.exports.updateUser = async function(req, res) {
    const id = req.params.id;
    const users = await User.findOne({ _id: id }).exec();
    const user = JSON.parse(JSON.stringify(users))

    res.render('admin/updateUser',{
        user: user
    })  

}


module.exports.postUpdate = async function(req, res) {
    const id = req.params.id;
    console.log(id, req.body)

    await User.updateOne({_id: id}, { 
        $set: { 
            name: req.body.name, 
            phone: req.body.phone,
            avatar: req.body.avatar
        
     }})

    res.redirect('/admin/listUser')

}



// --------------------Book-----------------     
module.exports.postCreateBook = async function (req, res, next) {
    try {
        var book = new Book();

        book.title= req.body.title;
        book.author= req.body.author;
        book.description= req.body.description;
        book.price= req.body.price

        if (req.file) {
            book.image= await req.file.path.split('\\').slice(1).join('/')
        }
    
        book.save();

        res.redirect('/admin/listBook');

    } catch (e) {
        next(e);
    }
         
};


module.exports.listBook = async function(req, res){
    const books = await Book.find({});
    res.render('admin/listBook', {
        books: books
    })
}


module.exports.updateBook = async function(req, res) {
    const id = req.params.id;
    const books = await Book.findOne({ _id: id }).exec();
    const book = JSON.parse(JSON.stringify(books))

    res.render('admin/updateBook',{
        book: book
    })  

}


module.exports.postUpdateBook = async function(req, res) {
    const id = req.params.id;

    await Book.updateOne({_id: id}, { 
        $set: { 
            title: req.body.title, 
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        }
    })
    res.redirect('/admin/listBook')

}


module.exports.deleteBook = async function (req, res) {
    const id = req.params.id;
    await Book.remove({ _id:id });
    res.redirect('/admin/listBook')
}




//--------------------Session-------------------
module.exports.listSession = async function(req, res) {
    
    const users = await User.find({})
    const sessions = await Session.find()
    
    res.render('admin/listSession', {
        sessions: sessions,
        
    })
}
