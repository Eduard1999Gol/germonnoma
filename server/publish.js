
Meteor.publish('products', function () {
    return Products.find({});
  });

Meteor.publish('publishProductId', function (id) {
  return Products.findOne({
    _id: id
  });
});

Meteor.publish('productImageById', function (id) {
  return ProductImages.find({'meta.product_id': id});
});

