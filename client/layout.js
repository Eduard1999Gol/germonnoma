
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
    },

    'click a#Login': function (event) {
        event.preventDefault();
        
    }
});

Template.Layout.helpers({
    
});


