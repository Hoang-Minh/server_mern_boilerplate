const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../middleware/auth");
const User = require("../models/user");
const { generateAccessToken } = require("../util/token");
const key = require("../config/key");
const router = express.Router();

router.post("/api/users", async (req, res) => {
  console.log("sign up route");

  const { username, email, password } = req.body;
  console.log(username, email, password);

  const user = new User({ username, email, password });
  await user.save();

  // generate token
  console.log("id", user.id);
  const { id } = user;
  const token = generateAccessToken({ id });

  const refreshToken = jwt.sign({ id }, key.REFRESH_TOKEN_SECRET);

  user.refreshToken = refreshToken;
  await user.save();

  console.log("token", token);
  //send token and user object back
  res.status(200).send({ token, user: { username, email } });
});

// login route
router.post(
  "/api/current_user",
  passport.authenticate("local", {
    session: false,
    failureRedirect: "/signin",
  }),
  function (req, res) {
    console.log("current user", req.user);

    const { id, username, email } = req.user;
    console.log("id", id);

    const token = generateAccessToken({ id });
    const refreshToken = jwt.sign({ id }, key.REFRESH_TOKEN_SECRET);

    // START HERE: Send token and user back. look at above: req.user does it return uername and email too ???? if not, query database
    res.status(200).send({ token, user: { username, email } });
  }
);

router.get("/api/current_user/logout", (req, res) => {
  req.logOut();
  // res.send(req.user);
  res.redirect("/");
});

router.get("/user", authenticateToken, async (req, res) => {
  const user = req.user;
  console.log("user", req.user);

  if (!user) return res.sendStatus(403);
  const { id } = user;
  console.log("id", id);

  try {
    const currentUser = await User.findById(id);
    if (!currentUser) return res.sendStatus(403);
    console.log("found user");
    const { username, email } = currentUser;

    return res.json({ username, email });
  } catch (error) {
    return new Error(error);
  }
});

module.exports = router;
