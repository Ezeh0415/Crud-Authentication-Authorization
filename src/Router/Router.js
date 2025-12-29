const Router = require("express").Router();

const Require_Api_key = require("../../middlewares/Api-key");
const Require_jwt_key = require("../../middlewares/JWT-key");
const UserController = require("../Controllers/UserController");
const userService = require("../Services/UserServices");
const User = require("../Models/UserSchema");
const ProductController = require("../Controllers/ProductController");
const ProductService = require("../Services/ProductServices");
const Product = require("../Models/ProductSchema");

const UserService = new userService(User); // service folder for user
const productService = new ProductService(Product);
// service sets up the database function if it should find create findAndUpdate or findOne

const userController = new UserController(UserService);
const productController = new ProductController(productService);
// visit readMe controller section // for more info

// signup and login
Router.post("/api/signup", Require_Api_key, userController.createUser);
Router.post("/api/login", Require_Api_key, userController.loginUser);

// create

Router.get(
  "/api/getProducts",
  Require_Api_key,
  Require_jwt_key,
  productController.getAllProducts
);

Router.post(
  "/api/getProductById",
  Require_Api_key,
  Require_jwt_key,
  productController.getProductById
);

Router.post(
  "/api/addProduct",
  Require_Api_key,
  Require_jwt_key,
  productController.createProduct
);

Router.put(
  "/api/updateProduct",
  Require_Api_key,
  Require_jwt_key,
  productController.updateProduct
);

Router.delete(
  "/api/deleteProduct",
  Require_Api_key,
  Require_jwt_key,
  productController.deleteProduct
);

module.exports = Router;
