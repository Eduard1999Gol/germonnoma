Template.ForgotPassword.events({
    'submit form#ForgotPasswordForm': function (event) {
        event.preventDefault();
        console.log("submitted")
    }
})
