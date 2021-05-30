
Meteor.publish('products', function () {
    return Products.find({});
  });




  Meteor.publish('publishProductId', function (id) {
    return Products.findOne({
      _id: id
    });
  });

