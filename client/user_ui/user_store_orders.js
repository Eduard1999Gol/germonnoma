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
        var button_style = event.currentTarget[0].style;
        button_style.display = 'none';
        var select = event.currentTarget[1].style;
        select.display = ''
        
    },
});