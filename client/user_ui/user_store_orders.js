import "./user_store_orders.html"



Template.StoreOrders.onCreated(function () {
    Tracker.autorun(function(){
        Meteor.subscribe("products");
        Meteor.subscribe("productImages");
        Meteor.subscribe("users");
        Meteor.subscribe("user_stores");
        Meteor.subscribe("store_orders");
       })
})



Template.StoreOrders.events({
    'submit form#confirm': function (event) {
        event.preventDefault();
        //var button = document.getElementById('dummy');
        //button.parentNode.removeChild(elem);


        var button = event.currentTarget[0];
        button.parentNode.removeChild(button);
        
    },
});

Template.StoreOrders.helpers({
    "getOrders": function () {
        if (Meteor.user()) {
          var orders = Orders.find({"product.store_id.user_id": Meteor.userId()}).fetch();
          console.log(orders)
          return{
            orders: orders,
          }
        }
      }, 
});

Template.StoreOrders.helpers({
    'isSelected': function (a, b) {
        if (a === b) {
            return 'selected';
        } else {
            return '';
        }
    },
  });