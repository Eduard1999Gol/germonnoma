import helper_functions from '../lib/helper_functions';
import Toast from '../lib/costumFunctions/toast';
import { Carousel } from 'mdb-ui-kit';

Template.ProductDetails.onRendered(function () {
    console.log(Carousel);
})

Template.ProductDetails.events({
    'click button#delete-product': function (event) {
        event.preventDefault();
        var id = event.target.dataset.id;
        console.log(id)
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
  
});



Template.ProductDetails.helpers({
  
});