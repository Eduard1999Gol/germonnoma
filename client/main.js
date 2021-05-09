import { Mongo } from 'meteor/mongo';

/* Pages */
import '../router/router.js';
import './layout.html';
import './layout.js';
import './home.html';
import './home.js';
import './product.html';
import './product.js';



/* Collections */
Products = new Mongo.Collection('products');

