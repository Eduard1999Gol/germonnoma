import "./search_products.html"

Template.SearchProducts.onCreated(function () {
    Tracker.autorun(function(){
    Meteor.subscribe("searchedProducts", Router.current().params.searchTerm);
    })
})   

Template.SearchProducts.helpers({
    data: function () {
        var products = Products.find({ name: { $regex: Router.current().params.searchTerm, $options: 'i'}}).fetch();
        products.forEach(product => {
          var image = ProductImages.findOne({ product_id: product._id });
          if (image) {
            product["image"] = image.image;
          }
        });
        return {
          products: products,
          searchTerm: Router.current().params.searchTerm
        };
      },
})
   