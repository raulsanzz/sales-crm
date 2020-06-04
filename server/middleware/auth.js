const jwt = require("jsonwebtoken");
const config = require("../database/config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Un-Authorized, Please logIn to continue" }); //No Token Found
  } else {
    jwt.verify(token, config.secret, (err, decode) => {
      if (err) {
        return res.status(401).json({msg: "An error occurred, Please logIn again"}); //Token is not a valid
      } else {
        req.user = decode;
        next();
      }
    });
  }
};
