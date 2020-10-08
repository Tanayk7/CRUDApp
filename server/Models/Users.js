const mongoose = require("mongoose");

const users = new mongoose.Schema({
  name: String,
  email: String,
  session_token: String,
});

const Users = mongoose.model("Users", users);
module.exports = Users;
