import { ReactiveVar } from 'meteor/reactive-var'

Template.Product.onCreated(function(){
    Session.set("dfv");
    this.newAlert = new ReactiveVar();
    console.log(this.newAlert)

});

Template.Product.events({

    'click a#goToProduct': function (event) {
        event.preventDefault();
        Router.go('/productDetails', {_id: event.target.dataset.id});
    },
    

    'click a.icon': function (event) {
        event.preventDefault();
        event.target.className = "material-icons text-blue";
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