import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';

import "./main.css";

/* Pages */
import '../router/router.js';
import './layout.html';
import './layout.js';
import './home.html';
import './home.js';
import './product.html';
import './product.js';
import './add_product.html';
import './add_product.js';
import './product_details.html';
import './product_details.js';
import './global_helpers.js';
import './product_edit.html';
import './product_edit.js';
import './button_create_product.html';
import './button_create_product.js';
import './modal_login.html';
import './register.html';
import './modal_login.js';


/* Collections */
Products = new Mongo.Collection('products');
ProductImages = new FilesCollection({ collectionName: 'ProductImages'});

