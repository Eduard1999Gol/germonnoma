import Toast from '../lib/costumFunctions/toast';

Template.EditProductPage.onCreated(function(){
    Session.set('selectedFile', "");
    
});

Template.EditProductPage.events({
    'click button#returnToProducts': function (event) {
        event.preventDefault();
        Router.go('/');
    },

    'change input.file-input': function (event) {
        event.preventDefault();
        var reader = new FileReader();
        reader.onload = function (e) {
                var image = e.target.result;
                Session.set("editedImage", image)
        };
        reader.readAsDataURL(event.currentTarget.files[0]);
    },

    "submit form#editProductForm": function (event) {
        event.preventDefault();
        var product = {
            category: event.currentTarget.product_category.value,
            name: event.currentTarget.product_name.value,
            price: parseInt(event.currentTarget.product_price.value),
            description: event.currentTarget.product_description.value,
            image: Session.get("editedImage")
        }
        console.log(product)
        var id = Session.get("id");
        Meteor.call('updateProduct', id, product, function (err, res) {
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



