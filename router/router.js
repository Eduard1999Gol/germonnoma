
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
	if (this.ready()) {
		this.render("Home");
	} else {
		this.render('Loading');
	}
},{
	name: "home",
	layoutTemplate: "Layout",
	data: function () {
		var products = Products.find({}).fetch();
		return {
			products: products
		}
	}
});

Router.route('/products/:_id', function () {
	this.subscribe("products");
	if (this.ready()) {
		this.render("ProductDetails");
	} else {
		this.render('Loading');
	}
},{
	name: "productDetails",
	layoutTemplate: "Layout",
	data: function () {
		var product = Products.findOne({_id: this.params._id});
		return {
			product: product
		}
	}
});

Router.route('/addproduct', function () {
	this.subscribe("products");
	if (this.ready()) {
		this.render("AddProduct");
	} else {
		this.render('Loading');
	}
},{
	name: "addProduct",
	layoutTemplate: "Layout"
});
