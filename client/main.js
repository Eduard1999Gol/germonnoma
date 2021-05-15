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

/* Collections */
Products = new Mongo.Collection('products');

