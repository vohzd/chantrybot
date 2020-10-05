const jwt         = require("jsonwebtoken");
const { secret } = require("../config/jwtSecret.js");

function verifyJWT(token){
  if (token){
    return jwt.verify(token, secret);
  }
}

module.exports = {
  verifyJWT
}
