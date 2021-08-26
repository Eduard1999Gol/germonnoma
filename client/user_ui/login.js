import Toast from '../lib/costumFunctions/toast';

Template.Login.events({
    'click .link-github': function () {
        Meteor.loginWithGithub()
        Router.go('home');
      },

    'click .login-google': function(event) {
        event.preventDefault();
        Meteor.loginWithGoogle(function(err){
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
                
                Toast({
                    text: "This email is not verified", 
                    duration: 3000, 
                    color: "danger"
                });
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