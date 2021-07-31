import { Meteor } from 'meteor/meteor'

Template.Register.onCreated(function(){
});

Template.Register.onRendered(function(){
});

if(Meteor.isClient){
    Template.Register.events({
        'submit form#register': function (event) {
            event.preventDefault();
            var user = {
                username: event.currentTarget.username.value,
                email: event.currentTarget.email.value,
                password: event.currentTarget.password.value,
                profile: {
                    first_name: event.currentTarget.first_name.value,
                    last_name: event.currentTarget.last_name.value
                }
            }
            Meteor.call("register", user, function (err, res) {
                if (!err) {
                    console.log(res)
                    
                } else {
                    console.log(err)
                }
                
            })
            console.log(user);
          
        }
    });
}



Template.Register.helpers({
    
});
