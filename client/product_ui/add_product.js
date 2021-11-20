Template.AddProduct.onRendered(function () {
    $('select').formSelect();
    M.textareaAutoResize($('#textarea1'));
}); 

Template.AddProduct.events({
    'click button#returnToProducts': function (event) {
        event.preventDefault();
        Router.go('/');
    },

    'submit form#addProductForm':function (event) {
        event.preventDefault();
        var reader = new FileReader();
        reader.onload = function (e) {
            var product = {
                count: parseInt(event.currentTarget.product_count.value),
                category: event.currentTarget.product_category.value,
                name: event.currentTarget.product_name.value,
                price: parseInt(event.currentTarget.product_price.value),
                description: event.currentTarget.product_description.value,
                image: e.target.result
            }
            Meteor.call('createProduct', product, function (err, res) {
                if (!err) {
                    M.toast({html: 'The Product is created', classes: 'rounded'});
                    Router.go('/');
                }else{
                    M.toast({html: 'The Product is not created', classes: 'rounded'});
                    
                }
            });
        };
        reader.readAsDataURL(event.currentTarget.product_image.files[0]);
    },
});


Template.AddProduct.helpers({
    'categories': function () {
        return Categories.find().fetch();
    },
    
  });



