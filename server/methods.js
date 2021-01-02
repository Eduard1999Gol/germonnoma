import { Meteor } from 'meteor/meteor';

Meteor.methods({
    register: function(language, first_name, last_name, email, password, type) {
        var user_exist = Meteor.users.find({'profile.email': email}).count();
        if (user_exist == 0) {
            return Accounts.createUser({
                email: email,
                password: password,
                profile:{
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    type: type,
                    language: language
                }
            });
        }else{
            return "This email Address is already registered";
        }
        
    }
});