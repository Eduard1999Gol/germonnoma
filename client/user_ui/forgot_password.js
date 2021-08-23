Template.ForgotPassword.events({
    'submit form#ForgotPasswordForm': function (event) {
        event.preventDefault();
        var email = event.currentTarget.email.value;
        Meteor.call('sendResetEmail', function (err) {
            if (!err) {
                Router.go('reset_password_email');
                
            } else {
                console.log(err)
            }

            
        })
    }
})