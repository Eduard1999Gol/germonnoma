import "./user_basket.html";

Template.UserBasket.onCreated(function () {
    Tracker.autorun(function(){
        Meteor.subscribe("basket_products");
        Meteor.subscribe("users");
       })
});


Template.UserBasket.events({
  'click button#buyButton': function (event) {
    event.preventDefault();
    var orders = Meteor.user().profile.basket;
    Meteor.call("createOrders", orders, function (err, res) {
      if (!err) {
        M.toast({html: 'The Product was ordered', classes: 'rounded'});
      } else {
        console.log(err)
      }
    });
    
  },

})



Template.UserBasket.helpers({
    data: function () {
        var basket_products = [];
        var user = Meteor.user();
        var sum = 0;
        var articel_count = 0;
        if (user) {
          var wagen = user.profile.basket;
          wagen.forEach(element => {
            var product = Products.findOne({_id: element._id});
            product["count"] = element.count;
            product["sum"] = element.count*product.price;
          sum+=product.sum;
          articel_count+=element.count

          basket_products.push(product);
          });
        }
        return{
          basket_products: basket_products,
          sum: sum,
          articel_count: articel_count
        }
      }, 
});