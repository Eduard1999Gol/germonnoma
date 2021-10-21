import Toast from '../lib/costumFunctions/toast';

Template.Login.events({
   
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

    'click button#goRegister':function (event) {
        event.preventDefault();
        Router.go('register');
    },


    'click a#goResetPassword':function (event) {
        event.preventDefault();
        Router.go('forgotPassword');
    },



})