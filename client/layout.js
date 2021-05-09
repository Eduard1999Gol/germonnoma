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
    'click .close-modal': function (event) {
        event.preventDefault();
        helper_functions.closeModal();
    },
    'submit form#addProductForm':function (event) {
        event.preventDefault();
        var product = {
            name: event.target.product_name.value,
            price: event.target.product_price.value,
            description: event.target.product_description.value
        }
        Meteor.call('createProduct', product, function (err, res) {
            if (!err) {
                toast({
                    message: TAPi18n.__('product_created'),
                    type: 'is-success',
                    duration: 350,
                    position: "bottom-right",
                    closeOnClick: true
                });
            }else{
                toast({
                    message: TAPi18n.__('product_not_created'),
                    type: 'is-danger',
                    duration: 350,
                    position: "bottom-right",
                    closeOnClick: true
                });
            }
        });
        helper_functions.closeModal();
    }
});

Template.Layout.helpers({
    
});


