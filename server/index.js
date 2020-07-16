const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");
const environment = require("./environment");

const key = require("./config/key");

// const { authenticateToken } = require("./middleware/auth");
// const User = require("./models/user");

require("./config/passport")(passport);

const PORT = process.env.PORT || 5000;

mongoose.connect(key.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(flash());

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.currentUserTest = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use(userRoutes);

if (environment === "production") {
  // Express will serve up production assets
  // like our main.js file or main.css file
  app.use(express.static("client/build"));

  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

db.once("open", () => console.log("Database connected")).on(
  "error",
  () => "Database error"
);

// const posts = [
//   {
//     username: "minh",
//     title: "Post 1",
//   },
//   {
//     username: "Jim",
//     title: "Post 2",
//   },
// ];

// console.log(posts);

// app.get("/posts", authenticateToken, async (req, res) => {
//   console.log(posts);
//   console.log("req.user", req.user);
//   const { id } = req.user;
//   const currentUser = await User.findById(id);

//   console.log("current User", currentUser);

//   res.json(posts.filter((post) => post.username === currentUser.username));
// });

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
