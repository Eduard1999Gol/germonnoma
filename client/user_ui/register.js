import { Meteor } from 'meteor/meteor'

Template.Register.onCreated(function(){
});

Template.Register.onRendered(function(){
});

if(Meteor.isClient){
    Template.Register.events({
        'submit form': function (event) {
            event.preventDefault();
            var user = {
                name: $('[name=name]').val(),
                username: $('[name=username]').val(),
                email: $('[name=email]').val(),
                password: $('[name=password]').val(),
            }
            console.log(user);
    
            Accounts.createUser({
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password
            })
            console.log(Meteor.users.find().fetch())
        }
    });
}



Template.Register.helpers({
    
});
