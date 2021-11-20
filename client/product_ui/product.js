Template.Product.onCreated(function(){
});

Template.Product.events({
    'click button#userBasket': function (event) {
        event.preventDefault();
        var product_id = event.currentTarget.dataset.id;
        Meteor.call("addProductToBasket", product_id, function (err, res) {
            if (!err) {
                M.toast({html: 'to cart added', classes: 'rounded'});
            } else {
                return err
            }
        })
    },

    'click button#userOrders': function (event) {
        event.preventDefault();
        var product_id = event.target.dataset.id;
        var product = {
            _id: product_id,
            count: 1
        }
        var orders = [];
        orders.push(product)
        Meteor.call("createOrders", orders, function (err, res) {
            if (!err) {
                M.toast({html: 'Das Product wurde bestellt', classes: 'rounded'});
            } else {
                return err
            }
        })
    },
    
    'click a#goToProduct': function (event) {
        event.preventDefault();
        Router.go('/productDetails', {_id: event.currentTarget.dataset.id});
    },
});
