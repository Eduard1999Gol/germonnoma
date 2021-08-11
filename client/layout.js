
Template.Layout.onCreated(function(){
});

Template.Layout.onRendered(function(){
});

Template.Layout.events({
    'change select#language':function (event) {
        event.preventDefault();
        TAPi18n.setLanguage(event.target.value);
    },
   
    'click a.Home': function (event) {
        event.preventDefault();
        Router.go('/');
    },

    'click a#Home': function (event) {
        event.preventDefault();
        Router.go('/');
        $( ".dropdown" ).show();
    },

    'click a#logout': function (event) {
        event.preventDefault();
        Meteor.logout(function (err, res) {
            if (!err) {
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
        $( ".dropdown" ).hide();
    }

});

Template.Layout.helpers({
    
});


