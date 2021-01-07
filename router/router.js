
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
	this.render('Login');
},
{
	name: 'login',
	layoutTemplate: 'Layout'
});

Router.route('/register', function () {
	this.render('Signup');
},
{
	name: 'register',
	layoutTemplate: 'Layout'
});
Router.route('/forgotPassword', function () {
	this.render('ForgotPassword');
},
{
	name: 'forgotPassword',
	layoutTemplate: 'Layout'
});

Router.route('/resetpassword/:token', function () {
	this.render('ResetPassword');
},
{
	name: 'reset',
	layoutTemplate: 'Layout',
	data: function () {
		Session.set('passwordToken', this.params.token);
		return this.params.token;
	}
});