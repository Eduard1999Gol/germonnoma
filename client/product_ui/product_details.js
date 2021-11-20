
Template.ProductDetails.onCreated(function () {
    Tracker.autorun(function(){
        Meteor.subscribe("products", Router.current().params._id);
        Meteor.subscribe("productImageById", Router.current().params._id);
        Meteor.subscribe("users");
        Meteor.subscribe("stores");
       })
})   
   

Template.ProductDetails.events({
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
    
    'click button#delete-product': function (event) {
        event.preventDefault();
        var id = event.currentTarget.dataset.id;
        var name = event.target.dataset.name;
        var prove = window.confirm(TAPi18n.__('Are you really sure to delete the product  ')+ name + "?" );
        if (prove) {
            Meteor.call("deleteProduct", id, function (err, res) {
                if (!err) { 
                    Router.go('/');
                    M.toast({html: 'The Product was succesfuly deleted', classes: 'rounded'});
                    Router.go('/');
                }else{
                    M.toast({html: 'The Product was NOT deleted!', classes: 'rounded'});
                }
                
            })
        } else {
            M.toast({html: 'the Product was NOT deleted!', classes: 'rounded'});
        }
    },

    'click a#myProfile': function (event) {
        event.preventDefault();
        Router.go('MyProfile',{_id:Meteor.userId()});
    },
    
    'click button#editPage': function (event){
        event.preventDefault();
        Router.go('productEdit', {_id: event.currentTarget.dataset.id});
    },

    'click button#return': function (event){
        event.preventDefault();
        Router.go('/');
    },
  
});

Template.ProductDetails.helpers({
    "isYourProduct": function (user_id) {
        if (user_id===Meteor.userId()) {
            return true
        }
    },

    "getProductDetails": function () {
        var product = Products.findOne({ _id: Router.current().params._id });
        if (product) {
            var store = Stores.findOne({_id: product.store_id._id});
            console.log(store.store_name)
            return {
                product: product,
                store: store,
            }
        }
    }
});