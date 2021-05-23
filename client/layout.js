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
    'click button#addProduct': function (event) {
        event.preventDefault();
        $('.modal#addProductModal').addClass('is-active');
        $('html').addClass('is-clipped');
        
    },
    'click a#home': function (event) {
        event.preventDefault();
        Router.go('/');
    }
});

Template.Layout.helpers({
    
});


