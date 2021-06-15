var express = require("express");
var router = express.Router();
var producthelper = require("../helperscripts/product");
var userhelper = require("../helperscripts/userhelper");
const session = require("express-session");
const checklogin = (req, res, next) => {
  var logged = req.session.loginstatus;
  if (logged) {
    next();
  } else {
    res.redirect("/login");
  }
};
/* GET home page. */
router.get("/", function (req, res, next) {
  var user = req.session.user;
  producthelper.getproducts().then((laptops) => {
    res.render("users/view-products", { admin: false, laptops, user });
  });
});
router.get("/login", function (req, res, next) {
  var logged = req.session.loginstatus;
  if (logged) {
    console.log("logged in");
    res.redirect("/");
  } else {
    var err = req.session.loginError;
    req.session.loginError = false;
    res.render("users/login", { error: err });
  }
});
router.get("/signup", function (req, res, next) {
  res.render("users/signup");
});
router.post("/signup", (req, res) => {
  console.log(req.body);
  userhelper.createUser(req.body).then((data) => {
    console.log(data);
    res.redirect("/");
  });
});
router.post("/login", (req, res) => {
  userhelper.loginUser(req.body).then((data) => {
    if (data.status) {
      req.session.loginstatus = true;
      req.session.user = data.value;
      res.redirect("/");
    } else {
      req.session.loginError = "username or password is invalid!!!";
      res.redirect("/login");
    }
  });
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
router.get("/cart", checklogin, (req, res) => {
  res.render("users/cart");
});
module.exports = router;
