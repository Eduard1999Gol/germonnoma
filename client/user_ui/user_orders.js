Template.UserOrders.onCreated(function () {
    Tracker.autorun(function(){
        Meteor.subscribe("products");
        Meteor.subscribe("productImages");
        Meteor.subscribe("users");
       })
})

Template.UserOrders.helpers({
    "getOrders": function () {
        var orders = [];
        var user = Meteor.user();
        if (user) {
          var wagen = user.profile.orders;
          wagen.forEach(element => {
            var product = Products.findOne({_id: element._id});
            product["count"] = element.count;
            var image = ProductImages.findOne({ product_id: product._id });
            if (image) {
            product["image"] = image.image;
          }
          orders.push(product);
          });
        }
        return{
          orders: orders,
        }
      }, 
});