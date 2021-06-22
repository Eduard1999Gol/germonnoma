import { toast } from 'bulma-toast';
import helper_functions from './lib/helper_functions';

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
    }
});

Template.Layout.helpers({
    
});


