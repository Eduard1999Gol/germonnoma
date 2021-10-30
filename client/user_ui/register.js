import { Meteor } from 'meteor/meteor'


Template.Register.onCreated(function(){
});

Template.Register.onRendered(function(){
});


Template.Register.events({
    'change input#checkbox': function (event) {
        event.preventDefault();
        if(event.currentTarget.checked==true){
            $('#store').prop('disabled', false);
        }else{
            $('#store').prop('disabled', true);
        }
    },

    'submit form#register': function (event) {
        event.preventDefault();
        var language = event.currentTarget.selectLanguage.value;
        TAPi18n.setLanguage(language);
        var list = [];
        var list2 = [];
        var checked = event.currentTarget.checkbox.checked;
        if (event.currentTarget.password.value == event.currentTarget.password_2.value) {
            if(checked==true){
                var user = {
                    username: event.currentTarget.username.value,
                    email: event.currentTarget.email.value,
                    password: event.currentTarget.password.value,
                    profile:{
                        language: event.currentTarget.selectLanguage.value,
                        basket: [],
                        orders: []
                    }
                }
                Meteor.call("registerStore", user, event.currentTarget.store_name.value);
            }else{
                var user = {
                    username: event.currentTarget.username.value,
                    email: event.currentTarget.email.value,
                    password: event.currentTarget.password.value,
                    profile:{
                        language: event.currentTarget.selectLanguage.value,
                        basket: [],
                        orders: []
                    }
                }
                Meteor.call("register", user, function (err, res) {
                    if (!err) {
                        Router.go("after_register");
                    } else {
                        console.log(err);
                    }
                    
                })
            }
        } else {
            alert("passwords  are not same");
        }
    }
});    




Template.Register.helpers({
    
});
