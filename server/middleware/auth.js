const key = require("../config/key");
const jwt = require("jsonwebtoken");

module.exports = {
  authenticateToken: async (req, res, next) => {
    console.log("Authenticate Token");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("token", token);

    if (token == null) return res.sendStatus(401);

    try {
      const foundUser = await jwt.verify(token, key.ACCESS_TOKEN_SECRET);

      if (!foundUser) res.sendStatus(403);
      console.log("found user");
      req.user = foundUser;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
