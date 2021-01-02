import Swal from 'sweetalert2';

Template.Signin.onRendered(function(){

});

Template.Signin.onCreated(function(){

});

Template.Signin.helpers({

});

Template.Signin.events({
    'click a#forgot-password':function(event){
        event.preventDefault();
        console.log(event);
        Router.go('/resetpassword');
    },
    'submit form#login':function(event){
        event.preventDefault();
        console.log(event);
    },
    'click a#create-account':function(event){
        event.preventDefault();
        Router.go('Signup');
    },
    'submit form.login-form': function(event){
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        Meteor.loginWithPassword(email, password, function (err) {
            if (err) {
                Swal.fire({
                    icon: 'error',
                    title: TAPi18n.__('login_failed'),
                    showConfirmButton: false,
                    timer: 1500
                });
            }else{
                Swal.fire({
                    icon: 'success',
                    title: TAPi18n.__('welcome_message'),
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }
});

Template.Login.onRendered(function(){

});

Template.Login.onCreated(function(){

});

Template.Login.helpers({

});

Template.Login.events({

});