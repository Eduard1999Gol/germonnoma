import { Mongo } from "meteor/mongo";
import "./main.css";


/* Pages */
import "../router/router.js";
import "./layout.html";
import "./layout.js";
import "./home.html";
import "./home.js";
import "./product_ui/product.html";
import "./product_ui/product.js";
import "./product_ui/add_product.html";
import "./product_ui/add_product.js";
import "./product_ui/product_details.html";
import "./product_ui/product_details.js";
import "./product_ui/product_edit.html";
import "./product_ui/product_edit.js";
import "./user_ui/register.html";
import "./user_ui/register.js";
import "./user_ui/register.js";
import "./user_ui/login.html";
import "./user_ui/login.js";
import "./global_helpers.js";
import "./user_ui/my_profile.html";
import "./user_ui/my_profile.js";
import "./user_ui/after_register.html";
import "./user_ui/verify_email.html";
import "./user_ui/reset_password_email.html";
import "./user_ui/forgot_password.html";
import "./user_ui/forgot_password.js";
import "./user_ui/after_email_reset_password.html";
import "./user_ui/after_email_reset_password.js";
import "./product_ui/search_products.js";
import "./product_ui/search_products.html";
import "./user_ui/user_basket.js";
import "./user_ui/user_basket.html";
import "./product_ui/product_basket.html"
import "./product_ui/product_basket.js";
import "./user_ui/user_orders.html";
import "./user_ui/user_orders.js";
import "./user_ui/user_store_orders.js";
import "./user_ui/user_store_orders.html";



/* Collections */
Products = new Mongo.Collection("products");
ProductImages = new Mongo.Collection("ProductImages");
Orders = new Mongo.Collection("orders");
Stores = new Mongo.Collection("stores");
Categories = new Mongo.Collection("categories");
