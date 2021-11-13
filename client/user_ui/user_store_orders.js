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
    'change select#Status': function (event) {
        event.preventDefault();
        var status_nummer =  parseInt(event.currentTarget.value);
        var array = ["Sent", "On_the_way", "Dilevered"];
        var status = array[status_nummer - 1];
        Meteor.call('updateStatus',event.currentTarget.dataset.id,status);
    },
});

Template.StoreOrders.helpers({
    "getOrders": function () {
        if (Meteor.user()) {
          var orders = Orders.find({"product.store_id.user_id": Meteor.userId()}).fetch();
          orders.forEach(element => {
              user = Meteor.users.findOne({_id: element.user_id})
              element["user_name"] = user.username;
          });
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