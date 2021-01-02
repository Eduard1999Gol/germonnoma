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
                alert('login failed');
            }else{
                alert('Welcome to Germonnoma');
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