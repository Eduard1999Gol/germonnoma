import { toast } from 'bulma-toast';
import helper_functions from './lib/helper_functions';

Template.AddProduct.onCreated(function(){
});

Template.AddProduct.onRendered(function(){
});

Template.AddProduct.events({
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

Template.AddProduct.helpers({
        'getProductDetails': function () {
            return Products.findOne({_id: Session.get('product_id')});
        }
});


