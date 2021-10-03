import { ReactiveVar } from 'meteor/reactive-var'

Template.Product.onCreated(function(){
});

Template.Product.events({
    
    'click a#goToProduct': function (event) {
        event.preventDefault();
        Router.go('/productDetails', {_id: event.target.dataset.id});
    },
});



Template.Product.helpers({
    'getProductDetails': function () {
        return Products.findOne({_id: Session.get('product_id')});
    },

    'getAlert': function () {
        return Template.instance().newAlert.get();
      }
});