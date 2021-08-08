import { toast } from "bulma-toast";
import helper_functions from '../lib/helper_functions';
import Toast from '../lib/costumFunctions/toast';


Template.ProductDetails.events({
   

    'click button#delete-product': function (event) {
        event.preventDefault();
        var id = event.target.dataset.id;
        var name = event.target.dataset.name;
        var prove = window.confirm(TAPi18n.__('Are you really sure to delete the product  ')+ name + "?" );
        if (prove) {
            Meteor.call("deleteProduct", id, function (err, res) {
                if (!err) {         
                    Toast({
                        text: "Product is deleted", 
                        duration: 3000, 
                        color: "success"
                    });
                    Router.go('/');
                }else{
                    Toast({
                        text: "Product is not deleted", 
                        duration: 3000, 
                        color: "danger"
                    });
                }
                
            })
        } else {
            Toast({
                text: "Product is not deleted", 
                duration: 3000, 
                color: "danger"
            });
        }
    },
    
    'click button#editPage': function (event){
        event.preventDefault();
        Router.go('productEdit', {_id: event.target.dataset.id});
    },

    'click button#return': function (event){
        event.preventDefault();
        Router.go('/');
        
    },
  
   
    //save edited Product
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