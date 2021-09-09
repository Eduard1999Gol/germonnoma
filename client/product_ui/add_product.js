import Toast from '../lib/costumFunctions/toast';

Template.AddProduct.onCreated(function(){
    Session.set('selectedFile', "");
   
});

Template.AddProduct.events({
    'click button#returnToProducts': function (event) {
        event.preventDefault();
        Router.go('/');
    },

    'change input.file-input': function (event) {
        event.preventDefault();
        var reader = new FileReader();
        reader.onload = function (e) {
                console.log(e)
                var image = e.target.result;
                Session.set("image",image);
                
        };
        reader.readAsDataURL(event.currentTarget.files[0]);
    },

    'submit form#addProductForm':function (event) {
        event.preventDefault();
        var product = {
            category: event.currentTarget.product_category.value,
            name: event.currentTarget.product_name.value,
            price: parseInt(event.currentTarget.product_price.value),
            description: event.currentTarget.product_description.value,
            image: Session.get("image")
        }

        Meteor.call('createProduct', product, function (err, res) {
            if (!err) {
                Toast({
                    text: "Product is created", 
                    duration: 3000, 
                    color: "success"
                });
                Router.go('/');
            }else{
                Toast({
                    text: "Product is not created", 
                    duration: 3000, 
                    color: "danger"
                });
            }
        });
        
    },
});



