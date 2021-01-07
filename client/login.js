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
        Router.go('/forgotPassword');
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

Template.ForgotPassword.onRendered(function(){

});

Template.ForgotPassword.onCreated(function(){

});

Template.ForgotPassword.helpers({

});

Template.ForgotPassword.events({
    'submit form.forgot-password': function (event) {
        event.preventDefault();
        Accounts.forgotPassword({email: event.target.email.value}, function(err) {
			if(err) {
				if (err.reason == "User not found" ) {
                    Swal.fire({
                        icon: 'error',
                        title: TAPi18n.__('password_reset_error_no_User'),
                        showConfirmButton: false,
                        timer: 1500
                    });
				} else {
                    Swal.fire({
                        icon: 'error',
                        title: TAPi18n.__('password_reset_error'),
                        showConfirmButton: false,
                        timer: 1500
                    });
				}
			} else {
                Swal.fire({
                    icon: 'success',
                    title: TAPi18n.__('password_mail_send'),
                    showConfirmButton: false,
                    timer: 1500
                });
				Router.go('login');
			}
		});
    }
});



Template.ResetPassword.events({
    'submit form.reset-password': function (event) {
        event.preventDefault();
        console.log(event.target.password.value == event.target.password_confirmation.value);
        if (event.target.password.value == event.target.password_confirmation.value) {
            Accounts.resetPassword(Session.get('passwordToken'), event.target.password.value, function (err, res) {
                if (err) {
                    Swal.fire({
                        icon: 'error',
                        title: err.reason,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }else{
                    Swal.fire({
                        icon: 'success',
                        title: TAPi18n.__('password_reseted_succcessfully'),
                        showConfirmButton: false,
                        timer: 1500
                    });
                    Router.go('login');
                }
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: TAPi18n.__('not_same_password'),
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
});