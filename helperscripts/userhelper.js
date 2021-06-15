var db = require("../config/connection");
var variables = require("../config/variables");
var bcrypt = require("bcrypt");
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
};
