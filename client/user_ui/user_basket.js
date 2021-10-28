import "./user_basket.html"

Template.UserBasket.onCreated(function () {
    Tracker.autorun(function(){
        Meteor.subscribe("basket_products");
        Meteor.subscribe("users");
       })
})

Template.UserBasket.helpers({
    data: function () {
        var basket_products = [];
        var user = Meteor.user();
        var sum = 0;
        if (user) {
          var wagen = user.profile.basket;
          wagen.forEach(element => {
            var product = Products.findOne({_id: element._id});
            product["count"] = element.count;
            product["sum"] = element.count*product.price;
            var image = ProductImages.findOne({ product_id: product._id });
            if (image) {
            product["image"] = image.image;
          }
          sum+=product.sum;
          basket_products.push(product);
          });
        }
  
        return{
          basket_products: basket_products,
          sum: sum
        }
      }, 
});