import { toast } from "bulma-toast";
import helper_functions from './lib/helper_functions';
import category from './product_category.js';


Template.ProductDetails.events({
    'click button#edit_product': function (event) { 
        event.preventDefault();
        console.log("jdsfjg")
        var id = event.target.id;
        Session.set('product_id', id);
        var product = Products.findOne({_id: event.target.id});
        $('input.product_name#'+id)[0].value = product.name;
        $('input.product_price#'+id)[0].value = product.price;
        $('textarea.product_description#'+id)[0].value = product.description;
        $('.modal').addClass('is-active');
        $('html').addClass('is-clipped');
    },

    'click button.delete-product': function (event) {
        event.preventDefault();
        var id = event.target.id;
        var name = event.target.dataset.name;
        var prove = window.confirm(TAPi18n.__('confirm_delete_product')+" :"+ name );
        Router.go('/');
        if (prove) {
            Meteor.call("deleteProduct", id, function (err, res) {
                if (!err) {
                    toast({
                        message: TAPi18n.__('product_deleted'),
                        type: 'is-success',
                        duration: 3000,
                        position: "bottom-right",
                        closeOnClick: true,
                        animate: { in: 'fadeIn', out: 'fadeOut' }
                    });
                }else{
                    toast({
                        message: TAPi18n.__('product_not_deleted'),
                        type: 'is-danger',
                        duration: 3000,
                        position: "bottom-right",
                        closeOnClick: true,
                        animate: { in: 'fadeIn', out: 'fadeOut' }
                    });
                }
                
            })
        } else {
            toast({
                message: TAPi18n.__('product_not_deleted'),
                type: 'is-danger',
                duration: 3000,
                position: "bottom-right",
                closeOnClick: true,
                animate: { in: 'fadeIn', out: 'fadeOut' }
            });
        }
       
        
        
    },
    'click a#goToProduct': function (event) {
        event.preventDefault();
        Router.go('/productDetails', {_id: event.target.dataset.id});
    },
    'click button.edit-product': function (event){
        event.preventDefault();
        var id = event.target.id;
        Session.set('product_id', id);
        var product = Products.findOne({_id: event.target.id});
        $('input.product_name#'+id)[0].value = product.name;
        $('input.product_price#'+id)[0].value = product.price;
        $('textarea.product_description#'+id)[0].value = product.description;
        $('.modal#'+id).addClass('is-active');
        $('html').addClass('is-clipped');

    },
    'click .close-modal': function (event) {
        
        event.preventDefault();
        helper_functions.closeModal();
        
    },
    'click button#returnToProducts': function (event) {
        event.preventDefault();
        Router.go('/');

    },    

    'submit form#editProductForm': function (event) {
        event.preventDefault();
        var id = event.target.dataset.id;
        var name = event.target.product_name.value;
        var price = event.target.product_price.value;
        var description = event.target.product_description.value;
        var category = event.target.category.value;
        var product = {
            category: category,
            name: name,
            price: price,
            description: description
        }
        Meteor.call('updateProduct',id, product, function (err, res) {
            if(!err){
                toast({
                    message: TAPi18n.__('product_edeted'),
                    type: 'is-success',
                    duration: 3000,
                    position: "bottom-right",
                    closeOnClick: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' }
                });
            }else{
                toast({
                    message: TAPi18n.__('product_not_edeted'),
                    type: 'is-danger',
                    duration: 3000,
                    position: "bottom-right",
                    closeOnClick: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' }
                });
            }  
        }),
        helper_functions.closeModal();      
    }
});



Template.Product.helpers({
    'getProductDetails': function () {
        return Products.findOne({_id: Session.get('product_id')});
    }
});