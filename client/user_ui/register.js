import { Meteor } from 'meteor/meteor'
import Toast from '../lib/costumFunctions/toast';

Template.Register.onCreated(function(){
});

Template.Register.onRendered(function(){
});


Template.Register.events({
    'submit form#register': function (event) {
        event.preventDefault();
        var language = event.currentTarget.selectLanguage.value;
        TAPi18n.setLanguage(language);
        if (event.currentTarget.password.value == event.currentTarget.password_2.value) {
            var user = {
                username: event.currentTarget.username.value,
                email: event.currentTarget.email.value,
                password: event.currentTarget.password.value,
                profile:{
                    language: event.currentTarget.selectLanguage.value,
                }
                
            }
            Meteor.call("register", user, function (err, res) {
                if (!err) {
                    Router.go("after_register");
                    
                } else {
                    console.log(err);
                }
                
            })
        } else {
            Toast({
                text: "Passwords are not same", 
                duration: 3000, 
                color: "danger"
            });
        }
    }
});    




Template.Register.helpers({
    
});
