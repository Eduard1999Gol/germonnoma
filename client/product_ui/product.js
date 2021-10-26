import Toast from '../lib/costumFunctions/toast';

Template.Product.onCreated(function(){
});

Template.Product.events({
    'click button#userBasket': function (event) {
        event.preventDefault();
        var product_id = event.target.dataset.id;
        Meteor.call("addProductToBasket", product_id, function (err, res) {
            if (!err) {
                Toast({
                    text: "to shop basket added", 
                    duration: 3000, 
                    color: "success"
                });
            } else {
                return err
            }
        })
    },
    'click a#goToProduct': function (event) {
        event.preventDefault();
        Router.go('/productDetails', {_id: event.target.dataset.id});
    },
});



Template.Product.helpers({
    'getProductDetails': function () {
        return Products.findOne({_id: Session.get('product_id')});
    },
    

});