Router.configure({
	layoutTemplate: 'Layout',
	template: 'Layout'
});

Router.route('/', function () {
	this.render('Login');
},{
	name: 'home',
	layoutTemplate: 'Layout'
});

Router.route('/register', function () {
	this.render('Signup');
},{
	name: 'Signup',
	layoutTemplate: 'Layout'
});