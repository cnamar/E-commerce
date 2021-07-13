var db = require("../config/connection");
var variables = require("../config/variables");
var bcrypt = require("bcrypt");
var objectID = require("mongodb").ObjectID;
const { ObjectID } = require("bson");

module.exports = {
  createUser: (userdata) => {
    return new Promise(async (resolve, reject) => {
      userdata.passwordup = await bcrypt.hash(userdata.passwordup, 10);
      db.get()
        .collection(variables.User_collection)
        .insertOne(userdata)
        .then((data) => {
          resolve(data.ops[0]);
        });
    });
  },
  loginUser: (userdata) => {
    return new Promise(async (resolve, reject) => {
      var loginstatus = false;
      var data = {};
      var user = await db
        .get()
        .collection(variables.User_collection)
        .findOne({ usernameup: userdata.username });
      if (user) {
        bcrypt.compare(userdata.password, user.passwordup).then((status) => {
          if (status) {
            data.status = true;
            data.value = user;
            resolve(data);
          } else {
            console.log("login failed.password incorrect");
            resolve({ status: false });
          }
        });
      } else {
        console.log("login failed.no such user");
        resolve({ status: false });
      }
    });
  },
  addtocart: (userid, productid) => {
    return new Promise(async (resolve, reject) => {
      var usercart = await db
        .get()
        .collection(variables.Cart_collection)
        .findOne({ user: objectID(userid) });
      if (usercart) {
        db.get()
          .collection(variables.Cart_collection)
          .updateOne(
            { user: objectID(userid) },
            { $push: { products: ObjectID(productid) } }
          )
          .then((newcart) => {
            resolve(newcart);
          });
      } else {
        var cartdata = {
          user: objectID(userid),
          products: [ObjectID(productid)],
        };
        db.get()
          .collection(variables.Cart_collection)
          .insertOne(cartdata)
          .then((data) => {
            resolve(data.ops[0]);
          });
      }
    });
  },
  viewcart: (userid) => {
    return new Promise(async (resolve, reject) => {
      /*
      var cart = await db
        .get()
        .collection(variables.Cart_collection)
        .findOne({ user: objectID(userid) });
      if (cart) {
        resolve(cart.products);
      }*/
      var cartdata = await db
        .get()
        .collection(variables.Cart_collection)
        .aggregate([
          { $match: { user: ObjectID(userid) } },
          {
            $lookup: {
              from: variables.Product_collection,
              let: { productlist: "$products" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$productlist"],
                    },
                  },
                },
              ],
              as: "cartdetails",
            },
          },
        ])
        .toArray();
      resolve(cartdata[0].cartdetails);
    });
  },
};
