Template.AddProduct.events({
    'click button#returnToProducts': function (event) {
        event.preventDefault();
        Router.go('/');
    },

    'submit form#addProductForm':function (event) {
        event.preventDefault();
        var product = {
            count: parseInt(event.currentTarget.product_count.value),
            category: event.currentTarget.product_category.value,
            name: event.currentTarget.product_name.value,
            price: parseInt(event.currentTarget.product_price.value),
            description: event.currentTarget.product_description.value,
        }
        Meteor.call('createProduct', product, function (err, res) {
            if (!err) {
                for (let i = 0; i < event.currentTarget.product_image.files.length; i++) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        Meteor.call('insertImage', res, e.target.result);
                    };
                    reader.readAsDataURL(event.currentTarget.product_image.files[i]);
                }
                M.toast({html: 'The Product is created', classes: 'rounded'});
                Router.go('/');
            }else{
                M.toast({html: 'The Product is not created', classes: 'rounded'});
                
            }
        });
    },
});


Template.AddProduct.helpers({
    'selectedFile':function () {
        if (Session.get('selectedFile')) {
            return Session.get('selectedFile');
        } else {
          return "choose_picture";
        }
    },
  });



