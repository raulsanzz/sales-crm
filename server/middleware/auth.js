const jwt = require("jsonwebtoken");
const config = require("../database/config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  console.log('====================================');
  console.log(req.header("x-auth-token"));
  console.log('====================================');
  if (!token) {
    return res.status(401).json({ msg: "No token,authorization denied" });
  } else {
    jwt.verify(token, config.secret, (err, decode) => {
      if (err) {
        return res.status(401).json({msg: "Token is not a valid"});
      } else {
        req.user = decode;

        next();
      }
    });
  }
};
