import { Mongo } from 'meteor/mongo';

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


/* Collections */
Products = new Mongo.Collection('products');

