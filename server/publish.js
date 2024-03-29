
Meteor.publish('products', function () {
    return Products.find();
  });

Meteor.publish('users', function () {
  return Meteor.users.find();
});

Meteor.publish('user_orders', function () {
  if(this.userId){
    return Orders.find({
      user_id: this.userId
    });
  }else{
    return this.ready();
  }
});


Meteor.publish('store_orders', function (store_id) {
  if(this.userId){
    return Orders.find({
      store_id: store_id
    })
  }else{
    return this.ready();
  }
});

Meteor.publish('user_stores', function () {
  if (this.userId) {
    return Stores.find();
  }else{
    this.ready();
  }
})



Meteor.publish('basket_products', function () {
    var products = [];
    var user = Meteor.users.findOne({_id: this.userId});
    user.profile.basket.forEach(element => {
      products.push(element._id);
    });
    return [Products.find({_id: {$in: products}}),
    ProductImages.find({product_id: {$in: products}})
];
});
  
  

Meteor.publish('publishProductId', function (id) {
  return Products.find({_id: id});
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

Meteor.publish('categories', function() {
  if (this.userId) {
    return Categories.find();
  } else {
    return this.ready();
  }
});