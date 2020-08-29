var shortid = require('shortid');

var db = require('../db');

// module.exports = function(req, res, next){
//     if(!req.signedCookies.sessionId) {
//         var sessionId = shortid.generate();
//         res.cookie('sessionId',sessionId , {
//             signed: true
//         });

//         db.get('sessions').push({
//             id: sessionId
//         }).write();
//     }

//     next();
// }

module.exports = (req, res, next) => {
  
  var sessionId = shortid.generate();

  if (!req.signedCookies.sessionId) {
    res.cookie("sessionId", sessionId, {
      signed: true
    });

    db.get("sessions")
      .push({ id: sessionId })
      .write();
  }

  var session = db
    .get("sessions")
    .find({ id: req.signedCookies.sessionId })
    .value();
  // console.log('session:' + session.id)
  var count = 0;

  if (session) {
    for (var book in session.cart) {
      count += session.cart[book];
    }
  }
  
  res.locals.session = session;
  
  res.locals.count = count;

  next();
};