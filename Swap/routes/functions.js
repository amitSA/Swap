
//remember, call back functions can access allready initialized variables even if they are outside the callbacks scope
module.exports = {
  markLoginStatus: function (req, res, next) {
    req.isLoggedIn = false;  
    if (req.session && req.session["email-sess"])
      req.isLoggedIn = true;    
    next();
  },

};