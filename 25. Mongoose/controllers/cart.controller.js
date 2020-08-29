const Book = require('../models/book.model');
const User = require('../models/user.model');
const Session = require('../models/session.model');


module.exports.index = async function(req, res){
    const sessionId = req.signedCookies.sessionId;
    const session = await Session.findById(sessionId);

    res.render('cart', {
        session: session
    });
}



module.exports.addToCart = async function(req, res){
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if(!sessionId){
        res.redirect('/');
        return;
    }

    const book = await Book.findById(productId); 
    const session = await Session.findOne({_id : sessionId});
    const cart = (await Session.find({_id: sessionId}))[0].cart;
    
    const productInCartIndex = session.cart.findIndex(function(item) {
        return item.productId === productId;
    });
    
    const productInCart = session.cart[productInCartIndex];
    if (!productInCart) {
        session.cart.push({
            productId: productId,
            quantity: 1,
            title: book.title,
            image: book.image,
            price: book.price,
        });
    } else {
        session.set('cart.' + productInCartIndex + '.quantity', productInCart.quantity + 1);

    }
    session.totalQuantity = caculateTotalQuantity(session.cart);
    session.totalPrice = calculateTotalPrice(session.cart);
    await session.save();

    res.redirect('back');  
}

function caculateTotalQuantity(cart) {
    return cart.reduce(function(totalQuantity, item) {
        return totalQuantity + item.quantity ;
    }, 0);
}

function calculateTotalPrice(cart) {
    return cart.reduce(function(totalPrice, item) {
        return totalPrice + item.quantity * item.price;
    }, 0);
}

module.exports.deleteCart = async function (req, res) {
    const id = req.params.id;
    const sessionId = req.signedCookies.sessionId;
    let session = await Session.findOne({_id : sessionId})

    session = await Session.findByIdAndUpdate(sessionId, {
        $pull: {
            cart: {
                productId : id
            }
        }
    }, { new: true });

    await Session.findByIdAndUpdate(sessionId, {
        $set: {
            totalQuantity: caculateTotalQuantity(session.cart),
            totalPrice :  calculateTotalPrice(session.cart)
        }
    });

    res.redirect('/cart')
}


module.exports.updateQuantity = async function(req,res){
    const sessionId = req.signedCookies.sessionId;
    const productId = req.params.productId;
    const quantity = Number(req.query.quantity);
    let session = await Session.findById(sessionId);
    const productIndex = session.cart.findIndex(function(item) { return item.productId === productId});
    session = await  Session.findByIdAndUpdate(sessionId, {
        ["cart." + productIndex + ".quantity"] : quantity
    }, { new: true });
    await Session.findByIdAndUpdate(sessionId, {
        $set: {
            totalQuantity: caculateTotalQuantity(session.cart),
            totalPrice :  calculateTotalPrice(session.cart)
        }
    });
    res.redirect('back');
}


module.exports.checkout = async function(req, res){
    var userId = req.signedCookies.userId;
    const sessionId = req.signedCookies.sessionId;
    let session = await Session.findById(sessionId);

    if(!userId){
        res.redirect('/auth/login')
    }else{
        session =  await Session.findByIdAndUpdate(sessionId, {$set: { cart : []}}, { new: true } );

        await Session.findByIdAndUpdate(sessionId, {
            $set: {
                totalQuantity: caculateTotalQuantity(session.cart),
                totalPrice :  calculateTotalPrice(session.cart)
            }
        });
            
        return res.redirect('back')
    }

}