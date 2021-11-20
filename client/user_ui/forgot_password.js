Template.ForgotPassword.events({
    'submit form#ForgotPasswordForm': function (event) {
        event.preventDefault();
        var email = event.currentTarget.email.value;
        console.log(email);
        Accounts.forgotPassword({email: email}, function(err, res) { 
             if (err) {
                 console.error(err);
             } else {
                Router.go('reset_password_email');
             }
        });
    }
})