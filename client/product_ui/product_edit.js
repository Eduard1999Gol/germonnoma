Template.EditProductPage.onRendered(function () {
    $('select').formSelect();
    M.textareaAutoResize($('#textarea1'));
}); 

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
            var product = {
                count: parseInt(event.currentTarget.product_count.value),
                category: event.currentTarget.product_category.value,
                name: event.currentTarget.product_name.value,
                price: parseInt(event.currentTarget.product_price.value),
                description: event.currentTarget.product_description.value,
                image: e.target.result
            }
            Meteor.call('updateProduct',Router.current().params._id, product, function (err, res) {
                if (!err) {
                    M.toast({html: 'The Product is edited', classes: 'rounded'});
                    Router.go('/');
                }else{
                    M.toast({html: 'The Product is not edited', classes: 'rounded'});
                    
                }
            });
        };
        reader.readAsDataURL(event.currentTarget.product_image.files[0]);
    },
});

Template.EditProductPage.helpers({
    'categories': function () {
        return Categories.find().fetch();
    },
    'isSelected': function (a, b) {
        if (a === b) {
            return 'selected';
        } else {
            return '';
        }
    },
 
    "getProduct": function () {
        var product = Products.findOne({ _id: Router.current().params._id });
        var category = Categories.findOne({_id: product.category})
        if (product) {
            return {
                product: product,
                category: category.name,
            }
        }
    }
  });


    



