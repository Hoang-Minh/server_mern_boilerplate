const jwt = require("jsonwebtoken");
const key = require("../config/key");

module.exports = {
  generateAccessToken: (user) => {
    return jwt.sign(user, key.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 15 }); // expires in 15 mins
  },
};