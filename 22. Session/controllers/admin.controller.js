

var bcrypt = require('bcrypt');
const saltRounds = 10;


const mongoose = require('mongoose');
const Book = require('../models/book.model');
const User = require('../models/user.model');


module.exports.index = function (req, res){
    res.render('admin');
}

module.exports.create = async function (req, res, next) {
    try {
        var user = new User();
        console.log(req.body)
        

        user.name= req.body.name,
        user.phone= req.body.phone,
        user.email= req.body.email,
        user.password= await bcrypt.hash(req.body.password, saltRounds),
        user.avatar= req.file.path.split('\\').slice(1).join('/')
    
        user.save();
        console.log(user)
        res.redirect('back');

    } catch (e) {
        next(e);
    }
         
};



// function updateRecord(req, res) {
//     User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
//         if (!err) { res.redirect('employee/list'); }
//         else {
//             if (err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);
//                 res.render("/", {
//                     viewTitle: 'Update Employee',
//                     employee: req.body
//                 });
//             }
//             else
//                 console.log('Error during record update : ' + err);
//         }
//     });
// }


// function handleValidationError(err, body) {
//     for (field in err.errors) {
//         switch (err.errors[field].path) {
//             case 'name':
//                 body['fullNameError'] = err.errors[field].message;
//                 break;
//             case 'email':
//                 body['emailError'] = err.errors[field].message;
//                 break;
//             default:
//                 break;
//         }
//     }
// }