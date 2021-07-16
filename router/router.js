
function loginNeeded() {
	if (!Meteor.userId() || !Meteor.user()) {
		this.layout('Layout');
		this.render('Login');
	} else {
		if (Meteor.user().profile.language && Meteor.user().profile.language != Session.get('userLanguage')) {
			TAPi18n.setLanguage(Meteor.user().profile.language);
			Session.set('userLanguage', Meteor.user().profile.language);
		}
		this.next();
	}
};


function redirectHome() {
	if (Meteor.userId()) {
		this.redirect('/');
	} else {
		this.next();
	}
};

function setLanguage() {
	var lang;
	if (Session.get('userLanguage')) {
		lang = Session.get('userLanguage');
		TAPi18n.setLanguage(Session.get('userLanguage'));
	} else if (Meteor.user() && Meteor.user().profile.language) {
		lang = Meteor.user().profile.language;
	} else {
		lang = "en";
	}
	TAPi18n.setLanguage(lang);
	this.next();
};

/**
 * Router beforeactions
 */
/* 
Router.onBeforeAction(setLanguage, {});

Router.onBeforeAction(loginNeeded, {
	except: [
		"login",
		"register"
		
	]
}); */

Router.configure({
	layoutTemplate: 'Layout',
	template: 'Layout'
});

Router.route('/', function () {
	this.subscribe("products");
	this.subscribe("productImages");
	if (this.ready()) {
		this.render("Home");
	} else {
		this.render('Loading');
	}
},{
	name: "home",
	data: function () {
		var arr = [];
		var arr2 = [];
		var products = Products.find({selected: false}).fetch();
		var selected_products = Products.find({selected: true}).fetch();
		products.forEach(product => {
			var image = ProductImages.findOne({"meta.product_id": product._id});
			if (image) {
				product["image"] = image.link();
				arr.push(product)
			}
			;
		});
		selected_products.forEach(product => {
			var image = ProductImages.findOne({"meta.product_id": product._id});
			if (image) {
				product["image"] = image.link();
				arr2.push(product)
			}
			;
		});
		return {
			products: arr,
			selected_products: arr2
		}
	}
});

Router.route('/products/:_id', function () {
	this.subscribe("publishProductId", this.params._id);
	console.log(this)
	this.subscribe("productImageById", this.params._id);
	if (this.ready()) {
		this.render("ProductDetails");
	} else {
		this.render('Loading');
	}
},{
	name: "productDetails",
	data: function () {
		var product = Products.findOne({_id: this.params._id});
		var image = ProductImages.findOne({"meta.product_id": product._id}).link();
		product["image"] = image;
		return {
			product: product
		}
	}
});

Router.route('/addproduct', function () {
	this.subscribe("product");
	this.subscribe("productImages");
	if (this.ready()) {
		this.render("AddProduct");
	} else {
		this.render('Loading');
	}
},{
	name: "addProduct",
});

Router.route('/register', function () {
	this.subscribe("users");
	if (this.ready()) {
		this.render("Register");
	} else {
		this.render('Loading');
	}
},{
	name: "register",
});





Router.route('/products/:_id/edit_product', function () {
	this.subscribe("publishProductId", this.params._id);
	this.subscribe("productImageById", this.params._id);
	if (this.ready()) {
		this.render("ProductEditPage");
	} else {
		this.render('Loading');
	}
},{
	name: "productEdit",
	data: function () {
		var product = Products.findOne({_id: this.params._id});
		if (product) {
			var image = ProductImages.findOne({"meta.product_id": product._id})
		}
		if (image) {
			product["image"] = image.link();
		}
		return {
			product: product
		}
	}	
});
