
Template.SetPassword.events({
    'submit form#SetNewPassword': function (event) {
        event.preventDefault();
        // console.log(Template.instance().data.token); 
        var token = Router.current().params.token;
        var password = event.currentTarget.password.value;
        var password_2 = event.currentTarget.password_2.value;
        if(password === password_2){
            Accounts.resetPassword(token, password, function (err, res) {
                if(!err){
                    Meteor.logout();
                    Router.go('/login');
                }
            })
        }else{
            Toast({
                text: "Passwords are not same", 
                duration: 3000, 
                color: "danger"
            });
        }
    }
})

// if('1' == 1) => true
// if('1' === 1) => false