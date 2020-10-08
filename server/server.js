// Dependencies
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
// Model imports
const Users = require("./Models/Users.js");
const Products = require("./Models/Products.js");

// Constants
const PORT = 5000;
const DB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-app.o5cvu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// Initializing code
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the home route");
});

app.post("/login", async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let users = await Users.find({ email: email }).lean().exec();
  // check if user exists
  if (users.length !== 0) {
    // check if session is present
    let user = users[0];
    if ("session_token" in user) {
      res.send({ session_token: user.session_token, email: email });
    } else {
      res.send({ session_token: crypto.randomBytes(64), email: email });
    }
  } else {
    // create the user
    let data = {
      email: email,
      name: name,
      session_token: crypto.randomBytes(64),
    };
    let user = new Users(data);
    let result = await user.save();
    res.send({ session_token: data.session_token, email: email });
  }
});

app.post("/addProduct", async (req, res) => {
  let email = req.body.email;
  let users = Users.find({ email: email }).lean().exec();
  if (users.length !== 0) {
    let data = {
      owner: req.body.email,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      size: req.body.size,
      stock: req.body.stock,
      description: req.body.description,
    };
    let product = new Products(data);
    let result = await product.save();
    res.send("Product added");
  } else {
    res.send("User not found");
  }
});

app.post("/deleteProduct", async (req, res) => {
  let objectIDS = req.body.delete_list;
  console.log(objectIDS);
  let result = await Products.deleteMany({
    _id: {
      $in: objectIDS,
    },
  });
  res.send("Products deleted");
});

app.post("/updateProduct", async (req, res) => {
  let data = {
    owner: req.body.email,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    size: req.body.size,
    stock: req.body.stock,
    description: req.body.description,
  };
  let result = await Products.findByIdAndUpdate({ _id: req.body.id }, data);
  res.send("Product update");
});

app.post("/getProducts", async (req, res) => {
  let email = req.body.email;
  let products = await Products.find({ owner: email }).lean().exec();
  res.send(products);
});

// Connections
mongoose.connect(
  DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    console.log("Connected to database successfully");
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
