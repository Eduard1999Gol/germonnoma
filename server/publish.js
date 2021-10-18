
Meteor.publish('products', function () {
    return Products.find();
  });
  

Meteor.publish('publishProductId', function (id) {
  return Products.find({_id: id});
});

Meteor.publish('productImageById', function (id) {
  return ProductImages.find({product_id: id});
});

Meteor.publish('productImages', function () {
  return ProductImages.find({});
});

Meteor.publish('searchedProducts', function (searchTerm) {
  var products = [];
  Products.find({name: { $regex: searchTerm, $options: 'i'}}).forEach(element => {
    products.push(element._id)
  });
  return [Products.find({name: { $regex: searchTerm, $options: 'i'}}),
  ProductImages.find({product_id: {$in: products}})
];
});




