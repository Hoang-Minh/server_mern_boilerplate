const LocalStrategy = require("passport-local");
const User = require("../models/user");

// This is used if want to log in with email and password

// module.exports = (passport) => {
//   passport.use(
//     new LocalStrategy(
//       {
//         usernameField: "email",
//         passwordField: "password",
//         passReqToCallback: false,
//       },
//       async (email, password, done) => {
//         try {
//           console.log("try local email", email);
//           const user = await User.findOne({ email });
//           // we can expand logic here if wants to find username too !!!
//           if (!user) return done(null, false, { message: "User not found" });

//           if (!user.verifyPassword(password)) return done(null, false);

//           return done(null, user);
//         } catch (error) {
//           console.log(error);
//           return done(error, false);
//         }
//       }
//     )
//   );

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        console.log("try look up username", username);
        const user = await User.findOne({ username });
        // we can expand logic here if wants to find username too !!!
        if (!user) return done(null, false, { message: "User not found" });

        if (!user.verifyPassword(password)) return done(null, false);

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error, false);
      }
    })
  );

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
