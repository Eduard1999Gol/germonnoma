Template.Login.events({
    'submit form#loginForm':function (event) {
        event.preventDefault();
        Meteor.loginWithPassword(event.currentTarget.email_address.value, event.currentTarget.password.value, function (err, res) {
            if (!err) {
                console.log(Meteor.user())
                $('#loginModal').modal("toggle");
            } else {
                console.log(err)
            }
        })
    },
    'click button#loginButton': function (event) {
        event.preventDefault();
        $('form#loginForm')[0].reset();
    },

    'click button#logout': function (event) {
        event.preventDefault();
        Meteor.logout(function (err, res) {
            if (!err) {
                console.log("logout")
            } else {
                console.log(err)
            }
            
        })
    },
    

    'click button#goRegister':function (event) {
        event.preventDefault();
        Router.go('register')
    },

    'click button#goResetPassword':function (event) {
        event.preventDefault();
        Router.go('resetPassword')
    }
})