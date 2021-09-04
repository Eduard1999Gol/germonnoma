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
        var selected = false;
        var id = Products.insert(product = {
            category: product.category,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
            created_at: created_at,
            selected: selected
        });
        if (id) {
            return ProductImages.insert({
                image: product.image,
                product_id: id
            });
        }else{
            throw new Meteor.Error(502);
        }
    },
    

    deleteProduct: function (id) {
        Products.remove({_id: id});
    },

    removeSelectedProducts: function () {
        if (this.userId) {
            Products.remove({selected: true});
        } else {
            throw new Meteor.Error(401);
        }
    },

    updateProduct: function (id, product) {
        product["edited_at"] = new Date();
        return Products.update({
            _id: id
        }, 
        {
            $set: {
                category: product.category,
                name: product.name,
                price: product.price,
                description: product.description,
                image: product.image
            }
        });
    },
    
    selectedProduct: function (id, selected) {
        return Products.update({
            _id: id
        }, 
        {
            $set: {
                selected: selected
            }
        });
    },

    removeImage: function (id) {
        ProductImages.remove({
            'meta.product_id': id
        });
        Products.update({
            _id: id
        }, 
        {
            $set: {
                "image_link": "https://bulma.io/images/placeholders/1280x960.png"
            }
        });
    },
});