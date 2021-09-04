
Template.Layout.onCreated(function(){

});

Template.Layout.onRendered(function(){
    
});

Template.Layout.events({
    'click a#Home': function (event) {
        event.preventDefault();
        Router.go('/');
        $( ".dropdown_user" ).show();
    },

    'click a#logout': function (event) {
        event.preventDefault();
        Meteor.logout(function (err, res) {
            if (!err) {
                Router.go("login");
                console.log("logout")
            } else {
                console.log(err)
            }
        })
    },

    'click a#loginButton': function (event) {
        event.preventDefault();
        Router.go('login');
    },

    'click a#myProfile': function (event) {
        event.preventDefault();
        Router.go('MyProfile',{_id:Meteor.userId()});
        $( ".dropdown_user" ).hide();
    },

   
});

Template.Layout.helpers({
    
});


