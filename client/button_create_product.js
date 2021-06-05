import { toast } from 'bulma-toast';
import helper_functions from './lib/helper_functions';

Template.CreateButton.onCreated(function(){
});

Template.CreateButton.onRendered(function(){
});

Template.CreateButton.events({
    'click a#addProduct': function (event) {
        event.preventDefault();
        Router.go('/addProduct');
    },
});

Template.CreateButton.helpers({
    
});


