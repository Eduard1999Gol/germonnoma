import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

Template.Layout.onCreated(function () {
    Tracker.autorun(function(){
        Meteor.subscribe("products");
        Meteor.subscribe("productImages");
        Meteor.subscribe("users");
        Meteor.subscribe("user_stores");
        Meteor.subscribe("user_orders");
        Meteor.subscribe("categories");
    })
})


Template.Layout.events({
    'click a.dropdown-trigger': function (event) {
        var instance = $('.dropdown-trigger').dropdown();
        var dropdown = M.Dropdown.getInstance(instance);
        dropdown.open();
    },
    'click a#basket':function (event) {
        event.preventDefault();
        Router.go("basket_page");
    },
    

    'click a#myOrders':function (event) {
        event.preventDefault();
        Router.go("orders_page");
    },

    'click a#myStoreOrders':function (event) {
        event.preventDefault();
        Router.go("store_orders_page");
    },

    
    'click a#Home': function (event) {
        event.preventDefault();
        Router.go('/');
        $( ".dropdown_user" ).show();
    },

    'click a#logout': function (event) {
        event.preventDefault();
        Meteor.logout(function (err, res) {
            if (!err) {
                Router.go("login");
                console.log("logout")
            } else {
                console.log(err)
            }
        })
    },
   

    'click button#loginButton': function (event) {
        event.preventDefault();
        Router.go('login');
    },

    'click a#myProfile': function (event) {
        event.preventDefault();
        Router.go('MyProfile',{_id:Meteor.userId()});
    },

   
});



