
//remember, call back functions can access allready initialized variables even if they are outside the callbacks scope
module.exports = {
  markLoginStatus: function (req, res, next) {
    req.isLoggedIn = (typeof req.session["email-sess"] !== "undefined");
    next();
  },

};