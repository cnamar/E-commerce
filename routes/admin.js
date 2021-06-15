var express = require("express");
var router = express.Router();
var producthelper = require("../helperscripts/product");
var fs = require("fs");
/* GET users listing. */
router.get("/", function (req, res, next) {
  producthelper.getproducts().then((laptops) => {
    res.render("admin/view-products", { admin: true, laptops });
  });
});
router.get("/add-products", (req, res) => {
  res.render("admin/add-products", { admin: true });
});
router.post("/add-products", (req, res) => {
  console.log(req.body);
  console.log(req.files.image);
  producthelper.addproduct(req.body, (id) => {
    var image = req.files.image;
    image.mv("./public/product-images/" + id + ".jpg", (err, done) => {
      if (!err) {
        res.redirect("/admin");
      } else {
        console.log(err);
        res.send(err);
      }
    });
  });
});
router.get("/delete-product", (req, res) => {
  var id = req.query.id;
  producthelper.deleteproduct(id, (product) => {
    console.log("deleted" + product.name);
  });
  fs.unlinkSync("./public/product-images/" + id + ".jpg");
  res.redirect("/admin");
});
router.get("/edit-product", async (req, res) => {
  var id = req.query.id;
  var product = await producthelper.getone(id);
  res.render("admin/edit-products", { id, product });
});
router.post("/edit-product", (req, res) => {
  var id = req.query.id;
  producthelper.updateproduct(id, req.body).then((product) => {
    res.redirect("/admin");
  });
  var image = req.files.image;
  image.mv("./public/product-images/" + id + ".jpg", (err, done) => {
    if (!err) {
      console.log("success");
    } else {
      console.log(err);
    }
  });
});
module.exports = router;
