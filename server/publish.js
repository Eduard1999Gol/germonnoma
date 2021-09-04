
Meteor.publish('products', function () {
    return Products.find({deleted: false});
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

