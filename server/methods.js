import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';

Meteor.methods({
    register: function(user) {
        var user_exist = Meteor.users.find({'profile.email': user.email}).count();
        if (user_exist == 0) {
            var userId = Accounts.createUser(user);
            if (userId) {
                Accounts.sendVerificationEmail(userId);
            }
            return userId;
        }else{
            throw new Meteor.Error('user_exist', "User already registered");
        }
    },

    registerStore: function (user, store_name, store_address) {
        check(user, Object);
        check(store_name, String);
        check(store_address, String);
        var userId = Accounts.createUser(user);
        if (userId) {
            Accounts.sendVerificationEmail(userId);
            var store_id = Stores.insert({
                store_name: store_name,
                store_address: store_address,
                user_id: userId
            })
        }
    },
    

    sendResetEmail: function (email) {
        var user = Meteor.users.findOne({"emails": { $elemMatch:{"address": email}}});
        if(user){
            return Accounts.sendResetPasswordEmail(user._id)
        }else{
            throw new Meteor.Error("Email_doesnt_exist")
        }
        
    },


    addProductToBasket: function (product_id) {
        check(product_id, String);
        if (this.userId) {
            var product = Products.findOne({_id: product_id});
            if (product) {
                var exist = Meteor.users.findOne({_id: this.userId, "profile.basket._id": product_id});
                if (exist) {
                    return Meteor.users.update({
                        _id: this.userId, 
                        "profile.basket._id": product_id
                    },{
                        $inc:{"profile.basket.$.count":1}
                    })
                } else {
                    return Meteor.users.update({_id: this.userId},{$push:{
                        "profile.basket": {_id: product_id, count: 1}
                    }})
                }
                
            }
        } else {
            throw new Meteor.Error(402)
        }
    },

  

    removeProductFromBasket: function (product_id) {
        check(product_id, String);
        if (this.userId) {
            var count = 0;
            var basket = Meteor.users.findOne({_id: this.userId});
            var product = Products.findOne({_id: product_id});
            basket.profile.basket.forEach(element => {
                if (element._id===product_id && element.count==1) {
                    count = element.count;
                }
            });
                if (count==1) {
                    return Meteor.users.update({
                        _id: this.userId, 
                    },{
                        $pull:{"profile.basket": {
                            _id: product_id
                        }}
                    })
                } else {
                    return Meteor.users.update({ 
                        _id: this.userId,
                         "profile.basket._id": product_id
                        },
                        {$inc:{"profile.basket.$.count": -1}
                    })
                }
                
        } else {
            throw new Meteor.Error(402)
        }
    },

    updateProfile: function (profile) {
        Meteor.users.update({
            _id: this.userId
        },
        {
            $set: {
                profile: profile
            }
        })
    },
    
    createProduct: function(product) {
        var created_at = new Date();
        var  store_id = Stores.findOne({user_id: Meteor.user()._id})
        product["store_id"] = store_id;
        return Products.insert(product);
    },
    
    insertImage: function (product_id, image) {
        return ProductImages.insert({
            image: image,
            product_id: product_id
        });
    },

    deleteProduct: function (id) {
        Products.remove({_id: id});
    },


    updateProduct: function (id, product) {
        product["edited_at"] = new Date();
        Products.update({
            _id: id
        }, 
        {
            $set: {
                category: product.category,
                name: product.name,
                price: product.price,
                description: product.description,
            }
        });
        return ProductImages.update({product_id: id},{
            $set:{
                image: product.image
            }
        });
    },
    /* 
    selectedProduct: function (id, selected) {
        return Products.update({
            _id: id
        }, 
        {
            $set: {
                selected: selected
            }
        });
    }, */

    removeImage: function (id) {
        ProductImages.remove({
            _id: id
        });
        Products.update({_id: id});
    },

    createOrders: function (orders) {
        check(orders, Array);
        if (orders.length==1) {
            var product = Products.findOne({_id: orders[0]._id});
            var order =  {
                user_id: this.userId,
                image: product.image,
                ordered_at: new Date(),
                product: product,
                count: 1,
                status: "angefragt"
            }
            Orders.insert(order);
            Products.update({
                _id: orders[0]._id,
            },{
                $inc:{ count: -1}
            })
            Meteor.users.update({
                _id: this.userId
            },{
                $pull: {"profile.basket": {
                    _id: orders[0]._id,
                }}
            })
        } else {
            orders.forEach(element => {
                var  product = Products.findOne({
                    _id: element._id
                })
                var order = {
                    user_id: this.userId,
                    ordered_at: new Date(),
                    product: product,
                    store_id: product.user_id,
                    count: parseInt(element.count),
                    status: "angefragt"
                }
                Orders.insert(order);
            });
            Meteor.users.update({
                _id: this.userId
            },{
                $set: {
                    "profile.basket": []
                }
            })
        }
    }
});