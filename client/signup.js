import { Meteor } from 'meteor/meteor';
var M = require('./lib/materialize.js');

Template.Signup.onRendered(function(){
    $('select').formSelect();
});

Template.Signup.onCreated(function(){

});

Template.Signup.helpers({
    'selected_language': function (language) {
        if (TAPi18n.getLanguage() == language) {
            return 'selected';
        }else{
            return '';
        }
    }
});

Template.Signup.events({
    'change select#language': function (event) {
        event.preventDefault();
        TAPi18n.setLanguage(event.target.value);
    },
    'submit form.register-form': function (event) {
        event.preventDefault();
        console.log(event.target.language.value);
        var language = event.target.language.value;
        var first_name = event.target.first_name.value;
        var last_name = event.target.last_name.value;
        var email = event.target.email.value;
        var password = event.target.password.value;
        var type = 'tenant';
        if (password == event.target.password_confirmation.value) {
            Meteor.call('register', language, first_name, last_name, email, password, type, function (err, res) {
                if (err) {
                    alert(err);
                }else{
                    alert(res);
                    Router.go('/');
                }
            })
        }else{
            alert('Different passwords');
        }
        
    },
});