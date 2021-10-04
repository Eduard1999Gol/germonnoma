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
            return Meteor.users.update({
                _id: this.userId
            },{
                $push:{
                    "profile.basket": product_id
                }
            })
        } else {
            throw new Meteor.Error(401);
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