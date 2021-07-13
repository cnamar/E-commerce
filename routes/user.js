var express = require("express");
var router = express.Router();
var producthelper = require("../helperscripts/product");
var userhelper = require("../helperscripts/userhelper");
const session = require("express-session");
const checklogin = (req, res, next) => {
  var logged = req.session.loginstatus;
  if (logged) {
    console.log("yeeee");
    next();
  } else {
    res.redirect("/login");
    console.log("nooo");
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
    req.session.logginstatus = true;
    req.session.user = data;
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
  var user = req.session.user;
  var userid = user._id;
  userhelper.viewcart(userid).then((products) => {
    /* var cartproducts = await Promise.all(
      products.map(async (product) => {
        var proddata = await producthelper.getone(product);
        return proddata;
      })
    );*/

    console.log(products);
  });
  res.render("users/cart", { user: user });
});
router.get("/add-cart/:id", checklogin, (req, res) => {
  var prodid = req.params.id;
  var userid = req.session.user._id;
  userhelper.addtocart(userid, prodid).then((data) => {
    console.log(data);
  });
  res.redirect("/");
});
module.exports = router;
