const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const userDB = {
  id: 1,
  login: "admin",
  passowrd: "1234"
};

passport.serializeUser(function(user, done) {
  console.log("serialize", user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deSerialize: ", id);
  const user = id === userDB.id && userDB;
  done(null, user);
});

passport.use(
  new LocalStrategy({ usernameField: "login" }, (login, password, done) => {
    if (login === userDB.login && password === userDB.passowrd) {
      return done(null, userDB);
    } else {
      return done(null, false);
    }
  })
);
