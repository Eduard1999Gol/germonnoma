Template.UserOrders.onCreated(function () {
    Tracker.autorun(function(){
        Meteor.subscribe("products");
        Meteor.subscribe("productImages");
        Meteor.subscribe("users");
        Meteor.subscribe("stores");
        Meteor.subscribe("user_orders");
       })
})

Template.UserOrders.helpers({
    "getOrders": function () {
        if (Meteor.user()) {
          var orders = Orders.find({user_id: Meteor.userId()}).fetch();
          return{
            orders: orders,
          }
        }
      }, 
});