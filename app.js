const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
require("./config.passport");

const app = express();
const port = 3000;

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/");
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "blinchik",
    store: new FileStore(),
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.post("/login", (req, res, next) => {
  passport.authenticate("local", function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send("Укажите правильные данные!!!");
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.redirect("/admin");
    });
  })(req, res, next);
});

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/admin", auth, (req, res) => {
  res.send("Admin page");
});
app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
