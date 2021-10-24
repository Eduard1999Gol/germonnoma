import helper_functions from '../lib/helper_functions';
import Toast from '../lib/costumFunctions/toast';

Template.Home.onCreated(function () {
    Tracker.autorun(function(){
        Meteor.subscribe("products", Router.current().params._id);
        Meteor.subscribe("productImageById", Router.current().params._id);
       })
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
    "getProductDetails": function () {
        var product = Products.findOne({ _id: Router.current().params._id });
        console.log(product);

        if (product) {
            var images = ProductImages.find({
                product_id: product._id,
            });
        }
        if (product && images) {
            product["images"] = images;
            return product;
        }
    }
});