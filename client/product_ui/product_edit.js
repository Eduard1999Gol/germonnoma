import Toast from '../lib/costumFunctions/toast';

Template.EditProductPage.onCreated(function(){
    Session.set('selectedFile', "");
    
});

Template.EditProductPage.events({
    'click button#returnToProducts': function (event) {
        event.preventDefault();
        Router.go('/');
    },
    "submit form#editProductForm": function (event) {
        event.preventDefault();
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = e.target.result;
            var product = {
                category: event.currentTarget.product_category.value,
                name: event.currentTarget.product_name.value,
                price: parseInt(event.currentTarget.product_price.value),
                description: event.currentTarget.product_description.value,
                image: image
            }
            console.log(product)
            Meteor.call('updateProduct', Router.current().params._id, product, function (err, res) {
                if (!err) {
                    Toast({
                        text: "Product is edited", 
                        duration: 3000, 
                        color: "success"
                    });
    
                }
                 else {
                    Toast({
                        text: "Product is not edited", 
                        duration: 3000, 
                        color: "danger"
                    });
                    
                }
    
            })
        };
        reader.readAsDataURL(event.currentTarget.product_image.files[0]);
    },
});

Template.EditProductPage.helpers({
    'selectedFile':function () {
        if (Session.get('selectedFile')) {
            return Session.get('selectedFile');
        } else {
          return "choose_picture";
        }
    },
  });



