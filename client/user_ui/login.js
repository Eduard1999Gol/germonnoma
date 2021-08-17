import Toast from '../lib/costumFunctions/toast';

Template.Login.events({
    'click .login-facebook': function(event) {
        event.preventDefault();
        Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
            if (err) {
                console.log('Handle errors here: ', err);
            }else{
                Router.go('home');
            }
        });
    },
    'submit form#loginForm':function (event) {
        event.preventDefault();
        Meteor.loginWithPassword(event.currentTarget.email_address.value, event.currentTarget.password.value, function (err, res) {
            if (!err) {
               
                Router.go('home');
            } else {
                console.log(err)
            }
        })
    },

    'click a#goRegister':function (event) {
        event.preventDefault();
        Router.go('register');
    },


    'click a#goResetPassword':function (event) {
        event.preventDefault();
        Router.go('forgotPassword');
    },



})