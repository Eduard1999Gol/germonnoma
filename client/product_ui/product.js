import { ReactiveVar } from 'meteor/reactive-var'

Template.Product.onCreated(function(){
    Session.set("dfv");
    this.newAlert = new ReactiveVar();
    console.log(this.newAlert)

});

Template.Product.events({
    'click button.deselect-product': function (event) {
        event.preventDefault();
        var id = event.currentTarget.dataset.id;
        Meteor.call("selectedProduct", id, false)
        
    },

    'click button.select-product': function (event) {
        event.preventDefault();
        var id = event.currentTarget.dataset.id;
        Meteor.call("selectedProduct", id, true)
        
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

    'getAlert': function () {
        return Template.instance().newAlert.get();
      }
});