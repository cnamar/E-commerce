var db = require("../config/connection");
var variables = require("../config/variables");
var objectID = require("mongodb").ObjectID;
module.exports = {
  addproduct: (product, success) => {
    db.get()
      .collection("products")
      .insertOne(product)
      .then((data) => {
        console.log(data.ops[0]._id);
        success(data.ops[0]._id);
      });
  },
  getproducts: () => {
    return new Promise(async (resolve, reject) => {
      var products = await db
        .get()
        .collection(variables.Product_collection)
        .find()
        .toArray();
      resolve(products);
    });
  },
  deleteproduct: (id) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(variables.Product_collection)
        .deleteOne({ _id: objectID(id) })
        .then((product) => {
          resolve(product);
        });
    });
  },
  getone: (id) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(variables.Product_collection)
        .findOne({ _id: objectID(id) })
        .then((product) => {
          resolve(product);
        });
    });
  },

  updateproduct: (id, product) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(variables.Product_collection)
        .updateOne(
          { _id: objectID(id) },
          {
            $set: {
              name: product.name,
              category: product.category,
              description: product.description,
            },
          }
        )
        .then((newproduct) => {
          resolve(newproduct);
        });
    });
  },
};
