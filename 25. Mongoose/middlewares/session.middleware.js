var shortid = require('shortid');

const Session = require('../models/session.model')

module.exports.session = async (req, res, next) => {
  
  var session;

  if (!req.signedCookies.sessionId) {
    var sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, {
      signed: true
    });
    session = await Session.create({ _id : sessionId, cart : [], totalQuantity: 0, totalPrice: 0});
  } else {
    session = await Session.findOne({_id : req.signedCookies.sessionId})
  }
    
    res.locals.session = session;

  next();

};