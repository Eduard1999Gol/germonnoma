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
        return Products.insert(product = {
            category: product.category,
            name: product.name,
            price: product.price,
            description: product.description,
            created_at: created_at,
            user_id: Meteor.user()._id
        });
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
});