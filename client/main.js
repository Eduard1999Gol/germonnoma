import { Mongo } from "meteor/mongo";
import { FilesCollection } from "meteor/ostrio:files";

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
import "./product_ui/button_create_product.html";
import "./product_ui/button_create_product.js";
import "./user_ui/register.html";
import "./user_ui/register.js";
import "./user_ui/forgot_password.js";
import "./user_ui/forgot_password.html";
import "./user_ui/login.html";
import "./user_ui/login.js"
import "./user_ui/login_button.html"
import "./global_helpers.js";
import "./user_ui/my_profile.html"
import "./user_ui/my_profile.js"

/* Collections */
Products = new Mongo.Collection("products");
ProductImages = new FilesCollection({ collectionName: "ProductImages" });
