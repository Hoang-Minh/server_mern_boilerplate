const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const key = require("../config/key");
const { generateAccessToken } = require("../util/token");

router.get("/", (req, res) => {
  console.log("hello");
  res.send({});
});

module.exports = router;
