import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

Template.Layout.onRendered(function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instance = M.Dropdown.init(elems, {
        coverTrigger: false
    });
})


Template.Layout.onCreated(function () {
    Tracker.autorun(function(){
        Meteor.subscribe("users");
        Meteor.subscribe("user_stores");
        Meteor.subscribe("user_orders");
        Meteor.subscribe("categories");
    })
})


Template.Layout.events({
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
        var store = Stores.findOne({user_id: Meteor.userId()})
        Router.go("store_orders_page", {store_id: store._id});
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





