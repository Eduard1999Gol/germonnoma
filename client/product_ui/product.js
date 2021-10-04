import Toast from '../lib/costumFunctions/toast';

Template.Product.onCreated(function(){
});

Template.Product.events({
    'click button#userBasket': function (event) {
        event.preventDefault();
        var aktuel_wagen = Meteor.user().profile.basket;
        var id = event.target.dataset.id;
        if (aktuel_wagen.includes(id)) {
            Toast({
                text: "The Product is already in the basket", 
                duration: 3000, 
                color: "danger"
            });
        }else {
            aktuel_wagen.push(id)
        }
        
        var profile = {
            basket: aktuel_wagen,
            language: Meteor.user().profile.language,
            first_name: Meteor.user().profile.first_name,
            last_name: Meteor.user().profile.last_name,
            street: Meteor.user().profile.street,
            haus_number: Meteor.user().profile.haus_number,
            post_code: Meteor.user().profile.post_code,
            state: Meteor.user().profile.state,
            city: Meteor.user().profile.city
        }
        Meteor.call("updateProfile", profile, function (err, res) {
            if (!err) {
                Toast({
                    text: "to shop basket added", 
                    duration: 3000, 
                    color: "success"
                });
            } else {
                return err
            }
        })
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