Template.Home.onCreated(function () {
    Tracker.autorun(function(){
        Meteor.subscribe("products");
        Meteor.subscribe("productImages")
       })
})

Template.Home.events({
    'submit form.searchForm': function (event) {
        event.preventDefault();
        if (event.currentTarget.search.value) {
            Router.go("searchedProducts", {searchTerm: event.currentTarget.search.value});
        }  
    }
})


Template.Home.helpers({
    data: function () {
        var products = Products.find().fetch();
        products.forEach(product => {
          var image = ProductImages.findOne({ product_id: product._id });
          if (image) {
            product["image"] = image.image;
          }
        });
        console.log(products)
        return {
          products: products,
        };
      },
})